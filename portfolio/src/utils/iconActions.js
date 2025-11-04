/**
 * Action handlers for different icon types/URL schemes
 * Each handler receives the icon object and should perform the appropriate action
 */

// Handler registry: maps URL scheme or action type to handler function
const actionHandlers = {
  // Protocol-based handlers
  'mailto:': (icon) => {
    window.location.href = icon.url
    return true // Indicates action was handled
  },
  'tel:': (icon) => {
    window.location.href = icon.url
    return true
  },
  // Custom action handlers can be added here
}

/**
 * Determines the action type from an icon's URL or action property
 * @param {Object} icon - The icon object
 * @returns {string|null} - The action type or null if no special action
 */
const getActionType = (icon) => {
  // Check for custom action type first
  if (icon.action) {
    return icon.action
  }
  
  // Check URL scheme
  if (icon.url && typeof icon.url === 'string') {
    for (const [scheme, handler] of Object.entries(actionHandlers)) {
      if (icon.url.startsWith(scheme)) {
        return scheme
      }
    }
  }
  
  return null
}

/**
 * Executes the appropriate action for an icon
 * @param {Object} icon - The icon object
 * @returns {boolean} - True if action was handled, false if should fall through to default (open window)
 */
export const handleIconAction = (icon) => {
  const actionType = getActionType(icon)
  
  if (actionType && actionHandlers[actionType]) {
    return actionHandlers[actionType](icon)
  }
  
  // No special action handler found, return false to indicate default behavior
  return false
}

/**
 * Register a new action handler
 * @param {string} actionType - The action type (e.g., 'mailto:', 'custom-action')
 * @param {Function} handler - The handler function that receives the icon object
 */
export const registerActionHandler = (actionType, handler) => {
  actionHandlers[actionType] = handler
}

