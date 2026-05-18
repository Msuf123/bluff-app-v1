// onConnectionStateChange.js
const reconnectTimers = new Map(); // email → timer id

export default function onConnectionStateChange(pc, email, onReconnect) {
  switch (pc.connectionState) {
    case 'connected':
      // Cancel any pending reconnect — connection recovered
      if (reconnectTimers.has(email)) {
        clearTimeout(reconnectTimers.get(email));
        reconnectTimers.delete(email);
      }
      break;

    case 'disconnected':
      // ICE may self-heal (mobile network blip etc.) — wait 6s first
      if (!reconnectTimers.has(email)) {
        const timer = setTimeout(() => {
          reconnectTimers.delete(email);
          if (pc.connectionState === 'disconnected') {
            onReconnect(email, pc, 'ice-restart');
          }
        }, 6000);
        reconnectTimers.set(email, timer);
      }
      break;

    case 'failed':
      // Hard fail — reconnect immediately, no waiting
      if (reconnectTimers.has(email)) {
        clearTimeout(reconnectTimers.get(email));
        reconnectTimers.delete(email);
      }
      onReconnect(email, pc, 'full');
      break;

    case 'closed':
      reconnectTimers.delete(email);
      break;
  }
}
