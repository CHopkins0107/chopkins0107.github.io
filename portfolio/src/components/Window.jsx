import { useState, useRef, useEffect } from 'react'
import WindowContent from './WindowContent'
import './Window.css'

const Window = ({ window, onClose, onFocus, onMove, onResize, onMaximize, onMinimize }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 })
  const windowRef = useRef(null)

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('window-header') && !window.isMaximized) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - window.x,
        y: e.clientY - window.y,
      })
      onFocus()
      e.preventDefault()
    }
  }

  const handleResizeMouseDown = (e) => {
    if (!window.isMaximized) {
      setIsResizing(true)
      setResizeStart({
        width: window.width,
        height: window.height,
        x: e.clientX,
        y: e.clientY,
      })
      onFocus()
      e.preventDefault()
    }
  }

  // Use document-level event listeners for dragging/resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !window.isMaximized) {
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y
        onMove(window.id, newX, newY)
      } else if (isResizing && !window.isMaximized) {
        const newWidth = resizeStart.width + (e.clientX - resizeStart.x)
        const newHeight = resizeStart.height + (e.clientY - resizeStart.y)
        onResize(window.id, Math.max(300, newWidth), Math.max(200, newHeight))
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, resizeStart, window.id, window.isMaximized, onMove, onResize])

  return (
    <div
      ref={windowRef}
      className="window"
      style={{
        left: `${window.x}px`,
        top: `${window.y}px`,
        width: `${window.width}px`,
        height: `${window.height}px`,
        zIndex: window.zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="window-header">
        <span className="window-title">{window.title}</span>
        <div className="window-controls">
          <button className="window-minimize" onClick={onMinimize}>
            <span className="window-control-icon">−</span>
          </button>
          <button className="window-maximize" onClick={onMaximize}>
            <span className="window-control-icon">{window.isMaximized ? '▢' : '□'}</span>
          </button>
          <button className="window-close" onClick={onClose}>
            <span className="window-control-icon">×</span>
          </button>
        </div>
      </div>
      <div className="window-content">
        <WindowContent window={window} />
      </div>
      {!window.isMaximized && (
        <div className="window-resizer" onMouseDown={handleResizeMouseDown} />
      )}
    </div>
  )
}

export default Window
