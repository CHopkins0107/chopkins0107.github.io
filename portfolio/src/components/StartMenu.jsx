import './StartMenu.css'

const StartMenu = ({ onClose, openWindow }) => {
  const handleResumeClick = (e) => {
    e.stopPropagation()
    const resumeIcon = {
      id: 'resume',
      name: 'Resume',
      image: '',
      url: '/Resume.pdf',
      defaultSize: { width: 800, height: 600 }
    }
    openWindow(resumeIcon)
    onClose()
  }
  const handleMenuItemClick = (e, item) => {
    e.stopPropagation()
    
    // If item has an external URL, open in new tab
    if (item && item.url && /^https?:\/\//.test(item.url)) {
      const target = '_blank'
      const features = 'noopener,noreferrer'
      window.open(item.url, target, features)
      onClose()
      return
    }
    
    // If item should open a window (like "My Pictures" or "My Music")
    if (item && item.id) {
      const icon = {
        id: item.id,
        name: item.text,
        image: '',
        url: item.url || '',
        defaultSize: item.defaultSize
      }
      openWindow(icon)
      onClose()
      return
    }
  }
  const user = {
    name: 'Portfolio User'
  }

  // Example external link items (will open in new tab)
  // { icon: '🌐', text: 'Portfolio Site', url: 'https://example.com' },
  const menuItems = [
    { icon: '📁', text: 'My Repositories', id: 'repositories', defaultSize: { width: 600, height: 400 } },
    { icon: '🖼️', text: 'My Pictures', id: 'pictures', defaultSize: { width: 600, height: 400 } },
    { icon: '🎵', text: 'My Music', id: 'music', defaultSize: { width: 600, height: 400 } },
    { icon: '🎮', text: 'My Games', url: 'https://aespirin.itch.io' },
    
  ]

  const actions = [
    { icon: '🔒', text: 'Log Off', action: 'logoff' },
    { icon: '⏻', text: 'Shutdown', action: 'shutdown' },
  ]

  return (
    <div className="start-menu-overlay" onClick={onClose}>
      <div className="start-menu" onClick={(e) => e.stopPropagation()}>
        <div className="start-menu-header">
          <div className="user-section">
            <div className="user-name">{user.name}</div>
          </div>
        </div>
        <div className="start-menu-body">
          <div className="left-pane">
            <div className="left-pane-label">Most Recent</div>
            <div className="recent-item" onClick={handleResumeClick}>
              <span className="menu-item-icon">📄</span>
              <span className="menu-item-text">Resume</span>
            </div>
          </div>
          <div className="right-pane">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onClick={(e) => handleMenuItemClick(e, item)}
                role="button"
              >
                <span className="menu-item-icon">{item.icon}</span>
                <span className="menu-item-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="start-menu-footer">
          {actions.map((action, index) => (
            <div key={index} className="menu-item">
              <span className="menu-item-icon">{action.icon}</span>
              <span className="menu-item-text">{action.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StartMenu
