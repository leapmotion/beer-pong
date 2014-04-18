// This files exports a hash map of cannonjs physical objects to threejs  visual objects
// This is iterated over in the THREEjs render loop

(function () {

  window.physicsObjects = []

  // Setup our world
  window.world = new CANNON.World();
  world.gravity.set(0, -0.0006, 0);
  world.broadphase = new CANNON.NaiveBroadphase();


  THREE.Mesh.prototype.addPhysics = function(){
    if (this.geometry instanceof THREE.SphereGeometry){
      // for some reason, we double the pong ball radius in order to make it not go in to table.
      var mass = 5, radius = 2;

      var sphereShape = new CANNON.Sphere(radius);
      var sphereBody = new CANNON.RigidBody(mass, sphereShape);
      this.physicsObject = sphereBody;

      sphereBody.position.set(0, 50, 50);
      sphereBody.linearDamping = 0.00001;

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
  var table = new CANNON.RigidBody(0,
    new CANNON.Box(new CANNON.Vec3(
      scene.table.geometry.width / 2,
      scene.table.geometry.height / 2,
      scene.table.geometry.depth / 2
    ))
  );

  // we could create a new contact material with both the table material and ball material
  // instead, just change the global contactmaterial
  // this controls the bouncyness of the ball
  world.defaultContactMaterial.restitution = 1

  world.add(table);


}).call(this);