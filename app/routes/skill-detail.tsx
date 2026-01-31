import type { MetaFunction } from "react-router";
import { useParams } from "react-router";
import { useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { parseEther, formatEther } from "viem";
import { Header } from "../components/Header";
import { BASED_SKILLS_ADDRESS, BASED_SKILLS_ABI } from "../contracts";

export const meta: MetaFunction = () => {
  return [{ title: "Skill | Based Skills" }];
};

export default function SkillDetail() {
  const { id } = useParams();
  const tokenId = BigInt(id || "0");
  
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Fetch skill data from contract
  const { data: skillData } = useReadContract({
    address: BASED_SKILLS_ADDRESS,
    abi: BASED_SKILLS_ABI,
    functionName: "getSkill",
    args: [tokenId],
  });

  const { data: owner } = useReadContract({
    address: BASED_SKILLS_ADDRESS,
    abi: BASED_SKILLS_ABI,
    functionName: "ownerOf",
    args: [tokenId],
  });

  const { data: tokenURI } = useReadContract({
    address: BASED_SKILLS_ADDRESS,
    abi: BASED_SKILLS_ABI,
    functionName: "tokenURI",
    args: [tokenId],
  });

  const skill = skillData as any;
  
  // V2: name and description from skill data directly
  const name = skill?.name || `Skill #${id}`;
  const description = skill?.description || "";
  const price = skill ? formatEther(skill.price) : "0";
  const category = skill?.category || "Other";
  const isListed = skill?.isListed || false;
  const totalSales = skill ? Number(skill.totalSales) : 0;
  const isOwner = address && owner && address.toLowerCase() === (owner as string).toLowerCase();
  
  // Parse image from tokenURI (on-chain SVG)
  let imageUrl = "";
  if (tokenURI && typeof tokenURI === "string" && tokenURI.startsWith("data:application/json;base64,")) {
    try {
      const json = JSON.parse(atob(tokenURI.split(",")[1]));
      imageUrl = json.image || "";
    } catch (e) {}
  }

  const handleBuy = () => {
    if (!isConnected) {
      const connector = connectors[0];
      if (connector) connect({ connector });
      return;
    }
    
    if (!skill) return;
    
    writeContract({
      address: BASED_SKILLS_ADDRESS,
      abi: BASED_SKILLS_ABI,
      functionName: "purchaseSkill",
      args: [tokenId],
      value: skill.price,
    });
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    if (!isListed) return "Not For Sale";
    if (isOwner) return "You Own This";
    if (isPending) return "Confirm in Wallet...";
    if (isConfirming) return "Processing...";
    if (isSuccess) return "Purchased ✓";
    return "Buy Now";
  };

  if (!skill) {
    return (
      <div>
        <Header />
        <div className="skill-detail" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <p style={{ color: '#666' }}>Loading skill...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="skill-detail">
        <div>
          <div className="skill-detail-badge">
            <span className="skill-category">{category}</span>
            {isListed && <span className="skill-verified">✓ Listed</span>}
          </div>
          <h1 className="skill-detail-title">{name}</h1>
          <p className="skill-detail-description">{description}</p>
          
          {imageUrl && (
            <div style={{ 
              marginTop: '32px', 
              marginBottom: '32px',
              border: '1px solid #333',
              borderRadius: '8px',
              overflow: 'hidden',
              maxWidth: '400px'
            }}>
              <img 
                src={imageUrl} 
                alt={name}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}
          
          {isSuccess && hash && (
            <div style={{ 
              padding: '16px', 
              marginTop: '24px',
              border: '1px solid #0f0', 
              background: 'rgba(0,255,0,0.1)' 
            }}>
              <p style={{ color: '#0f0', margin: 0 }}>✓ Purchase successful!</p>
              <a 
                href={`https://sepolia.basescan.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ff0', fontSize: '12px' }}
              >
                View transaction
              </a>
            </div>
          )}

          {error && (
            <div style={{ 
              padding: '16px', 
              marginTop: '24px',
              border: '1px solid #f00', 
              background: 'rgba(255,0,0,0.1)' 
            }}>
              <p style={{ color: '#f00', margin: 0, fontSize: '12px' }}>
                {error.message.includes("Cannot buy own") 
                  ? "You can't buy your own skill" 
                  : error.message.slice(0, 100)}
              </p>
            </div>
          )}
        </div>
        
        <aside className="skill-detail-sidebar">
          <div className="purchase-card">
            <div className="purchase-price">
              {price}<span className="purchase-price-currency"> ETH</span>
            </div>
            <button 
              className="purchase-btn" 
              onClick={handleBuy}
              disabled={isPending || isConfirming || !isListed || isOwner}
            >
              {getButtonText()}
            </button>
            <p className="purchase-note">Base Sepolia Testnet</p>
          </div>
          
          <div className="info-card">
            <h3 className="info-card-title">Info</h3>
            <div className="info-row">
              <span className="info-label">Owner</span>
              <span className="info-value">
                {owner ? `${(owner as string).slice(0, 6)}...${(owner as string).slice(-4)}` : "..."}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Token ID</span>
              <span className="info-value">#{id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Sales</span>
              <span className="info-value">{totalSales}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Contract</span>
              <a 
                href={`https://sepolia.basescan.org/address/${BASED_SKILLS_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="info-value"
                style={{ color: '#ff0', textDecoration: 'underline' }}
              >
                Basescan
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
