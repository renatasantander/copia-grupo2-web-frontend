function ProjectCard({ project }) {
    return (
      <div className="project-card">
        <h3>{project.titulo}</h3>
        <p>{project.estado}</p>
      </div>
    );
  }
  
  export default ProjectCard;