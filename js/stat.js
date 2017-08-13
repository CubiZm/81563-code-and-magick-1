'use strict';

var gistogram = {
  WIDTH: 40,
  HEIGHT: 190,
  AXIS_X: 80,
  AXIS_Y: 220,
  INDENT: 30,
  PLAYER_COLOR: 'rgba(255, 0, 0, 1)',
  TEXT_COLOR: 'rgba(0, 0, 0, 1)',
  MAX: -1,
};

window.renderStatistics = function (ctx, names, times) {

  // Тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // Облачко
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  times.forEach(function (elem) {
    var time = elem;
    if (time > gistogram.MAX) {
      gistogram.MAX = time;
    }
  });

  var step = gistogram.WIDTH / gistogram.MAX;

  var getRandomBlueColor = function () {
    return 'rgba(0, 76, 255, ' + (Math.random() + 0.1) + ')';
  };


  var getStatsBar = function (time, name, j) {
    ctx.fillStyle = names[j] === 'Вы' ? gistogram.PLAYER_COLOR : getRandomBlueColor();
    ctx.fillRect(gistogram.AXIS_X * (j + 2), gistogram.AXIS_Y, gistogram.WIDTH, (times[j] * -step) * 3);

    ctx.fillStyle = gistogram.TEXT_COLOR;
    ctx.fillText(names[j], gistogram.AXIS_X * (j + 2), gistogram.AXIS_Y + gistogram.INDENT);

    ctx.fillStyle = gistogram.TEXT_COLOR;
    ctx.fillText(Math.floor(times[j]), gistogram.AXIS_X * (j + 2), gistogram.HEIGHT - (times[j] * step) * 2.5);
  };

  times.forEach(function (time, j) {
    getStatsBar(time, names[j], j);
  });
};
