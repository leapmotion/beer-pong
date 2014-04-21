window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

// wat
var booSound = document.getElementById('boo');
booSound.addEventListener('ended', function() { booSound.load(); });

(window.controller = new Leap.Controller)
  .use('transform', {
    quaternion: function(hand){
      var player = Game.getPlayerById(hand.userId);
      var quaternion = (player && player.options.handQuaternion) || Game.player1.options.handQuaternion;
      return quaternion
    },
    position: function(hand){
      // these numbers are hardcoded in raw leap-space, not sure how to convert easily yet
      var player = Game.getPlayerById(hand.userId);
      return (player && player.options.handOffset)    || Game.player1.options.handOffset;
    }//,
//    scale: function(hand){
//      return new THREE.Vector3(2,2,2);
//    }
  })
  .use('riggedHand', {
    parent: window.scene,
    positionScale: 2.5,
    scale: 1.5
  })
  .use('accumulate')
  .connect()
  .use('playback')
  .on('frame', function(frame){

    var hand, mesh;

    document.getElementById('handsHud').innerHTML     = frame.hands.length;
    document.getElementById('streamingHud').innerHTML = LeapHandler.streamingLocalFrames;
    document.getElementById('firebaseHud').innerHTML  = Game.playerCount;

    if (frame.valid && frame.local && !LeapHandler.streamingLocalFrames) {
      LeapHandler.streamingLocalFrames = true;
      LeapHandler.enableFrameSharing();
    }

    if (!frame.hands[0]) return;

    hand = frame.hands[0];
    mesh = hand.data('riggedHand.mesh');

    LeapHandler.trackThrow(hand, mesh, frame);
    LeapHandler.updateHud(hand, mesh);

  });

// give a second to connect before immediately starting shared-frame-watching
setTimeout(function () {
  LeapHandler.updateSharedFramesLoop();
}, 1000);

controller.on('disconnect',         function(){ LeapHandler.streamingLocalFrames = false; LeapHandler.updateSharedFramesLoop(); });
controller.on('deviceDisconnected', function(){ LeapHandler.streamingLocalFrames = false; LeapHandler.updateSharedFramesLoop(); });

LeapHandler.playback = controller.plugins.playback.player;

$('#new-game').click(function() {
  $('#main-menu').hide();
  $('#players').show();
  Game.reset();
});
$('#players').hide();
Game.begin();


// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
