import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Skill | Based Skills" },
    { name: "description", content: "List your AI agent skill on Based Skills." },
  ];
};

const CATEGORIES = [
  "Utility",
  "Developer",
  "Creative",
  "Social",
  "Productivity",
  "Finance",
  "Gaming",
  "Other",
];

export default function Submit() {
  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <div className="submit-container">
          <div className="page-header" style={{ padding: 0, marginBottom: 48, textAlign: "left" }}>
            <h1 className="page-title">Submit Skill</h1>
            <p className="page-description">List your skill and start earning</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">Skill Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Weather Skill"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" required>
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Short Description</label>
              <input
                type="text"
                className="form-input"
                placeholder="One sentence about what your skill does"
                maxLength={160}
                required
              />
              <p className="form-hint">Max 160 characters</p>
            </div>

            <div className="form-group">
              <label className="form-label">SKILL.md Content</label>
              <textarea
                className="form-textarea"
                placeholder="Paste your SKILL.md content here..."
                required
              />
              <p className="form-hint">The full content of your skill</p>
            </div>

            <div className="form-group">
              <label className="form-label">Price (ETH)</label>
              <input
                type="number"
                className="form-input"
                placeholder="0.001"
                step="0.0001"
                min="0"
                required
              />
              <p className="form-hint">Set to 0 for free skills</p>
            </div>

            <div className="form-group">
              <label className="form-label">Tags</label>
              <input
                type="text"
                className="form-input"
                placeholder="weather, api, utility"
              />
              <p className="form-hint">Comma-separated tags</p>
            </div>

            <button type="submit" className="submit-btn">
              Connect Wallet & Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
