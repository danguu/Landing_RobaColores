(function () {
  var board = document.getElementById("board");
  var tileColors = ["orange", "red", "yellow", "green", "blue", "purple", "dark"];
  var path = [0, 1, 2, 3, 4, 5, 11, 17, 16, 15, 14, 13, 12, 18, 24, 25, 26, 27, 28, 29, 35];
  var coloredTiles = {};

  path.forEach(function (position, index) {
    coloredTiles[position] = tileColors[index % tileColors.length];
  });

  for (var index = 0; index < 36; index++) {
    var tile = document.createElement("div");
    tile.className = "t" + (coloredTiles[index] ? " t--" + coloredTiles[index] : " e");
    board.appendChild(tile);
  }
})();
