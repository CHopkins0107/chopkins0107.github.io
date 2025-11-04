import './ComingSoonContent.css'

const ComingSoonContent = ({ title = 'Coming Soon' }) => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-icon">🚧</div>
      <h1 className="coming-soon-title">{title}</h1>
      <p className="coming-soon-message">
        This content is currently under development.
        <br />
        Please check back soon!
      </p>
    </div>
  )
}

export default ComingSoonContent

