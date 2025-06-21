// Polyfill para ws en React Native
// Este archivo reemplaza la librería ws que no es compatible con React Native

class WebSocketPolyfill {
  constructor(url, protocols) {
    console.warn('WebSocket not supported in React Native - using polyfill');
    this.readyState = 3; // CLOSED
    this.url = url;
    this.protocols = protocols;
  }

  send(data) {
    console.warn('WebSocket.send() not supported in polyfill');
  }

  close(code, reason) {
    console.warn('WebSocket.close() not supported in polyfill');
  }

  addEventListener(type, listener) {
    console.warn('WebSocket.addEventListener() not supported in polyfill');
  }

  removeEventListener(type, listener) {
    console.warn('WebSocket.removeEventListener() not supported in polyfill');
  }
}

// Propiedades estáticas
WebSocketPolyfill.CONNECTING = 0;
WebSocketPolyfill.OPEN = 1;
WebSocketPolyfill.CLOSING = 2;
WebSocketPolyfill.CLOSED = 3;

module.exports = WebSocketPolyfill; 