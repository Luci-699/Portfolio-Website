import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      {/* Mobile-only character image */}
      <div className="about-char-mobile">
        <img src="/images/character_hoodie.png" alt="character" />
      </div>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm Mohammed Faizan, a Computer Science (AI &amp; ML) student at PES
          University passionate about building intelligent and secure digital
          systems. My interests lie at the intersection of Cybersecurity,
          Artificial Intelligence, and Software Engineering, where I develop
          practical solutions ranging from security monitoring platforms to
          AI-powered accessibility tools.
          <br /><br />
          Beyond engineering, I actively lead and collaborate through AIESEC,
          hackathons, and university initiatives. As the Student Coordinator for
          the AI &amp; ML Department, I work closely with students, faculty, and
          industry stakeholders to drive impactful initiatives. I enjoy
          mentoring students, managing partnerships, and working with diverse
          teams. I believe impactful technology is built through a blend of
          technical excellence, ownership, leadership, and effective
          communication.
        </p>
      </div>
    </div>
  );
};

export default About;
