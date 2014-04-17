(function(){
  window.Game = {};

  //  CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
  Game.cupGeometry = new THREE.CylinderGeometry( 2, 1.8, 5, 32, true );
  Game.cupMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );

  // todo: concept of players, defeat
  Game.cups = [];

  Game.player1 = {
    basePosition: new THREE.Vector3(
      0,
      // is there a better way of getting table top-surface position?
      scene.table.position.y + scene.table.geometry.height / 2 + Game.cupGeometry.height / 2,
      65
    ) // this is based upon table height
  };
  Game.player2 = {};


  // adds a threejs object
  Game.addCup = function(){
    var cylinder = new THREE.Mesh( Game.cupGeometry, Game.cupMaterial );
    scene.add( cylinder );
    this.cups.push(cylinder);
    return cylinder;
  };

  Game.resetCups = function(){
    // assume 6-cup

    this.addCup().position.copy(this.player1.basePosition);

  }

  Game.begin = function(){
    this.resetCups();
  }
}).call(this);