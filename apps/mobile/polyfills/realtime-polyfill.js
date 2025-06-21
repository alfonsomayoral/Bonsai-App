// Polyfill para @supabase/realtime-js en React Native
// Este archivo reemplaza la librería realtime que usa ws

class RealtimePolyfill {
  constructor() {
    console.warn('Supabase Realtime not supported in Expo Go - using polyfill');
    this.isConnected = false;
    this.channels = new Map();
  }

  connect() {
    console.warn('Realtime.connect() not supported in polyfill');
    return Promise.resolve();
  }

  disconnect() {
    console.warn('Realtime.disconnect() not supported in polyfill');
    return Promise.resolve();
  }

  channel(name) {
    console.warn(`Realtime.channel(${name}) not supported in polyfill`);
    return new ChannelPolyfill(name);
  }

  removeAllChannels() {
    console.warn('Realtime.removeAllChannels() not supported in polyfill');
  }

  getChannels() {
    return [];
  }
}

class ChannelPolyfill {
  constructor(name) {
    this.name = name;
    this.subscribers = new Map();
  }

  subscribe(callback) {
    console.warn(`Channel.subscribe() not supported in polyfill for ${this.name}`);
    return { unsubscribe: () => {} };
  }

  unsubscribe() {
    console.warn(`Channel.unsubscribe() not supported in polyfill for ${this.name}`);
  }

  on(event, callback) {
    console.warn(`Channel.on(${event}) not supported in polyfill for ${this.name}`);
    return this;
  }

  off(event, callback) {
    console.warn(`Channel.off(${event}) not supported in polyfill for ${this.name}`);
    return this;
  }

  send(type, payload) {
    console.warn(`Channel.send(${type}) not supported in polyfill for ${this.name}`);
    return this;
  }
}

module.exports = RealtimePolyfill; 