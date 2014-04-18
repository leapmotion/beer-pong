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
// todo: roll-out as plugin

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

        this.data('averageVelocity.' + property, data);


        // Vector math average vs scalar average
        if (data[0] instanceof Array){

          var sum = [0,0,0];
          // todo: store deltas for performance saving
          var delta = [];
          if (data.length > 1){
            for (var i = 1; i < data.length; i++){
              Leap.vec3.subtract(delta, data[i], data[i - 1]);;
              Leap.vec3.add(sum, sum, delta);
            }
            Leap.vec3.divide(sum, sum, [data.length - 1, data.length - 1, data.length - 1]);
          }

        }else{

          if (data.length > 1){
            var sum = 0;
            for (var i = 1; i < data.length; i++){
              sum += (data[i] - data[i - 1]);
            }
            sum = sum / (data.length - 1);
          }

        }

        return sum;
      }
    }
  }
});