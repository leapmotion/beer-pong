

window.gui = new dat.GUI({
  autoPlace: false
});

x = {gravity: 1}
var baseGravity = world.gravity.y;

gui.add(x, 'gravity',0, 10).onChange(function(value) {
  // Fires on every change, drag, keypress, etc.
  world.gravity.y = baseGravity * value;
});

document.getElementById('hud').appendChild(gui.domElement);

$(function() {
    if (/debug/.test(window.location.href)) {
        $('.debug').css('visibility', 'visible');
    }
});