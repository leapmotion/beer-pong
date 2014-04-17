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
  physicsObjects.push({
    physicsObject: sphereBody,
    sceneObject: pongBall
  })

  var groundShape = new CANNON.Plane();
  var groundBody = new CANNON.RigidBody(0,groundShape);
  groundBody.position.set(0,30,0);
  world.add(groundBody);

  // todo: add table

}).call(this);