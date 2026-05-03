import PropTypes from 'prop-types';
import SectionHeader from '../components/SectionHeader';

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }).toUpperCase();
}

function EducationCard({ edu }) {
  const start = formatDate(edu.startDate);
  const end   = formatDate(edu.endDate);

  return (
    <div className="pip-card" style={{ marginBottom: '16px' }}>
      {/* Corner markers */}
      <div
        style={{
          position: 'absolute',
          bottom: '-1px', right: '-1px',
          width: '12px', height: '12px',
          borderBottom: '2px solid var(--pip-green)',
          borderRight: '2px solid var(--pip-green)',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          textShadow: 'var(--glow-text)',
          letterSpacing: '0.06em',
          marginBottom: '4px',
        }}
      >
        {edu.institution}
      </div>
      <div style={{ color: 'var(--pip-amber)', fontSize: 'clamp(0.7rem, 1.8vw, 0.88rem)', letterSpacing: '0.06em', marginBottom: '8px' }}>
        {edu.degree}{edu.field ? ` · ${edu.field}` : ''}
      </div>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '10px' }}>
        {start && (
          <span style={{ fontSize: '0.68rem', color: 'var(--pip-green-dim)', letterSpacing: '0.08em' }}>
            {start} — {end || 'Present'}
          </span>
        )}
        {edu.location && (
          <span style={{ fontSize: '0.68rem', color: 'var(--pip-green-dim)' }}>◉ {edu.location}</span>
        )}
        {edu.gpa && (
          <span style={{ fontSize: '0.68rem', color: 'var(--pip-amber)' }}>GPA: {edu.gpa}</span>
        )}
      </div>
      {edu.description && (
        <p style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)', color: 'var(--pip-green-dim)', lineHeight: 1.6 }}>
          {edu.description}
        </p>
      )}
    </div>
  );
}

EducationCard.propTypes = {
  edu: PropTypes.shape({
    id: PropTypes.number,
    institution: PropTypes.string,
    degree: PropTypes.string,
    field: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    location: PropTypes.string,
    gpa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
  }).isRequired,
};

export default function EducationPage({ educations }) {
  if (!educations?.length) return (
    <div style={{ color: 'var(--pip-green-dim)', fontSize: '0.8rem' }}>
      &gt; NO_DATA_FOUND — connect to database to load records.
    </div>
  );

  return (
    <div className="screen-enter">
      <SectionHeader title="Education" />
      {educations.map(edu => (
        <EducationCard key={edu.id} edu={edu} />
      ))}
    </div>
  );
}

EducationPage.propTypes = {
  educations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
};
