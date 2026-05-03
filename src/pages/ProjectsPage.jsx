import PropTypes from 'prop-types';
import SectionHeader from '../components/SectionHeader';

function ProjectCard({ project }) {
  const tags = project.techStack
    ? project.techStack.split(',').map(t => t.trim())
    : [];

  return (
    <article className="project-card" aria-label={project.name}>
      {/* Featured badge */}
      {project.featured && (
        <div
          style={{
            position: 'absolute',
            top: '10px', right: '10px',
            fontSize: '0.55rem',
            padding: '2px 7px',
            border: '1px solid var(--pip-amber)',
            color: 'var(--pip-amber)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          ★ FEATURED
        </div>
      )}

      <div className="project-card__name">{project.name}</div>
      <p className="project-card__desc">{project.description}</p>

      {tags.length > 0 && (
        <div className="project-card__tech" aria-label="Technologies used">
          {tags.map(tag => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="project-card__links">
        {project.githubUrl && (
          <a className="pip-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            [GITHUB]
          </a>
        )}
        {project.liveUrl && (
          <a className="pip-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            [LIVE DEMO]
          </a>
        )}
        {!project.githubUrl && !project.liveUrl && (
          <span style={{ fontSize: '0.6rem', color: 'var(--pip-green-dim)', letterSpacing: '0.08em' }}>
            [CLASSIFIED]
          </span>
        )}
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    techStack: PropTypes.string,
    featured: PropTypes.bool,
    githubUrl: PropTypes.string,
    liveUrl: PropTypes.string,
  }).isRequired,
};

export default function ProjectsPage({ projects }) {
  if (!projects?.length) return (
    <div style={{ color: 'var(--pip-green-dim)', fontSize: '0.8rem' }}>
      &gt; NO_DATA_FOUND — connect to database to load records.
    </div>
  );

  const featured = projects.filter(p => p.featured);
  const others   = projects.filter(p => !p.featured);

  return (
    <div className="screen-enter">
      {featured.length > 0 && (
        <>
          <SectionHeader title="Featured Projects" />
          <div className="projects-grid" style={{ marginBottom: '28px' }}>
            {featured.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </>
      )}
      {others.length > 0 && (
        <>
          <SectionHeader title="Other Projects" />
          <div className="projects-grid">
            {others.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </>
      )}
    </div>
  );
}

ProjectsPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
};
