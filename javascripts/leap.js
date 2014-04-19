(function () {

  window.LeapHandler = {}

  var palmPositionHud = document.getElementById('palmPosition');
  var palmVelocityHud = document.getElementById('palmVelocity');
  var tipAvgVelHud = document.getElementById('tipAvgVel');
  var pinchStrHud = document.getElementById('pinchStr');
  var frameTrafficHud = document.getElementById('frameTraffic');

  // Keys are firebase player IDs
  // Values are the most-recent frame from that player
  // This data is used by the animation loop
  LeapHandler.userFrames = {}

  // gets set after Leap controller is set up.
  this.playback = undefined;


  LeapHandler.addUserFrame = function(userId, data){
    this.userFrames[userId] = data;
  }


  LeapHandler.enableFrameSending = function () {
    if (LeapHandler.playback.state != 'recording') {
      // we can't put this on ready because of strange "unrecognized version" error in chooseProtocol.
      LeapHandler.playback.record();
    }
  }


  LeapHandler.sendLatestFrame = function(){
    // it takes 1 frame to begin recording, so we check length too
    if (!this.playback.frameData.length){ return }

    Game.sendFrame(LeapHandler.playback.frameData[this.playback.frameData.length -1]);

    // Clean up old frames to prevent massive memory overload.
    LeapHandler.playback.frameData.shift()
  }


  LeapHandler.updateHud = function(hand, mesh){
    palmPositionHud.innerHTML = mesh.position.toArray().map(function(num){return Math.round(num)});
    palmVelocityHud.innerHTML = hand.palmVelocity.map(function(num){return Math.round(num)});
    frameTrafficHud.innerHTML = Game.framesSent +  '/' + Game.framesReceived;
    pinchStrHud.innerHTML = hand.pinchStrength;
    tipAvgVelHud.innerHTML = hand.velocity.map(function(num){ return num.toPrecision(2) });
  }


  LeapHandler.trackThrow = function(hand, mesh){

    hand.velocity = hand.accumulate('palmVelocity', 20, function (historyTotal) {
      var current = [0,0,0];
      historyTotal.push(hand.palmVelocity);
      for (var i = 0; i<historyTotal.length; i++) {
        current[0] += historyTotal[i][0] * 0.0045;
        current[1]  += historyTotal[i][1] * 0.0045;
        current[2]  += historyTotal[i][2] * 0.0045;
      }
      return current;
    });


    if (hand.pinchStrength > 0.5) {
      // may need to use constraints for this
      pongBall.inHand = true;
      pongBall.position.copy(mesh.position);
      pongBall.__dirtyPosition = true;
      pongBall.setLinearVelocity({x: hand.velocity[0], y: hand.velocity[1], z: hand.velocity[2]});
      console.log(pongBall.velocity);
    } else {
      pongBall.inHand = false;
    }

  }

}).call(this);