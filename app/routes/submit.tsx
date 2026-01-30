import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";

export const meta: MetaFunction = () => {
  return [{ title: "Submit | Based Skills" }];
};

const CATEGORIES = ["Utility", "Developer", "Creative", "Social", "Productivity", "Finance", "Other"];

export default function Submit() {
  return (
    <div>
      <Header />
      <div className="submit-container">
        <h1>Submit Skill</h1>
        <p>List your skill and start earning</p>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="form-input" placeholder="Weather Skill" required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" required>
              <option value="">Select</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <input type="text" className="form-input" placeholder="One sentence" maxLength={160} required />
            <p className="form-hint">Max 160 chars</p>
          </div>
          
          <div className="form-group">
            <label className="form-label">SKILL.md</label>
            <textarea className="form-textarea" placeholder="Paste content..." required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Price (ETH)</label>
            <input type="number" className="form-input" placeholder="0.001" step="0.0001" min="0" required />
            <p className="form-hint">0 = free</p>
          </div>
          
          <button type="submit" className="submit-btn">Connect & Submit</button>
        </form>
      </div>
    </div>
  );
}
