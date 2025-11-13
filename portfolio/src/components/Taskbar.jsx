import { useState, useEffect } from 'react'
import StartMenu from './StartMenu'
import './Taskbar.css'

const Taskbar = ({ openWindow, windows, onWindowClick }) => {
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <>
      <div className="taskbar">
        <button 
          className="start-button"
          onClick={() => setShowStartMenu(!showStartMenu)}
        >
          <span className="start-icon">👨🏽‍💻</span>
          <span className="start-text">start</span>
        </button>
        <div className="taskbar-windows">
          {windows.map((window) => (
            <button
              key={window.id}
              className="taskbar-window-button"
              onClick={() => onWindowClick(window.id)}
            >
              <span className="taskbar-window-icon">
                {window.iconId === 'resume' && '📄'}
                {window.iconId === 'about' && '👤'}
                {window.iconId === 'projects' && '💼'}
                {window.iconId === 'contact' && '📧'}
                {window.iconId === 'github' && '🐙'}
                {!['resume', 'about', 'projects', 'contact', 'github'].includes(window.iconId) && '📂'}
              </span>
              <span className="taskbar-window-title">{window.title}</span>
            </button>
          ))}
        </div>
        <div className="taskbar-spacer"></div>
        <div className="system-tray">
          <div className="date-time">
            <span className="date">{formatDate(currentTime)}</span>
            <span className="time">{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>
      {showStartMenu && (
        <StartMenu onClose={() => setShowStartMenu(false)} openWindow={openWindow} />
      )}
    </>
  )
}

export default Taskbar
