import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Skill - Based Skills" },
    { name: "description", content: "List your AI agent skill on Based Skills marketplace." },
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
      <main className="main-content submit-page">
        <h1>Submit Your Skill</h1>
        <p>List your AI agent skill on the marketplace and start earning.</p>

        <form className="submit-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Skill Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Weather Skill"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" required>
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Short Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="One sentence describing what your skill does"
              maxLength={160}
              required
            />
            <p className="form-hint">Max 160 characters</p>
          </div>

          <div className="form-group">
            <label htmlFor="content">SKILL.md Content</label>
            <textarea
              id="content"
              name="content"
              placeholder="Paste your SKILL.md content here..."
              required
            />
            <p className="form-hint">
              The full content of your skill in SKILL.md format
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (ETH)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="0.001"
              step="0.0001"
              min="0"
              required
            />
            <p className="form-hint">Set to 0 for free skills</p>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="weather, api, utility"
            />
            <p className="form-hint">Comma-separated tags for discoverability</p>
          </div>

          <button type="submit" className="submit-button">
            Connect Wallet & Submit
          </button>
        </form>
      </main>
    </div>
  );
}
