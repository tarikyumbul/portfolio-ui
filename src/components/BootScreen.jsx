import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const BOOT_LOG = [
  'RobCo Industries (TM) Unified Operating System',
  'COPYRIGHT 2075-2077 RobCo Industries',
  '─'.repeat(46),
  'Initializing PIP-OS v7.1.0.8...',
  'Loading portfolio.dat ............. [OK]',
  'Loading profile.dat ............... [OK]',
  'Loading experience.dat ............ [OK]',
  'Loading skills.dat ................ [OK]',
  'Loading projects.dat .............. [OK]',
  '─'.repeat(46),
  '> WELCOME, OPERATOR.',
];

/**
 * Boot splash screen shown for ~2.5 s on first load.
 */
export default function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < BOOT_LOG.length) {
        setLines(prev => [...prev, { id: idx, text: BOOT_LOG[idx] }]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(onDone, 500);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <output className="pip-boot" aria-label="Loading portfolio">
      <div className="pip-boot__logo">PIP-BOY 3000</div>
      <div style={{ width: 'min(500px, 90vw)' }}>
        {lines.map(({ id, text }, i) => (
          <div
            key={id}
            style={{
              fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
              color: i === lines.length - 1 ? 'var(--pip-green)' : 'var(--pip-green-dim)',
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.6,
              textShadow: i === lines.length - 1 ? 'var(--glow-text)' : 'none',
            }}
          >
            {text}
          </div>
        ))}
        {lines.length === BOOT_LOG.length && <span className="cursor" aria-hidden="true" />}
      </div>
      <progress
        className="pip-boot__bar"
        aria-label="Loading progress"
        value={lines.length}
        max={BOOT_LOG.length}
      />
      <div className="pip-boot__text">PLEASE STAND BY</div>
    </output>
  );
}

BootScreen.propTypes = {
  onDone: PropTypes.func.isRequired,
};
