window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

var palmPositionHud = document.getElementById('palmPosition');
var palmVelocityHud = document.getElementById('palmVelocity');
var gameId = window.location.hash.split('#')[1];
window.playbackPlayer = null;

(window.controller = new Leap.Controller)
  .use('riggedHand', {
    parent: window.scene,
    positionScale: 2.5,
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
    palmVelocityHud.innerHTML = hand.palmVelocity.map(function(num){return Math.round(num)});

    // todo: pinch events
    if (hand.pinchStrength > 0.5) {
      if (!window.recordFrames && gameId) {
        console.log('start recording');
        window.recordFrames = firebase.child('games').child(gameId).child('turns');
      }
      if (window.playbackPlayer && window.recordFrames) {
        console.log(playbackPlayer.currentFrame());//.currentFrame()
        window.recordFrames.push(playbackPlayer.currentFrame());
      }

      // may need to use constraints for this
      pongBall.inHand = true;
      pongBall.position.copy(mesh.position);
      pongBall.physicsObject.velocity.set.apply(pongBall.physicsObject.velocity, hand.palmVelocity.map(function(num){ return num / 2000}))
    } else {
      console.log('stop recording');
      window.recordFrames = false;
      pongBall.inHand = false;
    }
  });
  window.playbackPlayer = controller.use('playback').plugins.playback.player; // we might want to reconsider how people use this - Raimo

Game.begin();

if (gameId) {
  firebase.child('/games/' + gameId + '/turns').on('child_added', function (gameTurns) {
    return;
    window.recordFrames = false;
    window.remoteFrames = true;
    Game.overlay(gameTurns.val().name + ' throws!');
    gameTurns.on('child_added', function (turn) {
      playbackPlayer.sendFrame(turn.val());
      playbackPlayer.advanceFrame();
    })
  });
}


window.gui = new dat.GUI({
  autoPlace: false
});

x = {gravity: 1}

gui.add(x, 'gravity',1, 10).onChange(function(value) {
  // Fires on every change, drag, keypress, etc.
  world.gravity.y = -0.000982 * value;
});

document.getElementById('hud').appendChild(gui.domElement);

$(function() {
    if (/debug/.test(window.location.href)) {
        $('.debug').css('visibility', 'visible');
    }
});