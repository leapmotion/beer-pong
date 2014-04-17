window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

var palmPositionHud = document.getElementById('palmPosition');

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

    palmPositionHud.innerHTML = mesh.position.toArray().map(function(num){return Math.round(num)});
    if (hand.pinchStrength > 0.5) {
      pongBall.position.copy(mesh.position);
    }
  });

Game.begin()




window.gui = new dat.GUI({
  autoPlace: false
});

x = {gravity: 1}

gui.add(x, 'gravity',1, 10).onChange(function(value) {
  // Fires on every change, drag, keypress, etc.
  world.gravity.y = -0.00000982 * value;
});

document.getElementById('hud').appendChild(gui.domElement);

$(function() {
    if (/debug/.test(window.location.href)) {
        $('.debug').css('visibility', 'visible');
    }
});