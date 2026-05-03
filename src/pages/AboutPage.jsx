import PropTypes from 'prop-types';
import SectionHeader from '../components/SectionHeader';

function StatBox({ label, value }) {
  return (
    <div className="stat-box">
      <div className="stat-box__label">{label}</div>
      <div className="stat-box__value">{value}</div>
    </div>
  );
}

StatBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
};

function ContactRow({ icon, label, value, href }) {
  return (
    <div className="contact-row">
      <span className="contact-row__icon">{icon}</span>
      <span className="contact-row__label">{label}</span>
      {href ? (
        <a className="contact-row__value pip-link" href={href} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ) : (
        <span className="contact-row__value">{value}</span>
      )}
    </div>
  );
}

ContactRow.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  href: PropTypes.string,
};

ContactRow.defaultProps = {
  href: undefined,
};

export default function AboutPage({ profile }) {
  if (!profile) return null;

  return (
    <div className="screen-enter">
      {/* ── Name Banner ── */}
      <div className="pip-card" style={{ marginBottom: '24px', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            textShadow: 'var(--glow-text)',
            letterSpacing: '0.1em',
            lineHeight: 1.1,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            marginTop: '6px',
            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
            color: 'var(--pip-amber)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {profile.title}
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <SectionHeader title="Status" />
      <div className="stat-grid">
        <StatBox label="Location"   value={profile.location  || '—'} />
        <StatBox label="Status"     value="ONLINE · AVAILABLE" />
        <StatBox label="Clearance"  value="LEVEL 5" />
        <StatBox label="S.P.E.C.I.A.L" value="INT 10 / END 9" />
      </div>

      {/* ── Summary ── */}
      <SectionHeader title="Mission Brief" />
      <div className="pip-card" style={{ marginBottom: '24px' }}>
        <p
          style={{
            fontSize: 'clamp(0.72rem, 1.8vw, 0.88rem)',
            color: 'var(--pip-green-dim)',
            lineHeight: 1.75,
            letterSpacing: '0.04em',
          }}
        >
          {profile.summary}
        </p>
      </div>

      {/* ── Contact ── */}
      <SectionHeader title="Contact" />
      <div className="pip-card">
        {profile.email && (
          <ContactRow icon="✉" label="Email" value={profile.email} href={`mailto:${profile.email}`} />
        )}
        {profile.phone && (
          <ContactRow icon="☎" label="Phone" value={profile.phone} />
        )}
        {profile.location && (
          <ContactRow icon="◉" label="Location" value={profile.location} />
        )}
        {profile.linkedinUrl && (
          <ContactRow icon="🔗" label="LinkedIn" value={profile.linkedinUrl.replace('https://', '')} href={profile.linkedinUrl} />
        )}
        {profile.githubUrl && (
          <ContactRow icon="⌥" label="GitHub" value={profile.githubUrl.replace('https://', '')} href={profile.githubUrl} />
        )}
      </div>
    </div>
  );
}

AboutPage.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    location: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    linkedinUrl: PropTypes.string,
    githubUrl: PropTypes.string,
  }),
};

AboutPage.defaultProps = {
  profile: null,
};
