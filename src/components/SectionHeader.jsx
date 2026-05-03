import PropTypes from 'prop-types';

/**
 * SectionHeader — decorative heading with flanking lines, Pip-Boy style.
 */
export default function SectionHeader({ title }) {
  return (
    <div className="section-header">
      <div className="section-header__line" />
      <h2 className="section-header__title">&gt; {title}_</h2>
      <div className="section-header__line" style={{ background: 'linear-gradient(to left, var(--pip-green-border), transparent)' }} />
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
