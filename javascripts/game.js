(function () {
  window.Game = {};
  var cupRadius = 3;

  Game.cupPlacementDistance = cupRadius * 1.7;

  //  CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
  Game.cupGeometry = new THREE.CylinderGeometry(cupRadius, 0.8 * cupRadius, cupRadius * 2, 32, true);
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

    window.render();
  }
  Game.overlay = function(text) {
    var $overlay = $('<div class="overlay"></div>');
    $overlay.appendTo($('body')).html(text)
      .fadeIn('fast').animate({ 'opacity': 0, 'zoom': '2' }, {duration: 3000, queue: false}, function(e) {
        e.target.remove();
      });
  }
}).call(this);