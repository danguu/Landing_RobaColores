(function () {
  var grid = document.getElementById("grid");
  var cells = [];
  var gridSize = 25;

  for (var y = 0; y < gridSize; y++) {
    for (var x = 0; x < gridSize; x++) {
      var cell = document.createElement("div");
      grid.appendChild(cell);
      cells.push(cell);
    }
  }

  function getPixelColor(x, y) {
    var dx = x - 12;
    var dy = y - 9;
    var distanceSquared = dx * dx + dy * dy;
    var absoluteDx = Math.abs(dx);

    if (distanceSquared <= 64) {
      if (
        (Math.abs(absoluteDx - 4) <= 1 && Math.abs(y - 8) <= 2) ||
        (absoluteDx <= 1 && y >= 12 && y <= 13)
      ) {
        return "ink";
      }

      return distanceSquared >= 49 ? "gray" : "paper";
    }

    if (y >= 17 && y <= 22 && absoluteDx <= 5) {
      if (y === 22 || absoluteDx === 5) {
        return "gray";
      }

      return x % 2 === 0 ? "ink" : "paper";
    }

    return null;
  }

  var targetColors = cells.map(function (cell, index) {
    return getPixelColor(index % gridSize, Math.floor(index / gridSize));
  });
  var timer;

  function formatTime(seconds) {
    return Math.floor(seconds / 60) + ":" + ("0" + (seconds % 60)).slice(-2);
  }

  document.getElementById("go").onclick = function () {
    clearInterval(timer);
    cells.forEach(function (cell) {
      cell.classList.remove("pixel--ink", "pixel--gray", "pixel--paper");
    });

    var order = targetColors
      .map(function (color, index) {
        return color ? index : -1;
      })
      .filter(function (index) {
        return index >= 0;
      })
      .sort(function () {
        return Math.random() - 0.5;
      });

    var seconds = 90;
    var nextPixel = 0;
    var pixelsPerTick = Math.ceil(order.length / 60);

    timer = setInterval(function () {
      seconds--;
      document.getElementById("time").textContent = formatTime(seconds);

      for (var count = 0; count < pixelsPerTick && nextPixel < order.length; count++, nextPixel++) {
        cells[order[nextPixel]].classList.add("pixel--" + targetColors[order[nextPixel]]);
      }

      if (seconds <= 30 || nextPixel >= order.length) {
        while (nextPixel < order.length) {
          cells[order[nextPixel]].classList.add("pixel--" + targetColors[order[nextPixel]]);
          nextPixel++;
        }

        clearInterval(timer);
      }
    }, 150);
  };
})();
