(function () {
  "use strict";

  // This class handles two things:
  // - Frame Callbacks for gameplay
  // - Frame sharing between players

  window.LeapHandler = {};

  // streaming hasn't yet made it in to 0.6.0-beta1
  LeapHandler.streaming = false;
  LeapHandler.frameSharingEnabled = false;

  var palmPositionHud = document.getElementById('palmPosition');
  var palmVelocityHud = document.getElementById('palmVelocity');
  var tipAvgVelHud = document.getElementById('tipAvgVel');
  var pinchStrHud = document.getElementById('pinchStr');


  // Keys are firebase player IDs
  // Values are the most-recent frame from that player
  // This data is used by the animation loop
  LeapHandler.userFrames = {};


  // gets set after Leap controller is set up.
  this.playback = undefined;


  LeapHandler.addUserFrame = function(userId, data){
    this.userFrames[userId] = data;
  }


  LeapHandler.enableFrameSharing = function () {
    if (this.frameSharingEnabled) return;
    this.frameSharingEnabled = true;
    // This sorely needs proper LeapJS support

    this.originalProtocol = window.controller.connection.protocol;
    window.controller.connection.protocol = this.shareFrameDataProtocol;
  }

  // takes in a frame from the local machine
  LeapHandler.shareFrameDataProtocol = function(localFrameData){
    var eventOrFrame = LeapHandler.originalProtocol(localFrameData);

    if (eventOrFrame instanceof Leap.Frame) {
      LeapHandler.makeIdsUniversal(localFrameData);

      if (localFrameData.id % 2 == 0 && localFrameData.hands.length){
        Game.shareFrameData(localFrameData);
      }

      // this means creating double frames every time. eh.
      eventOrFrame = LeapHandler.createSplicedFrame(localFrameData);
    }

    return eventOrFrame;
  }

  // converts hand and pointable integer IDs to UUIDs
  LeapHandler.makeIdsUniversal = function(frameData){
    var i, hand, pointable;

    for (i = 0; i < frameData.hands.length; i++) {
      hand = frameData.hands[i];
      hand.id = hand.id + Game.userId;
      hand.userId = Game.userId;
    }

    for (i = 0; i < frameData.pointables.length; i++) {
      pointable = frameData.pointables[i];
      pointable.id = pointable.id + Game.userId;
      pointable.handId = pointable.handId + Game.userId;
    }
  }


  LeapHandler.createSplicedFrame = function(localFrameData){

    // C&P out of recordFrameHandler, but without the call to finishRecording
    LeapHandler.playback.setGraphic('wave');
    if (localFrameData.hands.length > 0){
      LeapHandler.playback.frameData.push(localFrameData);
      LeapHandler.playback.hideOverlay();
    }

    LeapHandler.spliceInSharedFrames(localFrameData);
    return new Leap.Frame(localFrameData);
  }

  // we merge two frames together, customizing as we go
  // IDs become ID + userId.  e.g., "60900
  LeapHandler.spliceInSharedFrames = function(frameData){
    var i, hand, pointable, userFrame, userId; // no pointable support for now

    for (userId in this.userFrames){
      userFrame = this.userFrames[userId];

      if (userFrame.hands){ // not sure why
        for (i = 0; i < userFrame.hands.length; i++){
          frameData.hands.push(userFrame.hands[i]);
        }
        for (i = 0; i < userFrame.pointables.length; i++){
          frameData.pointables.push(userFrame.pointables[i]);
        }
      }

// Actually, we can't do that, because the local framerate is greater than the remote.
//      // This is important as it means if one player stops sending frames,
//      // they disappear:
//      delete this.userFrames[userId];
    }
  }

  // When the controller is not connected, this makes sure frame data gets used and emitted
  LeapHandler.updateSharedFramesLoop = function(){
    if (this.streaming) return;
    var userId, frameData, frame;

    // take the first frame as the "master" frame which others are added to
    for (userId in this.userFrames){
      break;
    }


    if (userId){
      frameData = this.userFrames[userId];
      delete this.userFrames[userId];
      this.spliceInSharedFrames(frameData);

      frame = new Leap.Frame(frameData);
      console.log('observer loop. hands:', frame.hands.length);

      // send a deviceFrame to the controller:
      // this frame gets picked up by the controllers own animation loop.
      // todo: might be introducing an artificial frame of lag here :-/
      window.controller.processFrame(frame);
    }


    window.requestAnimationFrame(this.updateSharedFramesLoop);
  }.bind(LeapHandler);


  LeapHandler.updateHud = function(hand, mesh){
    palmPositionHud.innerHTML = mesh.position.toArray().map(function(num){return Math.round(num)});
    palmVelocityHud.innerHTML = hand.palmVelocity.map(function(num){return Math.round(num)});
    pinchStrHud.innerHTML = hand.pinchStrength;
    tipAvgVelHud.innerHTML = hand.velocity.map(function(num){ return num.toPrecision(2) });
  }


  LeapHandler.trackThrow = function(hand, mesh){

    hand.velocity = hand.accumulate('palmVelocity', 20, function (historyTotal) {
      var current = [0,0,0];
      historyTotal.push(hand.palmVelocity);
      for (var i = 0; i<historyTotal.length; i++) {
        current[0] += historyTotal[i][0] * 0.02;
        current[1] += historyTotal[i][1] * 0.02;
        current[2] += historyTotal[i][2] * 0.02;
      }
      return current;
    });


    if (hand.pinchStrength > 0.5) {
      // may need to use constraints for this
      pongBall.inHand = true;
      pongBall.position.copy(mesh.position);
      pongBall.__dirtyPosition = true;
      pongBall.setLinearVelocity({x: hand.velocity[0], y: hand.velocity[1], z: hand.velocity[2]});
    } else {
      pongBall.inHand = false;
    }

  }

}).call(this);