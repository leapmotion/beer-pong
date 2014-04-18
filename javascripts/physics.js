// This files exports a hash map of cannonjs physical objects to threejs  visual objects
// This is iterated over in the THREEjs render loop

(function () {

  window.physicsObjects = [];

  // this controls the drag on the ball
  var linearDamping = 0.00001;

  // Setup our world
  window.world = new CANNON.World();
  world.broadphase = new CANNON.NaiveBroadphase();

  // Controls gravity
  world.gravity.set(0, -0.0008, 0);

  // this controls the bouncyness of the ball
  // (we could create a new contact material with both the table material and ball material
  // instead, just change the global contactmaterial)
  world.defaultContactMaterial.restitution = 1


  THREE.Mesh.prototype.addPhysics = function(){
    if (this.geometry instanceof THREE.SphereGeometry){
      // for some reason, we double the pong ball radius in order to make it not go in to table.
      var mass = 5, radius = 2;

      var sphereShape = new CANNON.Sphere(radius);
      var sphereBody = new CANNON.RigidBody(mass, sphereShape);
      this.physicsObject = sphereBody;

      sphereBody.position.set(0, 50, 50);
      sphereBody.linearDamping = linearDamping;

      world.add(sphereBody);

      physicsObjects.push({
        physicsObject: sphereBody,
        sceneObject: pongBall
      });

    }else {
      throw "Unsupported physics on" + this.geometry
    }
  }


  pongBall.addPhysics();

  // 0 mass is infinite
  var safetyNet = 100;
  var table = new CANNON.RigidBody(0,
    new CANNON.Box(new CANNON.Vec3(
      scene.table.geometry.width / 2,
      scene.table.geometry.height / 2 + safetyNet,
      scene.table.geometry.depth / 2 // quadruple depth to prevent fall-through
    ))
  );
  table.position.set(0,-safetyNet,0);


  world.add(table);
  var collisionSound = document.getElementById('collision');
  table.addEventListener('collide', function() {
    collisionSound.play();
  });
  collisionSound.addEventListener('ended', function() { collisionSound.load(); });



}).call(this);