async function iceRestart(pc, webSocket, from, to, room) {
  const offer = await pc.createOffer({ iceRestart: true });
  await pc.setLocalDescription(offer);
  webSocket.send(
    JSON.stringify({ action: 'offer', from, to, offer, roomNumber: room }),
  );
}
