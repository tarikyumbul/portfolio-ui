import PropTypes from 'prop-types';
import SectionHeader from '../components/SectionHeader';
import SkillBar from '../components/SkillBar';

const SKILLSET_CHARS = [...'SKILLSET'].map((ch, i) => ({ id: `${ch}${i}`, ch }));

export default function SkillsPage({ skillsByCategory }) {
  if (!skillsByCategory || Object.keys(skillsByCategory).length === 0) return (
    <div style={{ color: 'var(--pip-green-dim)', fontSize: '0.8rem' }}>
      &gt; NO_DATA_FOUND — connect to database to load records.
    </div>
  );

  const categories = Object.entries(skillsByCategory);

  return (
    <div className="screen-enter">
      <SectionHeader title="SPECIAL Stats" />

      {/* Pip-Boy S.P.E.C.I.A.L header graphic */}
      <div
        className="pip-card"
        style={{
          marginBottom: '24px',
          display: 'flex',
          gap: '6px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          fontSize: 'clamp(0.6rem, 2vw, 0.8rem)',
          letterSpacing: '0.3em',
          color: 'var(--pip-amber)',
          fontFamily: 'var(--font-display)',
        }}
      >
        {SKILLSET_CHARS.map(({ id, ch }) => (
          <span
            key={id}
            style={{
              padding: '4px 8px',
              border: '1px solid var(--pip-green-border)',
              background: 'var(--bg-base)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {categories.map(([category, skills]) => (
        <div key={category} className="skill-category">
          <div className="skill-category__title">{category}</div>
          {skills.map(skill => (
            <SkillBar key={skill.id} name={skill.name} level={skill.level} />
          ))}
        </div>
      ))}
    </div>
  );
}

SkillsPage.propTypes = {
  skillsByCategory: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      level: PropTypes.number,
    }))
  ).isRequired,
};
