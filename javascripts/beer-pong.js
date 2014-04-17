initScene = function() {
  var pointLight;

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({alpha: true});

  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = 0;
  renderer.domElement.style.left = 0;
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  document.body.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x888888));

  pointLight = new THREE.PointLight(0xFFffff);
  pointLight.position = new THREE.Vector3(-20, 10, 0);
  pointLight.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.fromArray([0, 3, 15]);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer.render(scene, camera);
  }, false);

  scene.add(camera);

  renderer.render(scene, camera);
  return scene;
};



(window.controller = new Leap.Controller)
  .use('riggedHand', {
    parent: initScene(),
    renderFn: function() {
      return renderer.render(scene, camera);
    }
  })
  .connect()
  .on('frame', function(frame){
//    console.log(frame.hands.length);
  });