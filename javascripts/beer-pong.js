window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

(window.controller = new Leap.Controller)
  .use('riggedHand', {
    parent: window.scene,
    positionScale: 2,
    // assume right hand
    offset: (new THREE.Vector3(6, 10, 40))
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

Game.begin()