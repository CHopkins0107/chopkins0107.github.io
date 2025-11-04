import './WindowContent.css'

const WindowContent = ({ window, children }) => {
  // If custom content is provided (like iframe), render it
  if (window.content) {
    return <div className="window-content-wrapper">{window.content}</div>
  }

  // If children are provided, render them (for custom content components)
  if (children) {
    return <div className="window-content-wrapper">{children}</div>
  }

  // Default placeholder content
  return (
    <div className="window-content-wrapper">
      <div className="window-content-placeholder">
        <p>{window.title}</p>
        <p className="window-content-placeholder-hint">Content coming soon...</p>
      </div>
    </div>
  )
}

export default WindowContent

