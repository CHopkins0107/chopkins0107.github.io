import './AboutMeContent.css'

const AboutMeContent = () => {
  return (
    <div className="wikipedia-page">
      <div className="wikipedia-main">
        <h1 className="wikipedia-title">Portfolio User</h1>
        <div className="wikipedia-subtitle">From Wikipedia, the free encyclopedia</div>
        
        <div className="wikipedia-infobox">
          <div className="infobox-header">Portfolio User</div>
          <div className="infobox-content">
            <div className="infobox-image">
              <div className="placeholder-image">👤</div>
              <div className="image-caption">Portfolio User</div>
            </div>
            <table className="infobox-table">
              <tbody>
                <tr>
                  <th>Born</th>
                  <td>1990s</td>
                </tr>
                <tr>
                  <th>Nationality</th>
                  <td>American</td>
                </tr>
                <tr>
                  <th>Occupation</th>
                  <td>Software Developer</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td><a href="#">portfolio.example.com</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="wikipedia-content">
          <p>
            <strong>Portfolio User</strong> is a software developer and creative professional 
            known for their work in web development and user interface design. They have 
            contributed to various projects focusing on modern web technologies and user 
            experience optimization.
          </p>

          <h2>Early Life and Education</h2>
          <p>
            Portfolio User was born in the 1990s and developed an early interest in 
            computer science and technology. They pursued their education in software 
            engineering, focusing on web development and human-computer interaction. 
            Throughout their academic career, they demonstrated a strong aptitude for 
            problem-solving and creative design.
          </p>

          <h2>Career</h2>
          <p>
            Beginning their career in software development, Portfolio User has worked on 
            numerous projects ranging from personal websites to enterprise applications. 
            They specialize in creating responsive, accessible web interfaces using 
            modern frameworks and best practices. Their work emphasizes clean code, 
            user-centered design, and performance optimization.
          </p>

          <h2>Projects and Contributions</h2>
          <p>
            Portfolio User has contributed to various open-source projects and personal 
            initiatives. Their portfolio showcases a diverse range of work, including 
            interactive web applications, responsive design implementations, and 
            innovative user interface solutions.
          </p>

          <h2>Personal Life</h2>
          <p>
            When not coding, Portfolio User enjoys exploring new technologies, 
            contributing to the developer community, and working on creative side 
            projects. They maintain an active presence in online development communities 
            and share knowledge through various platforms.
          </p>

          <h2>See Also</h2>
          <ul>
            <li><a href="#">Web Development</a></li>
            <li><a href="#">User Interface Design</a></li>
            <li><a href="#">Software Engineering</a></li>
          </ul>

          <h2>References</h2>
          <ol>
            <li>
              <cite>"Portfolio Website"</cite>. portfolio.example.com. Retrieved 2024.
            </li>
            <li>
              <cite>"GitHub Profile"</cite>. github.com. Retrieved 2024.
            </li>
          </ol>
        </div>
      </div>

      
    </div>
  )
}

export default AboutMeContent

