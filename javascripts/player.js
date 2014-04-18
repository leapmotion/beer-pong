(function () {
  "use strict";

  window.Player = function (options) {
    this.drunkeness = 0;
    this.side = options.side; // 1 or -1

    if (this.side == 'far'){
      this.rotation = new THREE.Vector3(-1, 1, -1)
    }else{
      this.rotation = new THREE.Vector3(1, 1, 1)
    }

    this.pointPosition = new THREE.Vector3(
      0,
      // is there a better way of getting table top-surface position?
        scene.table.position.y + scene.table.geometry.height / 2 + Game.cupGeometry.height / 2,
        scene.table.geometry.depth/2 - 20
    ).multiply(this.rotation);
    this.cups = [];
  }

  window.Player.prototype.placementNoise = function () {
    return 0;
//    return this.drunkeness * (Math.random() - 0);
  }


  // adds a threejs object
  Player.prototype.addCup = function () {
    var cylinder = new THREE.Mesh(Game.cupGeometry, Game.cupMaterial);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    scene.add(cylinder);
    this.cups.push(cylinder);
    return cylinder;
  };

  Player.prototype.addCupOffsetBy = function (offset) {
    var previousPosition = this.cups[this.cups.length - 1]
    var cup = this.addCup();
    cup.position.copy(this.pointPosition);

    if (offset) {
      cup.position.add(offset);
    }
    return cup
  }


  var cupPlacementDistance = 6;

  Player.prototype.rightwardCupOffset = function () {
    return new THREE.Vector3(Game.cupPlacementDistance  + this.placementNoise(), 0, 0).multiply(this.rotation);
  }

  Player.prototype.downwardCupOffset = function () {
    return new THREE.Vector3(0, 0, Game.cupPlacementDistance+ this.placementNoise()).multiply(this.rotation);
  }

  Player.prototype.lastCup = function () {
    return this.cups[this.cups.length - 1]
  }

  Player.prototype.sixCupFormation = function () {
    this.addCupOffsetBy(); // top
    this.addCupOffsetBy(this.rightwardCupOffset().add(this.downwardCupOffset()));
    this.addCupOffsetBy(this.rightwardCupOffset().multiplyScalar(-1).add(this.downwardCupOffset()));
    this.addCupOffsetBy(this.downwardCupOffset().multiplyScalar(2));

    this.addCupOffsetBy(this.rightwardCupOffset().multiplyScalar(2).add(this.downwardCupOffset().multiplyScalar(2)));
    this.addCupOffsetBy(this.rightwardCupOffset().multiplyScalar(-2).add(this.downwardCupOffset().multiplyScalar(2)));
  }

  Player.prototype.tenCupFormation = function () {
    this.sixCupFormation();
    this.addCupOffsetBy(this.downwardCupOffset().multiplyScalar(3).add(this.rightwardCupOffset().multiplyScalar(-3)));
    this.addCupOffsetBy(this.downwardCupOffset().multiplyScalar(3).add(this.rightwardCupOffset().multiplyScalar(-1)));
    this.addCupOffsetBy(this.downwardCupOffset().multiplyScalar(3).add(this.rightwardCupOffset().multiplyScalar(1)));
    this.addCupOffsetBy(this.downwardCupOffset().multiplyScalar(3).add(this.rightwardCupOffset().multiplyScalar(3)));
  }

  // todo: this would need to work with existing cups..
  Player.prototype.ibeamFormation = function () {
    this.addCupOffsetBy();
    this.addCupOffsetBy(this.downwardCupOffset());
    this.addCupOffsetBy(this.downwardCupOffset());
  }

  Player.prototype.resetCups = function () {
    // assume 6-cup
//    this.sixCupFormation()
    this.tenCupFormation()
//    this.ibeamFormation()
  }


}).call(this);