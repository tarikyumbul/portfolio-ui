import PropTypes from 'prop-types';
import SectionHeader from '../components/SectionHeader';

function formatDate(dateStr) {
  if (!dateStr) return 'Present';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }).toUpperCase();
}

function ExperienceCard({ exp }) {
  return (
    <div className="timeline-item">
      <div className="timeline-item__header">
        <div>
          <div className="timeline-item__role">{exp.role}</div>
          <div className="timeline-item__company">{exp.company}</div>
        </div>
        <div className="timeline-item__meta">
          <span className="timeline-item__date">
            {formatDate(exp.startDate)} — {exp.currentJob ? <span className="badge-current">ACTIVE</span> : formatDate(exp.endDate)}
          </span>
          {exp.location && (
            <span className="timeline-item__location">◉ {exp.location}</span>
          )}
        </div>
      </div>

      {exp.bullets && exp.bullets.length > 0 && (
        <ul className="timeline-item__bullets" aria-label={`Responsibilities at ${exp.company}`}>
          {exp.bullets.map(b => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

ExperienceCard.propTypes = {
  exp: PropTypes.shape({
    id: PropTypes.number,
    role: PropTypes.string,
    company: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    currentJob: PropTypes.bool,
    location: PropTypes.string,
    bullets: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default function ExperiencePage({ experiences }) {
  if (!experiences?.length) return (
    <div style={{ color: 'var(--pip-green-dim)', fontSize: '0.8rem' }}>
      &gt; NO_DATA_FOUND — connect to database to load records.
    </div>
  );

  return (
    <div className="screen-enter">
      <SectionHeader title="Work History" />
      <div className="timeline">
        {experiences.map(exp => (
          <ExperienceCard key={exp.id} exp={exp} />
        ))}
      </div>
    </div>
  );
}

ExperiencePage.propTypes = {
  experiences: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
};
