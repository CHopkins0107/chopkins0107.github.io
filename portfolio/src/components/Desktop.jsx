import { useState } from 'react'
import Icon from './Icon'
import Window from './Window'
import Taskbar from './Taskbar'
import './Desktop.css'

const Desktop = () => {
  const [windows, setWindows] = useState([])
  // Note: Most websites block use of iframes to embed their content. Save for specific cases.
  const [icons] = useState([
    { id: 'about', name: 'About Me', image: '', url: '/about' },
    { id: 'projects', name: 'Projects', image: '', url: '/projects' },
    { id: 'contact', name: 'Contact', image: '', url: '/contact' },
    { id: 'github', name: 'GitHub', image: '', url: 'https://itch.io/' },
  ])

  const openWindow = (icon) => {
    const windowId = `${icon.id}-${Date.now()}`
    const isExternal = typeof icon.url === 'string' && /^https?:\/\//.test(icon.url)
    const newWindow = {
      id: windowId,
      iconId: icon.id,
      title: icon.name,
      content: isExternal ? (
        <iframe
          src={icon.url}
          title={icon.name}
          className="window-iframe"
          referrerPolicy="no-referrer"
        />
      ) : null,
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 50,
      width: 600,
      height: 400,
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

  return (
    <div className="desktop">
      {icons.map((icon) => (
        <Icon
          key={icon.id}
          icon={icon}
          onClick={() => openWindow(icon)}
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
