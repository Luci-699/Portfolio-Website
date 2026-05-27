import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* AIESEC */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Junior Manager — Incoming Corporate Sector</h4>
                <h5>AIESEC in Bengaluru</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Conduct market research and engage Bengaluru startups to secure
              partnerships, client meetings, and international internship
              opportunities. Collaborate with founders, HR teams, and global
              AIESEC entities to facilitate intern placements and cross-border
              partnerships
            </p>
          </div>

          {/* Teaching Assistant */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Teaching Assistant — C Programming</h4>
                <h5>PES University</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Assisted in teaching C programming, mentoring students in core
              concepts, problem-solving, and programming logic. Designed quizzes
              and learning materials to reinforce concepts and improve student
              understanding.
            </p>
          </div>

          {/* AI Summit */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Head of Volunteers & Student Coordinator</h4>
                <h5>AI 360° — India AI Impact Summit 2026, PES University</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Led volunteer operations for the India–AI Impact Summit 2026
              Pre-Summit event, ensuring seamless execution. Supported design,
              marketing, finance, and cross-functional event planning
              initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
