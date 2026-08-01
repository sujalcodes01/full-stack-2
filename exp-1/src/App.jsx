import { useMemo, useState } from 'react';
import './App.css';

const platforms = [
  { key: 'instagram', label: 'Instagram', maxLength: 2200, accent: '#ff5f5f' },
  { key: 'twitter', label: 'Twitter / X', maxLength: 280, accent: '#1d9bf0' },
  { key: 'linkedin', label: 'LinkedIn', maxLength: 3000, accent: '#0b66c2' },
  { key: 'facebook', label: 'Facebook', maxLength: 63206, accent: '#1877f2' }
];

function getValidation(content, platform) {
  const trimmed = content.trim();
  const length = trimmed.length;
  const issues = [];
  const warnings = [];

  if (!trimmed) {
    issues.push('Add a message before publishing.');
    return { length, issues, warnings };
  }

  if (length > platform.maxLength) {
    issues.push(`${platform.label} supports up to ${platform.maxLength} characters.`);
  } else if (length > platform.maxLength * 0.85) {
    warnings.push('You are close to the platform limit.');
  }

  if (platform.key === 'instagram') {
    const hashtags = (content.match(/#[\w-]+/g) || []).length;
    if (hashtags > 30) {
      warnings.push('Instagram posts usually perform better with fewer than 30 hashtags.');
    }
  }

  if (platform.key === 'twitter' && length > 240) {
    warnings.push('Twitter recommends keeping posts shorter for better readability.');
  }

  if (platform.key === 'linkedin' && content.split('\n').length > 4) {
    warnings.push('LinkedIn content is easier to read when it uses short paragraphs.');
  }

  return { length, issues, warnings };
}

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0].key);
  const [content, setContent] = useState(
    'Launch day is approaching. Share a clear update, a strong CTA, and a friendly reminder for your audience.'
  );

  const platform = platforms.find((item) => item.key === selectedPlatform) || platforms[0];
  const validation = useMemo(() => getValidation(content, platform), [content, platform]);
  const isValid = validation.issues.length === 0;

  return (
    <div className="app-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Experiment 1 • Multiplatform Post Composer</p>
          <h1>Create polished posts for every channel.</h1>
          <p>
            Pick a platform, write your message, and get instant guidance on length and format.
          </p>
        </div>

        <div className="platform-picker" role="tablist" aria-label="Platform selector">
          {platforms.map((item) => (
            <button
              key={item.key}
              className={`platform-pill ${selectedPlatform === item.key ? 'active' : ''}`}
              style={{ '--accent': item.accent }}
              onClick={() => setSelectedPlatform(item.key)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="composer-grid">
        <div className="composer-card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Live composer</p>
              <h2>{platform.label} draft</h2>
            </div>
            <span className="count-badge">{validation.length}/{platform.maxLength}</span>
          </div>

          <label className="sr-only" htmlFor="post-content">
            Post content
          </label>
          <textarea
            id="post-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={10}
            placeholder={`Write something for ${platform.label}...`}
          />

          <div className="toolbar">
            <div>
              <p className={`status ${isValid ? 'valid' : 'invalid'}`}>
                {isValid ? 'Ready to publish' : 'Needs attention'}
              </p>
              <p className="helper-text">
                {platform.label} allows up to {platform.maxLength} characters.
              </p>
            </div>
            <button type="button" className="publish-btn" disabled={!isValid}>
              Publish
            </button>
          </div>

          <div className="feedback-list">
            {validation.issues.length > 0 && (
              <div className="feedback-block error">
                <h3>Errors</h3>
                <ul>
                  {validation.issues.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {validation.warnings.length > 0 && (
              <div className="feedback-block warning">
                <h3>Suggestions</h3>
                <ul>
                  {validation.warnings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <aside className="preview-card">
          <p className="eyebrow">Preview</p>
          <h3>{platform.label} Post Preview</h3>
          <div className="preview-box">
            <p>{content || 'Your message will appear here.'}</p>
          </div>
          <ul className="preview-stats">
            <li>
              <span>Platform</span>
              <strong>{platform.label}</strong>
            </li>
            <li>
              <span>Characters</span>
              <strong>{validation.length}</strong>
            </li>
            <li>
              <span>Status</span>
              <strong>{isValid ? 'Valid' : 'Invalid'}</strong>
            </li>
          </ul>
        </aside>
      </section>
    </div>
  );
}

export default App;
