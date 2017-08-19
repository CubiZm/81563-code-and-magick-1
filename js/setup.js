'use strict';

var NUMBER_WIZARD = 4;

var WizardsParams = {
  name: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  lastName: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  coatColor: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  eyesColor: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

var setup = document.querySelector('.setup');
var setupList = document.querySelector('.setup-similar-list');

var getRandomNumber = function (min, max) {
  return Math.random() * max + min;
};

var getRandomElement = function (array) { // получает на вход какой-либо массив с данными (имьфамиль, глаза, мантии и тыды)
  var index = Math.floor(getRandomNumber(0, array.length - 1));
  var element = array[index]; // получаем наш элемент с каким-либо рандомным индексом из массива

  return element;

};

var getRandomNames = function (name, lastName) {
  return getRandomElement(name) + ' ' + getRandomElement(lastName);
};

// получаем объект с магом
var getObjWizard = function () { // передаём в мага имя, фамилию, цвета мантии и глаз
  var wizard = { // создаём объект мага
    name: getRandomNames(WizardsParams.name, WizardsParams.lastName), // имя мага мостоит из имени и фамилии, складываем их вместе
    coatColor: getRandomElement(WizardsParams.coatColor), // цвет мантии
    eyesColor: getRandomElement(WizardsParams.eyesColor) // цвет глаз
  };

  return wizard;
};

var getArrayWizard = function (numberWizard) {
  var wizards = []; // создаём пустой массив куда будем складывать наши 4 объекта магов

  for (var j = 0; j < numberWizard; j++) {
    wizards.push(getObjWizard()); // проходим циклом по нему, и добавляем в наш массив всех 4х магов
  }

  return wizards;
};

// создаём мага —
var createWizardNode = function (wizard) { // передаём сюда объект мага
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardElement = wizardTemplate.cloneNode(true); // овершаем глубокое клонирование вместе со всеми потомками
  var wizardLabel = wizardTemplate.querySelector('.setup-similar-label');
  var wizardCoat = wizardTemplate.querySelector('.wizard-coat');
  var wizardEyes = wizardTemplate.querySelector('.wizard-eyes');

  wizardLabel.textContent = wizard.name; // имя
  wizardCoat.style.fill = wizard.coatColor; // цвет мантии
  wizardEyes.style.fill = wizard.eyesColor; // цвет глаз

  return wizardElement; // возвращает разметку мага
};

var getWizardsNode = function (array) { // принимает на вход массив волшебников (который содержит объекты волшебников)
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createWizardNode(array[i]));
  }
  return fragment;
};

var wizardsArray = getArrayWizard(NUMBER_WIZARD);

getWizardsNode(wizardsArray);

setupList.appendChild(getWizardsNode(wizardsArray));

setup.classList.remove('hidden');
setup.querySelector('.setup-similar').classList.remove('hidden');
