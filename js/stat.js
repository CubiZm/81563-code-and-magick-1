'use strict';

var drawFigure = {
  cloud: function (ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height, color);
  },
  stroke: function (ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.strokeRect(x, y, width, height, color);
  },
  text: function (ctx, color, name, width, height) {
    ctx.fillStyle = color;
    ctx.fillText(name, width, height);
  }
};

var getFontStyle = function (ctx, color, font) {
  ctx.fillStyle = color;
  ctx.font = font;
};

// функция переноса текст
var breakDownText = function (ctx, text, x, y, maxWidth, lineHeight) { // принимает на вход наш контекст канваса, нужный текст, положение на оси х и у, максимальную длину на которой он будет отображаться без переноса и высоту строки
  var words = text.split(' '); // разбиваем нашу строку по пробелам
  var line = ''; // задаём пустую строку в которую будем всё потом передавать

  words.forEach(function (element) { // проходимся циклом по нашему массиву слов
    var textLine = line + element + ' '; // формируем строку которая будет выводить наш текст. Пустая строка для того, чтобы расставить пробелы после наших слов
    var textWidth = ctx.measureText(textLine).width; // метод проверяет ширину текста перед выводом на поле

    if (textWidth > maxWidth) { // если ширина текста больше чем наше максимальное значение
      ctx.fillText(line, x, y); // то мы выводим наш текст
      line = element + ' '; // присваиваем нашей пустой строке полученное слово с пробелом
      y += lineHeight; // выводим на оси Y его, который учитывает нашу высоту строки и изначальное положение на оси У
    } else {
      line = textLine; // если меньше, то мы просто присваиваем нашей пустой строке наш текст
    }
  });

  ctx.fillText(line, x, y); // выводим в итоге наш текст
};

window.renderStatistics = function (ctx, names, times) {

  var gistogram = {
    WIDTH: 40, // Ширина колонки (задана в ТЗ)
    HEIGHT: 150, // Высота гистограммы (задана в ТЗ)
    AXIS_X: 150, // Полодение гистограммы на оси Х
    AXIS_Y: 240, // Положение Гистограммы на оси У
    INDENT_Y: 15, // Отступ по оси У
    INDENT_X: 90, // Отступ по оси Х. По заданию 50, но мы учитываем ещё и ширину колонки, так как шаг начинается с крайнего левого угла СТОБЛЦА, а не с его конца. В итоге ширина стобца 40 + 50 из задания и дадут нам 90
    PLAYER_COLOR: 'rgba(255, 0, 0, 1)', // цвет колонки у игрока
    TEXT_COLOR: 'rgba(0, 0, 0, 1)', // цвет текста
  };

  var cloud = {
    AXIS_X: 100,
    AXIS_Y: 10,
    WIDTH: 420,
    HEIGHT: 270,
    SHADOW_X: 110,
    SHADOW_Y: 20,
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
    COLOR: 'rgba(255, 255, 255, 1)',
  };

  var text = {
    COLOR: 'rgba(0, 0, 0, 1)',
    FONTS_STYLE: '16px PT Mono',
    DESCRIPTION: 'Ура, вы победили! Список результатов:',
    AXIS_X: 140,
    AXIS_Y: 40,
    MAX_WIDTH: 200, // потому что ширина у нас 300 + 2 осттупа по 50пх
    LINE_HEIGHT: 18
  };

  var maxGist = -1; // максимальное значение рейтинга до изменений

  drawFigure.cloud(ctx, cloud.SHADOW_X, cloud.SHADOW_Y, cloud.WIDTH, cloud.HEIGHT, cloud.SHADOW_COLOR);

  // Облачко
  drawFigure.stroke(ctx, cloud.AXIS_X, cloud.AXIS_Y, cloud.WIDTH, cloud.HEIGHT, cloud.COLOR); //
  drawFigure.cloud(ctx, cloud.AXIS_X, cloud.AXIS_Y, cloud.WIDTH, cloud.HEIGHT, cloud.COLOR);

  getFontStyle(ctx, text.COLOR, text.FONTS_STYLE);

  breakDownText(ctx, text.DESCRIPTION, text.AXIS_X, text.AXIS_Y, text.MAX_WIDTH, text.LINE_HEIGHT);

  maxGist = Math.max.apply(null, times);

  var step = gistogram.HEIGHT / maxGist;

  var getRandomNumber = function (min, max) {
    return Math.random() * max + min;
  };

  var getRandomBlueColor = function () {
    return 'rgba(0, 76, 255, ' + getRandomNumber(0.1, 1) + ')';
  };

  var getStatsBar = function (time, name, j) {
    drawFigure.cloud(ctx, gistogram.AXIS_X + (gistogram.INDENT_X * j), gistogram.AXIS_Y, gistogram.WIDTH, (time * -step),
        name === 'Вы' ?
          gistogram.PLAYER_COLOR :
          getRandomBlueColor());

    drawFigure.text(ctx, gistogram.TEXT_COLOR, name, gistogram.AXIS_X + (gistogram.INDENT_X * j), gistogram.AXIS_Y + gistogram.INDENT_Y);

    drawFigure.text(ctx, gistogram.TEXT_COLOR, Math.floor(time), gistogram.AXIS_X + (gistogram.INDENT_X * j), gistogram.AXIS_Y - (time * step) - gistogram.INDENT_Y);

  };

  times.forEach(function (time, j) {
    getStatsBar(time, names[j], j);
  });
};
