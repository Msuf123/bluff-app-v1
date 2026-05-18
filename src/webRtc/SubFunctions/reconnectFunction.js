// In your main component / websocket setup
function buildReconnectFn(
  webSocket,
  playerGameArea,
  setPeerConnectionState,
  ices,
  remoteAudios,
  setRemoteStream,
) {
  return async function onReconnect(email, pc, mode) {
    const { yourEmail, room } = store.get(playerGameArea);

    if (mode === 'ice-restart') {
      // Cheap — reuse same RTCPeerConnection, just find new ICE path
      try {
        const offer = await pc.createOffer({ iceRestart: true });
        await pc.setLocalDescription(offer);
        webSocket.send(
          JSON.stringify({
            action: 'offer',
            from: yourEmail,
            to: email,
            offer,
            roomNumber: room,
          }),
        );
      } catch (err) {
        console.error(
          'ICE restart failed, falling back to full reconnect',
          err,
        );
        onReconnect(email, pc, 'full'); // escalate
      }
      return;
    }

    if (mode === 'full') {
      // Expensive — close old pc, make a brand new one
      if (pc && pc.signalingState !== 'closed') {
        pc.close();
      }
      pendingCandidates.delete(email);

      // Reuse makeOffer with reconnetWebRtc=true for just this one peer
      const fakeData = {
        data: {
          yourEmail,
          room,
          players: [{ email }], // only reconnect this one peer
        },
      };

      await makeOffer(
        fakeData,
        ices,
        store.get(micMediaStream),
        {}, // pass empty so dedup check doesn't skip this email
        setPeerConnectionState,
        Toast,
        webSocket,
        () => {},
        remoteAudios,
        setRemoteStream,
        true, // reconnetWebRtc = true
      );
    }
  };
}
