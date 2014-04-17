(function(){
  var pointLight;

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({alpha: false});

  renderer.setClearColor(0x111111, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = 0;
  renderer.domElement.style.left = 0;
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  document.body.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x888888));

  pointLight = new THREE.PointLight(0xcccccc);
  pointLight.position = new THREE.Vector3(-20, 10, 0);
  pointLight.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.fromArray([0, 3, 15]);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var axisHelper = new THREE.AxisHelper( 5 );
  scene.add( axisHelper );

  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer.render(scene, camera);
  }, false);

  scene.add(camera);

  pongBall = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial(0xff0000)
  )
  scene.add(pongBall);


  var render = function() {
    renderer.render(scene, camera);
    return requestAnimationFrame(render);
  };

  render();

}).call(this);