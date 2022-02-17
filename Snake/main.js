window.onload = load();

var width;
var height;

function load() {
  grid();
}

function grid() {
  for (var n = 0; n < 12; n++) {
    for (var i = 0; i < 22; i++) {
      width = i * 50;
      height = n * 50;

      //offset
      // width = width - 3;
      // height = height - 3;
      document.querySelector(".playfield").innerHTML +=
        '<div class="grid" style="left: ' +
        width +
        "px; top: " +
        height +
        'px;"></div>';
    }
  }
}