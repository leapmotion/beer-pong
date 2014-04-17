// This files exports a hash map of cannonjs physical objects to threejs  visual objects
// This is iterated over in the THREEjs render loop

(function(){

  window.physicsObjects = []

  // Setup our world
  window.world = new CANNON.World();
  world.gravity.set(0,-0.00000982,0);
  world.broadphase = new CANNON.NaiveBroadphase();

  var mass = 5, radius = 1;
  var sphereShape = new CANNON.Sphere(radius);
  var sphereBody = new CANNON.RigidBody(mass,sphereShape);
  sphereBody.position.set(0,50,50);
  world.add(sphereBody);

  sphereBody.velocity.set(0.05,0,0);
  sphereBody.linearDamping = 0.0001

  pongBall.physicsObject = sphereBody;
  physicsObjects.push({
    physicsObject: sphereBody,
    sceneObject: pongBall
  });

  var groundShape = new CANNON.Plane();
  window.groundBody = new CANNON.RigidBody(0,groundShape);


  groundBody.position.set(0,30,0);
  groundBody.quaternion.setFromAxisAngle({x: 1,y:0,z:0}, Math.PI / 2)
  world.add(groundBody);

  // todo: add table

}).call(this);