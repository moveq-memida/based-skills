// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title BasedSkillsV2
 * @dev NFT marketplace for AI agent skills with on-chain SVG
 */
contract BasedSkillsV2 is ERC721, ERC721Royalty, Ownable, ReentrancyGuard {
    using Strings for uint256;
    
    uint256 private _nextTokenId;
    uint256 public platformFeeBps = 250;
    
    struct Skill {
        string name;
        string description;
        string category;
        uint256 price;
        string contentHash;
        bool isListed;
        uint256 totalSales;
    }
    
    mapping(uint256 => Skill) public skills;
    mapping(address => uint256[]) public creatorSkills;
    
    event SkillCreated(uint256 indexed tokenId, address indexed creator, string name, uint256 price);
    event SkillPurchased(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price);
    event SkillPriceUpdated(uint256 indexed tokenId, uint256 oldPrice, uint256 newPrice);
    event SkillListingUpdated(uint256 indexed tokenId, bool isListed);
    
    constructor() ERC721("Based Skills", "SKILL") Ownable(msg.sender) {}
    
    function createSkill(
        string calldata name,
        string calldata description,
        string calldata category,
        uint256 price,
        string calldata contentHash,
        uint96 royaltyBps
    ) external returns (uint256) {
        require(bytes(name).length > 0, "Name required");
        require(bytes(name).length <= 32, "Name too long");
        require(royaltyBps <= 1000, "Royalty too high");
        
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(msg.sender, tokenId);
        _setTokenRoyalty(tokenId, msg.sender, royaltyBps);
        
        skills[tokenId] = Skill({
            name: name,
            description: description,
            category: category,
            price: price,
            contentHash: contentHash,
            isListed: true,
            totalSales: 0
        });
        
        creatorSkills[msg.sender].push(tokenId);
        
        emit SkillCreated(tokenId, msg.sender, name, price);
        
        return tokenId;
    }
    
    function purchaseSkill(uint256 tokenId) external payable nonReentrant {
        Skill storage skill = skills[tokenId];
        require(skill.isListed, "Not listed");
        require(msg.value >= skill.price, "Insufficient payment");
        
        address seller = ownerOf(tokenId);
        require(seller != msg.sender, "Cannot buy own skill");
        
        uint256 platformFee = (msg.value * platformFeeBps) / 10000;
        uint256 sellerAmount = msg.value - platformFee;
        
        skill.totalSales++;
        skill.isListed = false;
        
        _transfer(seller, msg.sender, tokenId);
        
        (bool success, ) = seller.call{value: sellerAmount}("");
        require(success, "Payment failed");
        
        emit SkillPurchased(tokenId, msg.sender, seller, msg.value);
    }
    
    function setSkillPrice(uint256 tokenId, uint256 newPrice) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        uint256 oldPrice = skills[tokenId].price;
        skills[tokenId].price = newPrice;
        emit SkillPriceUpdated(tokenId, oldPrice, newPrice);
    }
    
    function setSkillListing(uint256 tokenId, bool isListed) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        skills[tokenId].isListed = isListed;
        emit SkillListingUpdated(tokenId, isListed);
    }
    
    function getSkill(uint256 tokenId) external view returns (Skill memory) {
        return skills[tokenId];
    }
    
    function getSkillsByCreator(address creator) external view returns (uint256[] memory) {
        return creatorSkills[creator];
    }
    
    function totalSupply() external view returns (uint256) {
        return _nextTokenId;
    }
    
    function setPlatformFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= 1000, "Fee too high");
        platformFeeBps = newFeeBps;
    }
    
    function withdraw() external onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
    
    // On-chain SVG generation
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        
        Skill memory skill = skills[tokenId];
        
        string memory svg = generateSVG(tokenId, skill);
        string memory json = generateJSON(tokenId, skill, svg);
        
        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(bytes(json))));
    }
    
    function generateSVG(uint256 tokenId, Skill memory skill) internal pure returns (string memory) {
        string memory priceStr = formatPrice(skill.price);
        
        return string(abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">',
            '<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">',
            '<stop offset="0%" style="stop-color:#0a0a0a"/>',
            '<stop offset="100%" style="stop-color:#1a1a1a"/></linearGradient></defs>',
            '<rect width="400" height="400" fill="url(#g)"/>',
            '<rect x="20" y="20" width="360" height="360" fill="none" stroke="#333" stroke-width="1"/>',
            // Category badge
            '<rect x="20" y="20" width="120" height="24" fill="#ff0"/>',
            '<text x="80" y="36" font-family="monospace" font-size="10" fill="#000" text-anchor="middle" font-weight="bold">',
            skill.category,
            '</text>',
            // Token ID
            '<text x="380" y="36" font-family="monospace" font-size="10" fill="#444" text-anchor="end">#',
            tokenId.toString(),
            '</text>',
            // Skill name
            '<text x="200" y="180" font-family="monospace" font-size="24" fill="#fff" text-anchor="middle" font-weight="bold">',
            skill.name,
            '</text>',
            // Price
            '<text x="200" y="320" font-family="monospace" font-size="32" fill="#ff0" text-anchor="middle" font-weight="bold">',
            priceStr,
            ' ETH</text>',
            // Footer
            '<text x="200" y="365" font-family="monospace" font-size="10" fill="#333" text-anchor="middle">BASED SKILLS</text>',
            '</svg>'
        ));
    }
    
    function generateJSON(uint256 tokenId, Skill memory skill, string memory svg) internal pure returns (string memory) {
        return string(abi.encodePacked(
            '{"name":"', skill.name,
            '","description":"', skill.description,
            '","image":"data:image/svg+xml;base64,', Base64.encode(bytes(svg)),
            '","attributes":[{"trait_type":"Category","value":"', skill.category,
            '"},{"trait_type":"Price","value":"', formatPrice(skill.price),
            ' ETH"},{"trait_type":"Token ID","value":"', tokenId.toString(),
            '"}]}'
        ));
    }
    
    function formatPrice(uint256 priceWei) internal pure returns (string memory) {
        if (priceWei == 0) return "FREE";
        
        uint256 whole = priceWei / 1e18;
        uint256 decimal = (priceWei % 1e18) / 1e14; // 4 decimal places
        
        if (decimal == 0) {
            return whole.toString();
        }
        
        // Remove trailing zeros
        while (decimal > 0 && decimal % 10 == 0) {
            decimal /= 10;
        }
        
        return string(abi.encodePacked(whole.toString(), ".", decimal.toString()));
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Royalty) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
