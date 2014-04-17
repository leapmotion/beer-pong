var firebase = new Firebase('https://intense-fire-8508.firebaseio.com/');

var auth = new FirebaseSimpleLogin(firebase, function(error, user) {

  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
  } else {
    auth.login('facebook', {rememberMe: true, preferRedirect: true});
  }
});

