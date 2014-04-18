// calculates a rolling average of velocity of any frame position
// finger.averageVelocity('tipPosition');
// hand.averageVelocity('palmposition')
// this simply averages the change, such that this is also valid
// hand.averageVelocity('direction')
// relies on handhold plugin
// accepts options:
// defaultDuration - a number, in ms, to maintain a rolling average
// this can be overridden on a per-property basis, by providing a second argument to averageVelocity
// todo: we hold 10 frames now. should maybe calc ms. :-P

Leap.plugin('averageVelocity', function(scope){
  scope || (scope = {});
  scope.defaultDuration || (scope.defaultDuration = 10);

  this.use('handHold');

  return {
    pointable: {
      // note: to be accurate, this must be called
      averageVelocity: function(property, duration){
        duration || (duration = scope.defaultDuration);
        var data = (this.data('averageVelocity.' + property) || []);

        // we could hold the calculated average here for efficiency, but w.e
        data.push(this[property]);

        if (data.length > duration){
          data.shift();
        }

        this.data('averageVelocity.' + property, data)

        // not enough samples
        if (data.length < 2){
          return 0;
        }

        var sum = 0;
        for (var i = 1; i < data.length; i++){
          sum += (data[i] - data[i - 1]);
        }
        sum = sum / (data.length - 1);

        return sum;
      }
    }
  }
});