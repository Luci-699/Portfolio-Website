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
                <h4>Head of Volunteers &amp; Student Coordinator</h4>
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

          {/* Student Coordinator AIML */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Student Coordinator — AI &amp; ML Department</h4>
                <h5>PES University</h5>
              </div>
              <h3>2025–26</h3>
            </div>
            <p>
              Serve as the official student representative for the AI &amp; ML
              Department, bridging students, faculty, and industry stakeholders.
              Drive departmental initiatives, coordinate academic events, and
              champion student welfare and engagement within the department.
            </p>
          </div>

          {/* Campus Clubs */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Campus Clubs &amp; Extracurriculars</h4>
                <h5>PES University</h5>
              </div>
              <h3>2024–26</h3>
            </div>
            <p>
              Active member across 5 clubs: <strong>AIESEC</strong> (global
              leadership &amp; exchange), <strong>Samarpana</strong> (social
              impact &amp; volunteering), <strong>Weal</strong> (student
              welfare), <strong>DEBSOC</strong> (debating &amp; public
              speaking), and <strong>AL Coding</strong> (competitive
              programming &amp; tech). Contributing to events, workshops, and
              community-driven initiatives on campus.
            </p>
          </div>

          {/* Hackathons & Achievements */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathons &amp; Achievements</h4>
                <h5>Competitions &amp; Awards</h5>
              </div>
              <h3>2022–26</h3>
            </div>
            <p>
              🥉 <strong>3rd Place</strong> — State-Level Cybersecurity
              Hackathon &nbsp;·&nbsp; Top 10 in 3 Hackathons &nbsp;·&nbsp; Top
              15 in 1 CTF &nbsp;·&nbsp; <strong>Mentor</strong> at a
              State-Level Hackathon. Participated in 4 Hackathons, 3 Ideathons,
              2 CTF Challenges &amp; 1 Datathon. Recipient of the{" "}
              <strong>3× CNR Scholarship</strong> and awarded{" "}
              <strong>Best Outgoing Student of the Year — 2022</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
