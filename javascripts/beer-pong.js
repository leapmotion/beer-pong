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
    offset: (new THREE.Vector3(0, 3, 10))
  })
  .use('accumulate')
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

    var velocity = hand.accumulate('palmVelocity', 20, function (historyTotal) {
      var current = [0,0,0];
      historyTotal.push(hand.palmVelocity);
      for (var i = 0; i<historyTotal.length; i++) {
        console.log(historyTotal);
        current[0] += historyTotal[i][0] * 0.0035/2;
        current[1]  += historyTotal[i][1] * 0.0045/2;
        current[2]  += historyTotal[i][2] * 0.0045/2;
      }
      return current;
    });
    console.log(velocity);
    tipAvgVelHud.innerHTML = velocity.map(function(num){ return num.toPrecision(2) });
    pinchStrHud.innerHTML = hand.pinchStrength;

    // todo: pinch events
    if (hand.pinchStrength > 0.5) {
      // may need to use constraints for this
      pongBall.inHand = true;
      pongBall.position.copy(mesh.position);
      pongBall.physicsObject.velocity.set.apply(
        pongBall.physicsObject.velocity,
//        hand.palmVelocity.map(function(num){ return num / 2000}) //todo: make this not be an arbitrary number..
        velocity.map(function(num){ return num / 80})
      )
    }else{
      pongBall.inHand = false;
    }
  });

Game.begin();

var gameId = window.location.hash.split('#')[1];
if (gameId) {
  firebase.child('/games/' + gameId + '/turns').on('child_added', function (turn) {
    Game.overlay(turn.val().name + ' throws!');
    controller.use('playback', {
      autoPlay: true,
      recording: 'perfection.lz',
      pauseOnHand: false,
      loop: true
    });
  });
}
