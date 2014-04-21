(function(){
  scene = new Physijs.Scene();
  scene.setGravity({x: 0, y: -50, z: 0});
  scene.addEventListener(
    'update',
    function() {
      scene.simulate( undefined, 2 );
    }
  );
  sceneCube = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({alpha: false});

  renderer.setClearColor(0x111111, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.context.getProgramInfoLog = function () { return '' }; // fixed in three.js master, not in v66 yet

  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = 0;
  renderer.domElement.style.left = 0;
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style['z-index'] = 0;
  $('body').prepend(renderer.domElement);
//
//  scene.add(new THREE.AmbientLight(0x888888));
//
//  pointLight = new THREE.PointLight(0xcccccc);
//  pointLight.position = new THREE.Vector3(-20, 10, 0);
//  pointLight.lookAt(new THREE.Vector3(0, 0, 0));
//  scene.add(pointLight);


  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.fromArray([0, 26, 60]);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  cameraCube = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );

  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    renderer.render(scene, camera);
  }, false);

  scene.add(camera);

  controls = new THREE.TrackballControls( camera );




  scene.table = new Physijs.BoxMesh(
    new THREE.CubeGeometry(50, 1.8, 83),
    Physijs.createMaterial(new THREE.MeshPhongMaterial({
      color: 0x003000
    }), 0.0000001, 1),
    0
  );
  scene.add(scene.table);

  scene.middleStripe = new THREE.Mesh( new THREE.CubeGeometry(0.3, 1.8, 83), new THREE.MeshPhongMaterial({ color: 0xffffff }));
  scene.middleStripe.position.set(0,0.01,0);
  scene.add(scene.middleStripe);

  scene.leftStripe = new THREE.Mesh( new THREE.CubeGeometry(0.3, 1.8, 83), new THREE.MeshPhongMaterial({ color: 0xffffff }));
  scene.leftStripe.position.set(scene.table.geometry.width/2,0.01,0);
  scene.add(scene.leftStripe);

  scene.rightStripe = new THREE.Mesh( new THREE.CubeGeometry(0.3, 1.8, 83), new THREE.MeshPhongMaterial({ color: 0xffffff }));
  scene.rightStripe.position.set(-scene.table.geometry.width/2,0.01,0);
  scene.add(scene.rightStripe);

  scene.frontStripe = new THREE.Mesh( new THREE.CubeGeometry(scene.table.geometry.width, 1.8, 0.3), new THREE.MeshPhongMaterial({ color: 0xffffff }));
  scene.frontStripe.position.set(0,0.01,scene.table.geometry.depth/2);
  scene.add(scene.frontStripe);

  scene.backStripe = new THREE.Mesh( new THREE.CubeGeometry(scene.table.geometry.width, 1.8, 0.3), new THREE.MeshPhongMaterial({ color: 0xffffff }));
  scene.backStripe.position.set(0,0.01,-scene.table.geometry.depth/2);
  scene.add(scene.backStripe);


  directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set( 0, 800, 1 );
  scene.add(directionalLight);
  // todo: play with shadows
  // ( color, intensity, distance )
  scene.rightLight = new THREE.PointLight(0xffffff, 1, 100);
  scene.rightLight.position.set(50,10,0);
  scene.add(scene.rightLight);

  scene.leftLight = new THREE.PointLight(0xffffff, 1, 100);
  scene.leftLight.position.set(-50,10,0);
  scene.add(scene.leftLight);

  scene.frontLight = new THREE.PointLight(0xffffff, 1, 100);
  scene.frontLight.position.set(0,10,scene.table.geometry.depth/2+4);
  scene.add(scene.frontLight);

  // ( color, intensity, distance )
  scene.ambientLight = new THREE.AmbientLight(0x202010);
  scene.add(scene.ambientLight );





  pongBall = new Physijs.SphereMesh(
    // function ( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {
    new THREE.SphereGeometry(1),
    Physijs.createMaterial(new THREE.MeshPhongMaterial(0x0000ff), 0.0000001, 1.60),
    1
  );
  var collisionSound = document.getElementById('collision');
  scene.table.addEventListener('collision', function() {
    collisionSound.play();
  });
  collisionSound.addEventListener('ended', function() { collisionSound.load(); });


  pongBall.position.set(0,30,0)
  pongBall.castShadow = true;
  pongBall.receiveShadow = true;
  scene.add(pongBall);


  var geometry = new THREE.SphereGeometry( 100, 32, 16 );
  var cubemap = window.location.href.charCodeAt(window.location.href.length-1) % 2 === 0 ? 'beach' : 'tenerife';
  var path = "textures/"+cubemap+"/";
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

  // todo: update hud method
  var frameTrafficHud = document.getElementById('frameTraffic');
  var ballPositionHud = document.getElementById('ballPosition');

  window.render = function() {

    cameraCube.rotation.copy( camera.rotation );
    controls.update();

    var lostHeight = -10;
    if (pongBall.position.y < lostHeight && !pongBall.belowTable && !pongBall.inHand) {
      booSound.play();
      pongBall.belowTable = true;
    } else if (pongBall.position.y >= lostHeight && pongBall.belowTable) {
      pongBall.belowTable = false;
    }


    ballPositionHud.innerHTML = pongBall.position.toArray().map(function(num){return Math.round(num)});
    frameTrafficHud.innerHTML = Game.framesSent +  '/' + Game.framesReceived;

    scene.simulate();
    renderer.render(sceneCube, cameraCube);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

}).call(this);