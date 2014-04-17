(window.controller = new Leap.Controller)
  .use('riggedHand', {
    parent: window.scene
  })
  .connect()
  .on('frame', function(frame){
    var hand, mesh;
    if (!frame.hands[0]) {
      return;
    }
    hand = frame.hands[0];
    mesh = hand.data('riggedHand.mesh');
    if (hand.pinchStrength > 0.5) {
      pongBall.position.copy(mesh.position);
    }
  });