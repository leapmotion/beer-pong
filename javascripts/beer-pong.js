window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

// wat
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

    document.getElementById('handsHud').innerHTML = frame.hands.length;
    document.getElementById('streamingHud').innerHTML = LeapHandler.streaming;
    document.getElementById('firebaseHud').innerHTML = Game.playerCount;

    if (frame.valid && frame.local && !LeapHandler.streaming) {
      LeapHandler.streaming = true;
      LeapHandler.enableFrameSharing();
    }

    if (!frame.hands[0]) return;

    hand = frame.hands[0];
    mesh = hand.data('riggedHand.mesh');

    LeapHandler.trackThrow(hand, mesh);
    LeapHandler.updateHud(hand, mesh);

  });

// give a second to connect before immediately starting shared-frame-watching
setTimeout(function () {
  LeapHandler.updateSharedFramesLoop();
}, 1000);

controller.on('disconnect',         function(){ LeapHandler.streaming = false; LeapHandler.updateSharedFramesLoop(); });
controller.on('deviceDisconnected', function(){ LeapHandler.streaming = false; LeapHandler.updateSharedFramesLoop(); });

LeapHandler.playback = controller.plugins.playback.player;
Game.begin();
