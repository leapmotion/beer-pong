(function(){
  var pointLight;


  scene = new THREE.Scene();
  sceneCube = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({alpha: false});

  renderer.setClearColor(0x111111, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;

  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = 0;
  renderer.domElement.style.left = 0;
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  document.body.appendChild(renderer.domElement);
//
//  scene.add(new THREE.AmbientLight(0x888888));
//
//  pointLight = new THREE.PointLight(0xcccccc);
//  pointLight.position = new THREE.Vector3(-20, 10, 0);
//  pointLight.lookAt(new THREE.Vector3(0, 0, 0));
//  scene.add(pointLight);

  directionalLight = new THREE.DirectionalLight(0xcccccc);
  directionalLight.position.set( 0, 1, 1 );
  scene.add(directionalLight);

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.fromArray([0, 60, 150]);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  cameraCube = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );

  var axisHelper = new THREE.AxisHelper( 5 );
  scene.add( axisHelper );

  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    renderer.render(scene, camera);
  }, false);

  scene.add(camera);

  controls = new THREE.TrackballControls( camera );




  scene.table = new THREE.Mesh(
    new THREE.CubeGeometry(50, 30, 150),
    new THREE.MeshPhongMaterial({
      color: 0x007722
    })
  );
  scene.add(scene.table);



  pongBall = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial(0xff0000)
  )
  scene.add(pongBall);


  var geometry = new THREE.SphereGeometry( 100, 32, 16 );
  var path = "textures/";
  var format = '.jpg';
  var urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
  ];

  var textureCube = THREE.ImageUtils.loadTextureCube( urls );
  var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

  /* reflective ball
  for ( var i = 0; i < 50; i ++ ) {

      var mesh = new THREE.Mesh( geometry, material );

      mesh.position.x = Math.random() * 10000 - 5000;
      mesh.position.y = Math.random() * 10000 - 5000;
      mesh.position.z = Math.random() * 10000 - 5000;

      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

      scene.add( mesh );
  }
  */

  // Skybox

  var shader = THREE.ShaderLib[ "cube" ];
  shader.uniforms[ "tCube" ].value = textureCube;

  var material = new THREE.ShaderMaterial( {

      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide

  });

  var boxMesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), material );
  sceneCube.add( boxMesh );

  window.addEventListener( 'resize', function onWindowResize() {
      windowHalfX = window.innerWidth / 2,
      windowHalfY = window.innerHeight / 2,

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      cameraCube.aspect = window.innerWidth / window.innerHeight;
      cameraCube.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
  }, false );





  var render = function() {
    cameraCube.rotation.copy( camera.rotation );
    controls.update();
    renderer.render(sceneCube, cameraCube);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();

}).call(this);