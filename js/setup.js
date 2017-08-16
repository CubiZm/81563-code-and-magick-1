'use strict';

var NUMBER_WIZARD = 4;

var userNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var userLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var userCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var userEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var setUp = document.querySelector('.setup');

setUp.classList.remove('hidden');
setUp.querySelector('.setup-similar').classList.remove('hidden');

var setUpList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content;


// получаем объект с магом
var getObjWizard = function (name, lastName, coatColor, eyesColor) { // передаём в мага имя, фамилию, цвета мантии и глаз
  var wizard = { // создаём объект мага
    name: name + ' ' + lastName, // имя мага мостоит из имени и фамилии, складываем их вместе
    coatColor: coatColor, // цвет мантии
    eyesColor: eyesColor // цвет глаз
  };
  return wizard;
};

// создаём мага —
var createWizard = function (wizard) { // передаём сюда объект мага
  var personElement = wizardTemplate.cloneNode(true); // овершаем глубокое клонирование вместе со всеми потомками
  var wizardLabel = wizardTemplate.querySelector('.setup-similar-label');
  var wizardCoat = wizardTemplate.querySelector('.wizard-coat');
  var wizardEyes = wizardTemplate.querySelector('.wizard-eyes');

  wizardLabel.textContent = wizard.name; // имя
  wizardCoat.style.fill = wizard.coatColor; // цвет мантии
  wizardEyes.style.fill = wizard.eyesColor; // цвет глаз

  return personElement; // возвращает разметку мага
};

var getRandomNumber = function (min, max) { // генерирует рандомное число в различном диапозне
  return Math.floor(min + Math.random() * (max + 1 - min)); // округляем его до целого, минимально заданное чсило складываем с рандомным числом, (max + 1 - min) не даёт нам получить число больше максимальнозаданного и не меньше чем мы задали
};

var getElement = function (array) { // получает на вход какой-либо массив с данными (имьфамиль, глаза, мантии и тыды)
  var index = getRandomNumber(0, array.length - 1); // создаёт рандомный индекс из  переданного массива. array.length - 1 сделан, чтобы не ощутиться внезапно за пределом массива и не получить undefined
  var element = array[index]; // получаем наш элемент с каким-либо рандомным индексом из массива

  return element;

};

// рендерим нашего мага
var renderWizard = function (numberWizard, name, lastName, coatColors, eyesColors) {
  var persons = []; // создаём пустой массив куда будем складывать наши 4 объекта магов

  for (var j = 0; j < numberWizard; j++) {
    persons[j] = getObjWizard(getElement(name), getElement(lastName), getElement(coatColors), getElement(eyesColors)); // проходим циклом по нему, и добавляем в наш массив всех 4х магов
  }

  return persons;
};

var getWizard = function (array) { // принимает на вход массив волшебников (который содержит объекты волшебников)
  var fragment = document.createDocumentFragment(); // создаёт фрагмент документа

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createWizard(array[i])); // путём цикла мы создаём детей для нашего фрагмента. Дети — наш html-код волшебников с нужными нам данными
  }
  return fragment;
};

getWizard(renderWizard(NUMBER_WIZARD, userNames, userLastNames, userCoatColors, userEyesColors));
setUpList.appendChild(getWizard(renderWizard(NUMBER_WIZARD, userNames, userLastNames, userCoatColors, userEyesColors)));
