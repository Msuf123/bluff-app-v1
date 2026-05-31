export function cleanupPeerConnections(peerConnections) {
  Object.values(peerConnections).forEach(pc => {
    // Stop all outgoing (local) tracks
    pc.getSenders().forEach(sender => {
      if (sender.track) {
        sender.track.stop();
      }
    });

    // Stop all incoming (remote) tracks
    pc.getReceivers().forEach(receiver => {
      if (receiver.track) {
        receiver.track.stop();
      }
    });

    // Close the connection itself
    pc.close();
  });
}
