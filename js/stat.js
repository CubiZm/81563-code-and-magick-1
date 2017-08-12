'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // Облачко
  ctx.fillStyle = '#fff';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // Время

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  // Гистограмма

  var histogramWidth = 40;
  var histogramHeigth = 190;
  var step = histogramWidth / (max - 0);

  var initialX = 80;
  var initialY = 220;
  var indent = 30;

  for (var j = 0; j < times.length; j++) {
    ctx.fillStyle = names[j] === 'Вы' ? 'red' : 'rgba(0, 76, 255, ' + '0' + '.' + ((j + 1) * 3) + ')';
    ctx.fillRect(initialX * (j + 2), initialY, histogramWidth, (times[j] * -step) * 3);

    ctx.fillStyle = 'black';
    ctx.fillText(names[j], initialX * (j + 2), initialY + indent);

    ctx.fillStyle = 'black';
    ctx.fillText(Math.floor(times[j]), initialX * (j + 2), histogramHeigth - (times[j] * step) * 2.5);
  }
};
