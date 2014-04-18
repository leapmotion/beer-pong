(function () {

  window.Game = {};
  var cupRadius = 3;

  Game.cupPlacementDistance = cupRadius * 1.7;

  //  CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
  Game.cupGeometry = new THREE.CylinderGeometry(cupRadius, 0.8 * cupRadius, cupRadius * 2, 32, true);
  Game.cupMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

  Game.player1 = new Player({
    side: 'near'
  });

  Game.player2 = new Player({
    side: 'far'
  });

  Game.id = function(){
    return window.location.hash.split('#')[1];
  }

  Game.connectToFirebase = function(){
    if (this.id()){
      this.gameRef = firebaseGamesRef.child(this.id());
      this.gameRef.on('value', function(snapshot){
        console.log('Connected to game ' + this.gameRef.name() + ', created:  ' + new Date(snapshot.val().created_at))
      }.bind(this));
    }else{
      this.gameRef = firebaseGamesRef.push({created_at: (new Date()).getTime()});
      console.log('created game', this.gameRef.name())
      window.location.hash = '#' + this.gameRef.name();
    }
  }

  Game.begin = function () {
    this.connectToFirebase();

    // connect or create game by id

    this.player1.resetCups();
    this.player2.resetCups();

    window.render();

  };



  // what does this method do?
  Game.overlay = function(text) {
    var $overlay = $('<div class="overlay"></div>');
    $overlay.appendTo($('body')).html(text)
      .fadeIn('fast').animate({ 'opacity': 0, 'zoom': '2' }, {duration: 3000, queue: false}, function(e) {
        e.target.remove();
      });
  }
}).call(this);