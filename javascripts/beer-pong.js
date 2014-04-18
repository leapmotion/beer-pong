window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

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
    var hand, mesh;
    if (!frame.hands[0]) return;

    LeapHandler.enableFrameSending();

    // send only every fourth frame
    if (frame.id % 4){
      LeapHandler.sendLatestFrame()
    }

    hand = frame.hands[0];
    mesh = hand.data('riggedHand.mesh');

    LeapHandler.trackThrow(hand, mesh);

    LeapHandler.updateHud(hand, mesh);

  });

LeapHandler.playback = controller.plugins.playback.player;
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
