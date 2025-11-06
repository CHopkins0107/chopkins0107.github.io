import { useState } from 'react'
import Icon from './Icon'
import Window from './Window'
import Taskbar from './Taskbar'
import AboutMeContent from './AboutMeContent'
import ComingSoonContent from './ComingSoonContent'
import { handleIconAction } from '../utils/iconActions'
import './Desktop.css'

const Desktop = () => {
  const [windows, setWindows] = useState([])
  // Note: Most websites block use of iframes to embed their content. Save for specific cases.
  const [icons] = useState([
    { id: 'about', name: 'About Me', image: '', url: '/about', defaultSize: { width: 900, height: 600 } },
    { id: 'contact', name: 'Contact', image: '', url: 'mailto:chopkins0107@gmail.com' },
    // { id: 'github', name: 'GitHub', image: '', url: 'https://github.com/chopkins0107' },
  ])

  const openWindow = (icon) => {
    const windowId = `${icon.id}-${Date.now()}`
    const isExternal = typeof icon.url === 'string' && /^https?:\/\//.test(icon.url)
    
    // Content map for icon-based content
    const contentMap = {
      'about': () => <AboutMeContent />,
      'pictures': () => <ComingSoonContent title="Coming Soon" />,
      'music': () => <ComingSoonContent title="Coming Soon" />,
      'resume': () => (
        <iframe
          src="/Resume.pdf"
          title={icon.name}
          className="window-iframe"
          type="application/pdf"
        />
      ),
    }
    
    // Determine content based on icon clicked on
    let content = null
    if (isExternal) {
      content = (
        <iframe
          src={icon.url}
          title={icon.name}
          className="window-iframe"
          referrerPolicy="no-referrer"
        />
      )
    } else if (contentMap[icon.id]) {
      content = contentMap[icon.id]()
    }
    
    // Use default size from icon if provided, otherwise use default 600x400
    const defaultSize = icon.defaultSize || { width: 600, height: 400 }
    
    const newWindow = {
      id: windowId,
      iconId: icon.id,
      title: icon.name,
      content: content,
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 50,
      width: defaultSize.width,
      height: defaultSize.height,
      zIndex: windows.length + 1,
      isMaximized: false,
      isMinimized: false,
      prevX: Math.random() * 200 + 50,
      prevY: Math.random() * 200 + 50,
      prevWidth: 800,
      prevHeight: 600,
    }
    setWindows([...windows, newWindow])
  }

  const closeWindow = (windowId) => {
    setWindows(windows.filter((w) => w.id !== windowId))
  }

  const bringToFront = (windowId) => {
    const maxZIndex = Math.max(...windows.map((w) => w.zIndex))
    setWindows(
      windows.map((w) => {
        if (w.id === windowId) {
          return {
            ...w,
            zIndex: maxZIndex + 1,
            isMinimized: false, // Restore minimized windows
          }
        }
        return w
      })
    )
  }

  const updateWindowPosition = (windowId, x, y) => {
    setWindows(windows.map((w) => (w.id === windowId ? { ...w, x, y } : w)))
  }

  const updateWindowSize = (windowId, width, height) => {
    setWindows(windows.map((w) => (w.id === windowId ? { ...w, width, height } : w)))
  }

  const toggleMaximize = (windowId) => {
    setWindows(windows.map((w) => {
      if (w.id === windowId) {
        const isMaximizing = !w.isMaximized
        return {
          ...w,
          isMaximized: isMaximizing,
          prevX: w.isMaximized ? w.prevX : w.x,
          prevY: w.isMaximized ? w.prevY : w.y,
          prevWidth: w.isMaximized ? w.prevWidth : w.width,
          prevHeight: w.isMaximized ? w.prevHeight : w.height,
          x: isMaximizing ? 0 : w.prevX,
          y: isMaximizing ? 0 : w.prevY,
          width: isMaximizing ? window.innerWidth : w.prevWidth,
          height: isMaximizing ? window.innerHeight - 36 : w.prevHeight, // 36px for taskbar
        }
      }
      return w
    }))
  }

  const toggleMinimize = (windowId) => {
    setWindows(windows.map((w) => {
      if (w.id === windowId) {
        return { ...w, isMinimized: !w.isMinimized }
      }
      return w
    }))
  }

  const handleIconClick = (icon) => {
    // Check if icon has a special action handler (e.g., mailto:, tel:, custom actions)
    const wasHandled = handleIconAction(icon)
    
    // If no special action handler processed it, open a window
    if (!wasHandled) {
      openWindow(icon)
    }
  }

  return (
    <div className="desktop">
      {icons.map((icon) => (
        <Icon
          key={icon.id}
          icon={icon}
          onClick={() => handleIconClick(icon)}
        />
      ))}
      {windows.map((window) => (
        !window.isMinimized && (
          <Window
            key={window.id}
            window={window}
            onClose={() => closeWindow(window.id)}
            onFocus={() => bringToFront(window.id)}
            onMove={updateWindowPosition}
            onResize={updateWindowSize}
            onMaximize={() => toggleMaximize(window.id)}
            onMinimize={() => toggleMinimize(window.id)}
          />
        )
      ))}
      <Taskbar openWindow={openWindow} windows={windows} onWindowClick={bringToFront} />
    </div>
  )
}

export default Desktop
