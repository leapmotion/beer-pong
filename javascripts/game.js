(function () {

  // http://www.explainxkcd.com/wiki/index.php/List_of_all_comics
  // $('.wikitable tr td:nth-child(2)').text().replace(/\(create\)/g, '').split("\n")[0]
  var playerNames = [" Free Speech ", " Orbital Mechanics ", " Airplane Message ", " Heartbleed Explanation ", " Heartbleed ", " Cosmologist on a Tire Swing ", " Metamaterials ", " Lorenz ", " Shouldn't Be Hard ", " Before the Internet ", " t Distribution ", " Career ", " Answers ", " Digits ", " Manuals ", " Ancient Stars ", " Types of Editors ", " Unique Date ", " When You Assume ", " Land Mammals ", " Hack ", " Transformers ", " Now ", " Second ", " First Date ", " Slippery Slope ", " Frequency ", " Kola Borehole ", " Standing ", " Update ", " Mobile Marketing ", " Sharks ", " Rejection ", " Weather ", " Protocol ", " Winter ", " Cold ", " Walmart ", " Automation ", " Actually ", " Theft ", " Inexplicable ", " Questions for God ", " Photos ", " Regex Golf ", " Haskell ", " 2014 ", " Goldbach Conjectures ", " Infinite Scrolling ", " Christmas Lights ", " Buzzfeed Christmas ", " Sigil Cycle ", " Undocumented Feature ", " Glass Trolling ", " Profile Info ", " Year in Review ", " File Extensions ", " Galilean Moons ", " I Don't Own a TV ", " Exoplanet Neighborhood ", " Oort Cloud ", " Git Commit ", " New Study ", " Telescope Names ", " Job Interview ", " Pi vs. Tau ", " Shoot for the Moon ", " Syllable Planning ", " Simple Answers ", " Substitutions ", " Puzzle ", " Encryptic ", " Third Way ", " Improved Keyboard ", " Headlines ", " Monty Hall ", " Minifigs ", " Mystery News ", " Reverse Identity Theft ", " Giraffes ", " Ayn Random ", " Angular Size ", " int(pi) ", " Open Letter ", " Tall Infographics ", " Shadowfacts ", " Highlighting ", " Functional ", " Privacy Opinions ", " Alternate Universe ", " Mess ", " Halting Problem ", " Juicer ", " Slideshow ", " Reassuring ", " Unquote ", " Shake That ", " LD50 ", " Bee Orchid ", " First ", " Monster ", " Questions ", " Columbus ", " Preferred Chat System ", " Exoplanet Names ", " Increased Risk ", " Anti-Glass ", " Old Accounts ", " Meteor Showers ", " Sphere ", " The Mother of All Suspicious Files ", " Pale Blue Dot ", " 10-Day Forecast ", " Six Words ", " Snare ", " Scary Names ", " Annoying Ringtone Champion ", " Quantum Mechanics ", " Social Media ", " Enlightenment ", " QR Code ", " Seashell ", " Settled ", " Douglas Engelbart (1925-2013) ", " Relativity ", " Realistic Criteria ", " Habitable Zone ", " Polar/Cartesian ", " Screensaver ", " Prometheus ", " The Pace of Modern Life ", " Balloon Internet ", " Ice Sheets ", " Council of 300 ", " Dwarf Fortress ", " Pastime ", " Nomenclature ", " Hipsters ", " Reports ", " Doors of Durin ", " Cells ", " Sticks and Stones ", " Insight ", " Geoguessr ", " Combination Vision Test ", " Interstellar Memes ", " Birds and Dinosaurs ", " I'm So Random ", " Encoding ", " Footnote Labyrinths ", " AirAware ", " Einstein ", " Is It Worth the Time? ", " Detail ", " Time Machines ", " Girls and Boys ", " Integration by Parts ", " Authorization ", " Silence ", " Geologist ", " All Adobe Updates ", " Subways ", " Flowchart ", " Stratigraphic Record ", " Externalities ", " Humming ", " The Past ", " Time ", " Voyager 1 ", " Bonding ", " Aspect Ratio ", " Bumblebees ", " Ineffective Sorts ", " Circumference Formula ", " Rose Petals ", " Rembrandt Photo ", " PGP ", " Virus Venn Diagram ", " ISO 8601 ", " Pickup Artists ", " Time Robot ", " Those Not Present ", " Moving Sidewalks ", " App ", " Steroids ", " Workflow ", " Perl Problems ", " Bridge ", " Expedition ", " tar ", " Star Trek into Darkness ", " Argument ", " Amazon ", " Home Alone ", " Debugger ", " Log Scale ", " Hand Sanitizer ", " Drop Those Pounds ", " Countdown ", " Rubber Sheet ", " Sick Day ", " Conditioning ", " Kolmogorov Directions ", " Resolution ", " Proof ", " Communion ", " Tests ", " Instagram ", " Broomstick ", " Nothing to Offer ", " Evolving ", " Honest ", " Sky Color ", " Tags ", " Location ", " Coverage ", " Two Years ", " Calendar of Meaningful Dates ", " Rubber and Glue ", " Heatmap ", " RTL ", " Broken Mirror ", " Arachnoneurology ", " Logic Boat ", " Up Goer Five ", " Frequentists vs. Bayesians ", " Math ", " Poll Watching ", " Cell Number ", " Fifty Shades ", " Congress ", " Epsilon and Zeta ", " Objects In Mirror ", " Law of Drama ", " The Universal Label ", " Electoral Precedent ", " Identity ", " Blurring the Line ", " Undoing ", " Microsoft ", " My Sky ", " Traffic Lights ", " Sky ", " Metallurgy ", " Killed in Action ", " Think Logically ", " Premiere ", " Click and Drag ", " Refrigerator ", " Cautionary Ghost ", " Sports Cheat Sheet ", " ADD ", " License Plate ", " Feathers ", " Nine ", " Fastest-Growing ", " Sketchiness ", " Vows ", " Tuesdays ", " Star Ratings ", " A Hypochondriac's Nightmare ", " Clinically Studied Ingredient ", " Crazy Straws ", " Interview ", " Forget ", " Michael Phelps ", " Curiosity ", " Formal Languages ", " Internal Monologue ", " Five Years ", " Cirith Ungol ", " Eyelash Wish Log ", " ContextBot ", " Server Problem ", " Writing Styles ", " Geology ", " Argument Victory ", " Visual Field ", " United Shapes ", " Knights ", " Home Organization ", " Groundhog Day ", " Warning ", " Moon Landing ", " Weekend ", " Seventies ", " Exoplanets ", " Words for Small Sets ", " Alphabet ", " Swiftkey ", " Pressures ", " Laundry ", " Shoes ", " Front Door ", " Kill Hitler ", " Budget News ", " EST ", " Crowdsourcing ", " Bel-Air ", " Old-Timers ", " Klout ", " Felidae ", " Kickstarter ", " The bacon ", " Ten Thousand ", " Every Major's Terrible ", " Visited ", " Forgot Algebra ", " Bookshelf ", " Emotion ", " Approximations ", " Skynet ", " Constraints ", " Romney Quiz ", " Ablogalypse ", " Never ", " Whites of Their Eyes ", " Lakes and Oceans ", " RuBisCO ", " Fountain ", " Umwelt ", " Reviews ", " Cadbury Eggs ", " Share Buttons ", " Formal Logic ", " Networking ", " s/keyboard/leopard/ ", " Keyed ", " Drawing Stars ", " Communication ", " Pickup Artist ", " Compare and Contrast ", " Tumblr ", " Error Code ", " Late-Night PBS ", " So It Has Come To This ", " Business Plan ", " Orion Nebula ", " First Post ", " Good Cop, Dadaist Cop ", " Backward in Time ", " Valentine Dilemma ", " Kerning ", " Car Problems ", " Wake Up Sheeple ", " Wrong Superhero ", " Baby Names ", " Etymology-Man ", " Sigh ", " Suckville ", " Sustainable ", " Sloppier Than Fiction ", " SOPA ", " Batman ", " Adam and Eve ", " Game AIs ", " AAAAAA ", ""]

  window.Game = {};
  var cupRadius = 3;

  Game.frameCompression = false;

  Game.cupPlacementDistance = cupRadius * 1.7;

  //  CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
  Game.cupGeometry = new THREE.CylinderGeometry(cupRadius, 0.8 * cupRadius, cupRadius * 2, 32, true);
  Game.cupBottomGeometry = new THREE.CylinderGeometry(cupRadius * 0.8, cupRadius * 0.8, cupRadius * 0.4, 32, true);
  Game.cupTopGeometry = new THREE.TorusGeometry(cupRadius, cupRadius*0.07, 32, 32, Math.PI*2);
  Game.cupBeerGeometry = new THREE.CircleGeometry(cupRadius, 32);
  Game.cupMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
  Game.whiteMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
  Game.beerMaterial = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('beer.jpg')});

  Game.player1 = new Player({
    side: 'near'
  });

  Game.player2 = new Player({
    side: 'far'
  });

  Game.id = function () {
    return window.location.hash.split('#')[1];
  }


  Game.framesSent = 0;
  Game.framesReceived = 0;
  Game.playerCount = 1;
  Game.streamFrames = false;

  // firebase structure:
  // /game/<id>/players/<id>/frames
  Game.connectToLiveGame = function () {
    console.log('Connecting to server');
    console.time('firebase-connection');
    if (this.id()) {
      this.gameRef = firebaseGamesRef.child(this.id());
      this.gameRef.once('value', function (snapshot) {
        console.log('Connected to game ' + this.gameRef.name() + ', created:  ' + new Date(snapshot.val().created_at))
        this.setupPlayers();
      }.bind(this));
    } else {
      // push appears to be synchronous. IDs are generated locally.
      this.gameRef = firebaseGamesRef.push({created_at: (new Date()).getTime()});
      console.log('Created game', this.gameRef.name());
      window.location.hash = '#' + this.gameRef.name();

      this.setupPlayers();
    }
  }

  Game.setupPlayers = function () {
    console.timeEnd('firebase-connection');
    // todo: hook name to session ID
    this.playersRef = this.gameRef.child('players'); // will this be created automatically?

    var myName = playerNames[Math.floor(Math.random() * playerNames.length)].replace(/\s/g, '');

    this.playerRef = this.playersRef.push({
      name: myName,
      state: 'joining' // will be turned in to "playing" later.
    });
    console.log('Joining as', myName, '(' + this.playerRef.name() + ')');

    this.playersRef.on('child_added', function (snapshot) {
      if (snapshot.val().state == 'disconnected') return;

      if (snapshot.name() == this.playerRef.name()) {
        this.streamFrames = true;
      }else{
        this.watchPlayer(snapshot);
      }
    }.bind(this));

    this.playerRef.child('state').onDisconnect().set('disconnected');

    this.framesRef = this.playerRef.child('frames');
    console.log('ready to send frames!');
  }


  Game.watchPlayer = function (snapshot) {
    console.log('Watching player', snapshot.val().name);
    console.log(snapshot, snapshot.val());
    if (!snapshot.val().name){
      console.warn("No player name on watched player", snapshot.name());
    }
    Game.playerCount++;

    // are frames actually removed here?
    this.playersRef.child(snapshot.name()).child('/frames').limit(10).on('child_added', Game.receiveFrame);
  }


  Game.sendFrame = function (frame) {
    // we check streamFrames as it looks like it may take a moment for the ref to be ready
    if (!this.framesRef || !this.streamFrames) {
      return;
    }
    // clip old frame data after ~500 frames
    var frameData = {
      frame: {
        hands: frame.hands,
        pointables: frame.pointables,
        timestamp: frame.timestamp,
        id: frame.id,
        currentFrameRate: frame.currentFrameRate
      }
    }

    if (this.frameCompression) {
      frameData.frame = LZString.compressToBase64(frameData.frame);
    }

    this.framesRef.push(frameData);
    this.framesSent++;
  }


  Game.receiveFrame = function (snapshot) {
    var userId = snapshot.ref().toString().match(/players\/(.+?)\//)[1];
    Game.framesReceived++;

    var frameData = snapshot.val().frame;

    if (this.frameCompression) {
      frameData = LZString.decompressFromBase64(frameData);
    }

    //    no leap or :
    //
    //    custom animation loop.  Watch pool of player frames. Combine. Call sendFrame.
    //
    //
    //    With Leap
    //
    //    on every rawFrame (in the record protocol), after sending, check pool of player frames, concat.

    LeapHandler.addUserFrame(userId, frameData);
  }.bind(this);


  Game.begin = function () {
    this.connectToLiveGame();

    // connect or create game by id

    this.player1.resetCups();
    this.player2.resetCups();

    window.render();
  };


  // what does this method do?
  Game.overlay = function (text) {
    var $overlay = $('<div class="overlay"></div>');
    $overlay.appendTo($('body')).html(text)
      .fadeIn('fast').animate({ 'opacity': 0, 'zoom': '2' }, {duration: 3000, queue: false}, function (e) {
        e.target.remove();
      });
  }
}).call(this);