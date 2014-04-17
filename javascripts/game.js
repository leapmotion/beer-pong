(function () {
  window.Game = {};
  var cupRadius = 2;

  //  CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
  Game.cupGeometry = new THREE.CylinderGeometry(cupRadius, 1.8, 5, 32, true);
  Game.cupMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

  Game.player1 = new Player({
    side: 'near'
  })

  Game.player2 = new Player({
    side: 'far'
  })


  Game.begin = function () {
    this.player1.resetCups()
    this.player2.resetCups()
  }
}).call(this);