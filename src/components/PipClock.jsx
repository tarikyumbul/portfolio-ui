import { useState, useEffect } from 'react';

/**
 * Live clock displayed in the Pip-Boy header.
 */
export default function PipClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase();

  return (
    <div className="pip-clock">
      <div>{dateStr}</div>
      <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--pip-green)', letterSpacing: '0.1em' }}>
        {timeStr}
      </div>
    </div>
  );
}
