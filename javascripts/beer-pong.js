window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

var palmPositionHud = document.getElementById('palmPosition');
var palmVelocityHud = document.getElementById('palmVelocity');
var tipAvgVelHud = document.getElementById('tipAvgVel');
var pinchStrHud = document.getElementById('pinchStr');

(window.controller = new Leap.Controller)
  .use('riggedHand', {
    parent: window.scene,
    positionScale: 2.5,
    // assume right hand
    offset: (new THREE.Vector3(6, 10, 40))
  })
  .use('averageVelocity')
  .connect()
  .on('frame', function(frame){
    var hand, mesh;
    if (!frame.hands[0]) {
      return;
    }
    hand = frame.hands[0];
    mesh = hand.data('riggedHand.mesh');

    palmPositionHud.innerHTML = mesh.position.toArray().map(function(num){return Math.round(num)});
    palmVelocityHud.innerHTML = hand.palmVelocity.map(function(num){return Math.round(num)});
    tipAvgVelHud.innerHTML = hand.indexFinger.averageVelocity('tipPosition');
    pinchStrHud.innerHTML = hand.pinchStrength;

    // todo: pinch events
    if (hand.pinchStrength > 0.5) {
      // may need to use constraints for this
      pongBall.inHand = true;
      pongBall.position.copy(mesh.position);
      pongBall.physicsObject.velocity.set.apply(pongBall.physicsObject.velocity, hand.palmVelocity.map(function(num){ return num / 2000}))
    }else{
      pongBall.inHand = false;
    }
  });

Game.begin();

var gameId = window.location.hash.split('#')[1];
if (gameId) {
  firebase.child('/games/' + gameId + '/turns').on('child_added', function (turn) {
    Game.overlay(turn.val().name + ' throws!');
    controller.use('playback');
    var frames = controller.plugins.playback.player.decompress(turn.val().data);
    console.log(frames);
    controller.use('playback', {
      autoPlay: true,
      frames: frames,
      pauseOnHand: false,
      loop: true
    });
  });
}


window.gui = new dat.GUI({
  autoPlace: false
});

x = {gravity: 1}
var baseGravity = world.gravity.y;

gui.add(x, 'gravity',0, 10).onChange(function(value) {
  // Fires on every change, drag, keypress, etc.
  world.gravity.y = baseGravity * value;
});

document.getElementById('hud').appendChild(gui.domElement);

$(function() {
    if (/debug/.test(window.location.href)) {
        $('.debug').css('visibility', 'visible');
    }
});