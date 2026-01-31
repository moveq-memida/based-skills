import type { MetaFunction } from "react-router";
import { useState } from "react";
import { useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, keccak256, toBytes } from "viem";
import { Header } from "../components/Header";
import { BASED_SKILLS_ADDRESS, BASED_SKILLS_ABI } from "../contracts";

export const meta: MetaFunction = () => {
  return [{ title: "Submit | Based Skills" }];
};

const CATEGORIES = ["Utility", "Developer", "Creative", "Social", "Productivity", "Finance", "Other"];

export default function Submit() {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    skillContent: "",
    price: "",
    royalty: "2.5",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      const connector = connectors[0];
      if (connector) connect({ connector });
      return;
    }

    // Generate content hash from skill content
    const contentHash = keccak256(toBytes(formData.skillContent)).slice(0, 50);

    const priceInWei = formData.price ? parseEther(formData.price) : 0n;
    const royaltyBps = Math.floor(parseFloat(formData.royalty) * 100); // 2.5% -> 250

    // V2: createSkill(name, description, category, price, contentHash, royaltyBps)
    writeContract({
      address: BASED_SKILLS_ADDRESS,
      abi: BASED_SKILLS_ABI,
      functionName: "createSkill",
      args: [
        formData.name,
        formData.description,
        formData.category,
        priceInWei,
        contentHash,
        royaltyBps,
      ],
    });
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    if (isPending) return "Confirm in Wallet...";
    if (isConfirming) return "Creating Skill...";
    if (isSuccess) return "Skill Created ✓";
    return "Submit Skill";
  };

  return (
    <div>
      <Header />
      <div className="submit-container">
        <h1>Submit</h1>
        <p>List your skill on Base Sepolia</p>
        
        {isSuccess && hash && (
          <div style={{ 
            padding: '16px', 
            marginBottom: '32px', 
            border: '1px solid #0f0', 
            background: 'rgba(0,255,0,0.1)' 
          }}>
            <p style={{ color: '#0f0', margin: 0 }}>✓ Skill created!</p>
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
            marginBottom: '32px', 
            border: '1px solid #f00', 
            background: 'rgba(255,0,0,0.1)' 
          }}>
            <p style={{ color: '#f00', margin: 0, fontSize: '12px' }}>
              Error: {error.message.slice(0, 100)}
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              name="name"
              className="form-input" 
              placeholder="Weather Skill" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              name="category"
              className="form-select" 
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <input 
              type="text" 
              name="description"
              className="form-input" 
              placeholder="One sentence" 
              maxLength={160} 
              value={formData.description}
              onChange={handleChange}
              required 
            />
            <p className="form-hint">Max 160 chars</p>
          </div>
          
          <div className="form-group">
            <label className="form-label">SKILL.md</label>
            <textarea 
              name="skillContent"
              className="form-textarea" 
              placeholder="# My Skill&#10;&#10;Description of what this skill does...&#10;&#10;## Usage&#10;&#10;How to use this skill..." 
              value={formData.skillContent}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Price (ETH)</label>
            <input 
              type="number" 
              name="price"
              className="form-input" 
              placeholder="0.001" 
              step="0.0001" 
              min="0" 
              value={formData.price}
              onChange={handleChange}
              required 
            />
            <p className="form-hint">0 = free</p>
          </div>

          <div className="form-group">
            <label className="form-label">Royalty (%)</label>
            <input 
              type="number" 
              name="royalty"
              className="form-input" 
              placeholder="2.5" 
              step="0.5" 
              min="0" 
              max="10"
              value={formData.royalty}
              onChange={handleChange}
              required 
            />
            <p className="form-hint">Max 10%</p>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isPending || isConfirming}
          >
            {getButtonText()}
          </button>
        </form>
      </div>
    </div>
  );
}
