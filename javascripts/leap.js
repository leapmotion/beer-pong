(function () {
  "use strict";

  // This class handles one things:
  // - Frame Callbacks for gameplay

  window.LeapHandler = {};

  var palmPositionHud = document.getElementById('palmPosition');
  var palmVelocityHud = document.getElementById('palmVelocity');
  var tipAvgVelHud = document.getElementById('tipAvgVel');
  var pinchStrHud = document.getElementById('pinchStr');



  LeapHandler.updateHud = function(hand, mesh){
    palmPositionHud.innerHTML = mesh.position.toArray().map(function(num){return Math.round(num)});
    palmVelocityHud.innerHTML = hand.palmVelocity.map(function(num){return Math.round(num)});
    pinchStrHud.innerHTML = hand.pinchStrength;
    tipAvgVelHud.innerHTML = hand.velocity.map(function(num){ return num.toPrecision(2) });
  }


  LeapHandler.followPhysics = function(frame){
    if (frame.ballPosition){
      pongBall.position.fromArray(frame.ballPosition)
      pongBall.__dirtyPosition = true;
      pongBall.mass = 0;
    }
  }

  LeapHandler.trackThrow = function(leapHand, handMesh){
    if (leapHand.pinchStrength > 0.5) {
      if (!pongBall.inHand) pongBall.grab();

      var finger1 = leapHand.indexFinger.tipPosition;
      var finger2 = leapHand.thumb.tipPosition;
      // may need to use constraints for this

      handMesh.scenePosition([(finger1[0]+finger2[0])/2, (finger1[1]+finger2[1])/2, (finger1[2]+finger2[2])/2], pongBall.position);
      pongBall.__dirtyPosition = true;
      pongBall.setLinearVelocity({x: leapHand.velocity[0], y: leapHand.velocity[1], z: leapHand.velocity[2]});

    }else{
      if (pongBall.inHand) pongBall.release();
//      if (!pongBall.inFlight()){
//        console.log('ball is stationary, aborting turn');
//        Game.toggleTurn();
//      }
    }
  }

}).call(this);