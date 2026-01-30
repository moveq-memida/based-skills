// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title BasedSkills
 * @dev NFT marketplace for AI agent skills on Base
 */
contract BasedSkills is ERC721, ERC721URIStorage, ERC721Royalty, Ownable, ReentrancyGuard {
    uint256 private _nextTokenId;
    
    // Platform fee (in basis points, 250 = 2.5%)
    uint256 public platformFeeBps = 250;
    
    // Skill metadata
    struct Skill {
        address creator;
        uint256 price;
        string contentHash;  // IPFS hash of SKILL.md
        string category;
        bool isListed;
        uint256 totalSales;
    }
    
    // Token ID => Skill data
    mapping(uint256 => Skill) public skills;
    
    // Creator => Token IDs
    mapping(address => uint256[]) public creatorSkills;
    
    // Events
    event SkillCreated(uint256 indexed tokenId, address indexed creator, string contentHash, uint256 price);
    event SkillPurchased(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price);
    event SkillPriceUpdated(uint256 indexed tokenId, uint256 oldPrice, uint256 newPrice);
    event SkillListingUpdated(uint256 indexed tokenId, bool isListed);
    
    constructor() ERC721("Based Skills", "SKILL") Ownable(msg.sender) {}
    
    /**
     * @dev Create a new skill NFT
     * @param contentHash IPFS hash of the SKILL.md content
     * @param category Skill category
     * @param price Price in wei (0 for free)
     * @param royaltyBps Royalty percentage in basis points (max 1000 = 10%)
     */
    function createSkill(
        string calldata contentHash,
        string calldata category,
        uint256 price,
        uint96 royaltyBps,
        string calldata tokenURI_
    ) external returns (uint256) {
        require(bytes(contentHash).length > 0, "Content hash required");
        require(royaltyBps <= 1000, "Royalty too high"); // Max 10%
        
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        _setTokenRoyalty(tokenId, msg.sender, royaltyBps);
        
        skills[tokenId] = Skill({
            creator: msg.sender,
            price: price,
            contentHash: contentHash,
            category: category,
            isListed: true,
            totalSales: 0
        });
        
        creatorSkills[msg.sender].push(tokenId);
        
        emit SkillCreated(tokenId, msg.sender, contentHash, price);
        
        return tokenId;
    }
    
    /**
     * @dev Purchase a skill
     */
    function purchaseSkill(uint256 tokenId) external payable nonReentrant {
        Skill storage skill = skills[tokenId];
        require(skill.isListed, "Skill not listed");
        require(msg.value >= skill.price, "Insufficient payment");
        
        address seller = ownerOf(tokenId);
        require(seller != msg.sender, "Cannot buy own skill");
        
        // Calculate fees
        uint256 platformFee = (msg.value * platformFeeBps) / 10000;
        uint256 sellerAmount = msg.value - platformFee;
        
        // Update state before transfers
        skill.totalSales++;
        skill.isListed = false;
        
        // Transfer NFT
        _transfer(seller, msg.sender, tokenId);
        
        // Transfer payments
        (bool success, ) = seller.call{value: sellerAmount}("");
        require(success, "Payment failed");
        
        emit SkillPurchased(tokenId, msg.sender, seller, msg.value);
    }
    
    /**
     * @dev Update skill price
     */
    function setSkillPrice(uint256 tokenId, uint256 newPrice) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        uint256 oldPrice = skills[tokenId].price;
        skills[tokenId].price = newPrice;
        emit SkillPriceUpdated(tokenId, oldPrice, newPrice);
    }
    
    /**
     * @dev List/unlist skill for sale
     */
    function setSkillListing(uint256 tokenId, bool isListed) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        skills[tokenId].isListed = isListed;
        emit SkillListingUpdated(tokenId, isListed);
    }
    
    /**
     * @dev Get skills by creator
     */
    function getSkillsByCreator(address creator) external view returns (uint256[] memory) {
        return creatorSkills[creator];
    }
    
    /**
     * @dev Get skill details
     */
    function getSkill(uint256 tokenId) external view returns (Skill memory) {
        return skills[tokenId];
    }
    
    /**
     * @dev Update platform fee (owner only)
     */
    function setPlatformFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= 1000, "Fee too high"); // Max 10%
        platformFeeBps = newFeeBps;
    }
    
    /**
     * @dev Withdraw platform fees (owner only)
     */
    function withdraw() external onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Get total skills created
     */
    function totalSupply() external view returns (uint256) {
        return _nextTokenId;
    }
    
    // Required overrides
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Royalty) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
