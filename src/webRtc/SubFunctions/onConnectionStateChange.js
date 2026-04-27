export default function onConnectionStateChange(pc) {
  switch (pc.connectionState) {
    case 'new':
      //   console.log("New connection created.");
      break;
    case 'connecting':
      // console.log("Attempting to establish a connection...");
      break;
    case 'connected':
      // console.log("✅ Connection established successfully!");
      break;
    case 'disconnected':
      //console.warn("⚠️ Connection temporarily lost.");
      break;
    case 'failed':
      //console.error("❌ Connection failed!");
      // You can trigger a reconnection or show a toast

      break;
    case 'closed':
      //console.log("🔒 Connection closed.");
      break;
  }
}
