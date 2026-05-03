import PropTypes from 'prop-types';

/**
 * SkillBar — horizontal fill bar with pip-style segmentation.
 * level: 1–5
 */
export default function SkillBar({ name, level = 3 }) {
  return (
    <div className="skill-bar">
      <span className="skill-bar__name">{name}</span>
      <div className="skill-bar__track">
        <progress
          className="skill-bar__fill"
          value={level}
          max={5}
          aria-label={`${name} proficiency ${level} of 5`}
        />
      </div>
      <div className="skill-pips">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={`pip-${i}`}
            className={`skill-pip ${i < level ? 'filled' : ''}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

SkillBar.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number,
};
