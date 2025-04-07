/**
 * Mock Mouse Event for testing
 */

export const simulant = {
  fire(target, type, options = {}) {
    // Create a basic event
    const event = document.createEvent('Event');
    
    // Initialize the event
    event.initEvent(type, true, true);
    
    // Add default mouse event properties - avoid using target which is read-only
    event.button = options.button || 0;
    event.clientX = options.clientX || 0;
    event.clientY = options.clientY || 0;
    event.ctrlKey = !!options.ctrlKey;
    event.altKey = !!options.altKey;
    event.shiftKey = !!options.shiftKey;
    event.metaKey = !!options.metaKey;
    
    // Copy other properties from options, excluding target
    const excludeList = ['target', 'button', 'clientX', 'clientY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
    
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key) && !excludeList.includes(key)) {
        try {
          event[key] = options[key];
        } catch (e) {
          // Ignore errors when setting read-only properties
        }
      }
    }
    
    // Dispatch the event
    target.dispatchEvent(event);
    
    return event;
  }
};

export default function mockMouseEvent(type, options = {}) {
  // Create a basic event
  const event = document.createEvent('Event');
  
  // Initialize the event
  event.initEvent(type, true, true);
  
  // Add default mouse event properties - avoid using target which is read-only
  event.button = options.button || 0;
  event.clientX = options.clientX || 0;
  event.clientY = options.clientY || 0;
  event.ctrlKey = !!options.ctrlKey;
  event.altKey = !!options.altKey;
  event.shiftKey = !!options.shiftKey;
  event.metaKey = !!options.metaKey;
  
  // Copy other properties from options, excluding target
  const excludeList = ['target', 'button', 'clientX', 'clientY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
  
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key) && !excludeList.includes(key)) {
      try {
        event[key] = options[key];
      } catch (e) {
        // Ignore errors when setting read-only properties
      }
    }
  }
  
  return event;
}