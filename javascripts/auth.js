var firebase = new Firebase('https://intense-fire-8508.firebaseio.com/');

var auth = new FirebaseSimpleLogin(firebase, function(error, user) {

  var $navbar = $('#navbar');
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    console.log(user);
    $navbar.find('.navbar-text').html('Signed in as ' + user.displayName + ' (<a href="#" data-logout>Sign out</a>)')
    $('[data-logout]').click(function() {
      auth.logout();
      window.location.reload();
    });
  } else {
    $navbar.find('.navbar-link').click(function() {
      auth.login('facebook', {rememberMe: true, preferRedirect: true});
    });
  }
});

