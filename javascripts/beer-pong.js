window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

var palmPositionHud = document.getElementById('palmPosition');
var palmVelocityHud = document.getElementById('palmVelocity');
var tipAvgVelHud = document.getElementById('tipAvgVel');
var pinchStrHud = document.getElementById('pinchStr');
var frameTrafficHud = document.getElementById('frameTraffic');
var player;

var booSound = document.getElementById('boo');
booSound.addEventListener('ended', function() { booSound.load(); });

(window.controller = new Leap.Controller)
  .use('riggedHand', {
    parent: window.scene,
    positionScale: 2.5,
    // assume right hand
    offset: (new THREE.Vector3(0, 3, 10))
  })
  .use('accumulate')
  .connect()
  .use('playback')
  .on('frame', function(frame){

  pongBall.position.set(0,50,0);
    var hand, mesh;
    if (!frame.hands[0]) {

      return;
    }

    if (player.state != 'recording'){
      // we can't put this on ready because of strange "unrecognized version" error in chooseProtocol.
      player.record();
    }
//    console.log(player.frameData.length);

    if (frame.id % 4 && player.frameData.length){
      // it takes 1 frame to begin recording, so we check length too
      Game.sendFrame(player.frameData[player.frameData.length -1]);
    }

    hand = frame.hands[0];
    mesh = hand.data('riggedHand.mesh');

    palmPositionHud.innerHTML = mesh.position.toArray().map(function(num){return Math.round(num)});
    palmVelocityHud.innerHTML = hand.palmVelocity.map(function(num){return Math.round(num)});
    frameTrafficHud.innerHTML = Game.framesSent +  '/' + Game.framesReceived;
//    console.log(Game.framesReceived, Game.framesSent);


    var velocity = hand.accumulate('palmVelocity', 20, function (historyTotal) {
      var current = [0,0,0];
      historyTotal.push(hand.palmVelocity);
      for (var i = 0; i<historyTotal.length; i++) {
        current[0] += historyTotal[i][0] * 0.0035/2;
        current[1]  += historyTotal[i][1] * 0.0045/2;
        current[2]  += historyTotal[i][2] * 0.0045/2;
      }
      return current;
    });
    tipAvgVelHud.innerHTML = velocity.map(function(num){ return num.toPrecision(2) });
    pinchStrHud.innerHTML = hand.pinchStrength;


    if (hand.pinchStrength > 0.5) {
      // may need to use constraints for this
      pongBall.inHand = true;
      pongBall.position.copy(mesh.position);
      pongBall.physicsObject.velocity.set.apply(
        pongBall.physicsObject.velocity,
//        hand.palmVelocity.map(function(num){ return num / 2000}) //todo: make this not be an arbitrary number..
        velocity.map(function(num){ return num / 80})
      )
    } else {
      pongBall.inHand = false;
      var lostHeight = -10;
    }

    if (pongBall.position.y < lostHeight && !pongBall.belowTable && !pongBall.inHand) {
      booSound.play();
      pongBall.belowTable = true;
    } else if (pongBall.position.y >= lostHeight && pongBall.belowTable) {
      pongBall.belowTable = false;
    }

  });

player = controller.plugins.playback.player;
Game.begin();





//if (gameId) {
//  firebase.child('/games/' + gameId + '/turns').on('child_added', function (turn) {
//    Game.overlay(turn.val().name + ' throws!');
//    controller.use('playback', {
//      autoPlay: true,
//      recording: 'perfection.lz',
//      pauseOnHand: false,
//      loop: true
//    });
//  });
//}
