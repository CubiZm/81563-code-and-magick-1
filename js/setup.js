'use strict';

var NUMBER_WIZARD = 4;

/**
 * набор свойств для клавиш
 * @enum {number} KeyCode
 */
var keyCodes = {
  ESC: 27,
  ENTER: 13
};

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
  ],
  fireballColor: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

var setup = document.querySelector('.setup');
var setupList = document.querySelector('.setup-similar-list');
var setupIcon = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var userName = document.querySelector('.setup-user-name');

var colorCoat = document.querySelector('.wizard-coat');
var colorEyes = document.querySelector('.wizard-eyes');
var colorFireball = document.querySelector('.setup-fireball-wrap');

userName.minLength = 1;
userName.maxLength = 50;

/**
 * Генерирует рандомное число в заданном диапозоне
 * @param {number} min
 * @param {number} max
 *
 * @return {number}
 */
var getRandomNumber = function (min, max) {
  return Math.random() * max + min;
};

/**
 * Получает рандомный элемент из массива
 * @param {Array} array
 *
 * @return {*}
 */
var getRandomElement = function (array) {
  var index = Math.floor(getRandomNumber(0, array.length - 1));
  return array[index];
};

/**
 * Получает строку с именем и фамилией
 * @param {Array} name
 * @param {Array} lastName
 *
 * @return {string}
 */
var getRandomNames = function (name, lastName) {
  return getRandomElement(name) + ' ' + getRandomElement(lastName);
};

/**
 * Объявляет объект мага
 * @typedef {Object} Wizard
 * @property {string} name
 * @property {string} coatColor
 * @property {string} eyesColor
 *
*/

var getObjWizard = function () {
  var wizard = { // создаём объект мага
    name: getRandomNames(WizardsParams.name, WizardsParams.lastName), // имя мага мостоит из имени и фамилии, складываем их вместе
    coatColor: getRandomElement(WizardsParams.coatColor), // цвет мантии
    eyesColor: getRandomElement(WizardsParams.eyesColor) // цвет глаз
  };

  return wizard;
};

/**
 * Создаёт массив с заданным количеством объектов
 * @param {number} numberWizard
 *
 * @return {Array}
 */
var getWizardsArray = function (numberWizard) {
  var wizards = []; // создаём пустой массив куда будем складывать наши 4 объекта магов

  for (var j = 0; j < numberWizard; j++) {
    wizards.push(getObjWizard()); // проходим циклом по нему, и добавляем в наш массив всех 4х магов
  }

  return wizards;
};

/**
 * Создаёт HTML-разметку мага
 * @param {Object} wizard
 *
 * @return {HTMLElement}
 */
var createWizardNode = function (wizard) {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardElement = wizardTemplate.cloneNode(true);
  var wizardLabel = wizardElement.querySelector('.setup-similar-label');
  var wizardCoat = wizardElement.querySelector('.wizard-coat');
  var wizardEyes = wizardElement.querySelector('.wizard-eyes');

  wizardLabel.textContent = wizard.name;
  wizardCoat.style.fill = wizard.coatColor;
  wizardEyes.style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 *  Создаёт HTML-фрагмент пинов по шаблону
 * @param {Array} wizardArray
 *
 * @return {HTMLElement}
 */
var getWizardsNode = function (wizardArray) {
  var fragment = document.createDocumentFragment();

  wizardArray.forEach(function (element) {
    fragment.appendChild(createWizardNode(element));
  });
  return fragment;
};


var getValid = function () {
  if (!userName.validity.valid) {
    if (userName.validity.tooShort) {
      userName.setCustomValidity('Имя должно состоять минимум из 1-ой буквы');
    } else if (userName.validity.tooLong) {
      userName.setCustomValidity('Имя не должно превышать 50-ти букв');
    } else if (userName.validity.valueMissing) {
      userName.setCustomValidity('Имя должно состоять минимум из 1-ой буквы');
    }
  } else {
    userName.setCustomValidity('');
  }
};

var onElementClickClose = function () {
  setup.classList.add('hidden');
};

var onElementKeydownClose = function (evt) {
  if (evt.target.className === 'setup-user-name') {
    return;
  }

  if (evt.keyCode === keyCodes.ESC || evt.keyCode === keyCodes.ENTER && evt.target.className === 'setup-close') {
    setup.classList.add('hidden');
  }
};

var onElementKeydownShow = function (evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    setup.classList.remove('hidden');
  }
};

var onElementClickShow = function () {
  setup.classList.remove('hidden');
};

var initEventHandler = function () {
  setupIcon.addEventListener('click', onElementClickShow);
  setupIcon.addEventListener('keydown', onElementKeydownShow);
  userName.addEventListener('focus', onElementKeydownClose, true);
};

var closeEventHandler = function () {
  setupClose.addEventListener('click', onElementClickClose);
  document.body.addEventListener('keydown', onElementKeydownClose);
};

var getRandomCoatColor = function () {
  var color = getRandomElement(WizardsParams.coatColor);
  colorCoat.style.fill = color;
};

var getRandomEyesColor = function () {
  var color = getRandomElement(WizardsParams.eyesColor);
  colorEyes.style.fill = color;
};

var getRandomFireballColor = function () {
  var color = getRandomElement(WizardsParams.fireballColor);
  colorFireball.style.backgroundColor = color;
};

initEventHandler();
closeEventHandler();

colorCoat.addEventListener('click', getRandomCoatColor);
colorEyes.addEventListener('click', getRandomEyesColor);
colorFireball.addEventListener('click', getRandomFireballColor);
userName.addEventListener('invalid', getValid);

var wizardsArray = getWizardsArray(NUMBER_WIZARD);

setupList.appendChild(getWizardsNode(wizardsArray));

// setup.classList.remove('hidden');
setup.querySelector('.setup-similar').classList.remove('hidden');
