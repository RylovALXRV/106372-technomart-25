'use strict';

function findElement(elem, parent, cls) {
  while (elem !== parent) {
    if (elem.classList.contains(cls)) {
      return elem;
    }
    elem = elem.parentNode;
  }
  return false;
}

function changeSlider (elem, parent) {
  var dataSlider = elem.dataset.slider;
  var sliderItemElements = document.querySelectorAll('.' + parent.id + '__item');

  for (var i = 0; i < sliderItemElements.length; i++) {
    var sliderItemElement = sliderItemElements[i];

    if (sliderItemElement.id === dataSlider) {
      sliderItemElement.classList.add(parent.id + '__item--active');
      continue;
    }

    sliderItemElement.classList.remove(parent.id + '__item--active');
  }
}

function changeActiveButton (elem, parent) {
  if (elem.classList.contains(parent.id + '__btn--active')) {
    return;
  }

  var sliderBtnElements = document.querySelectorAll('.' + parent.id + '__btn');

  for (var i = 0; i < sliderBtnElements.length; i++) {
    var sliderBtnElement = sliderBtnElements[i];

    sliderBtnElement.classList.remove(parent.id + '__btn--active');
  }

  elem.classList.add(parent.id + '__btn--active');
}

document.addEventListener('click', function (event) {
  var target = event.target;
  var currentTarget = event.currentTarget;
  var parentElement = findElement(target, currentTarget, 'js-open');

  if (parentElement && parentElement.classList.contains('js-open')) {
    event.preventDefault();

    var modalWrapperElement = document.querySelector('.js-' + parentElement.dataset.name);

    modalWrapperElement.classList.remove('hidden');
    modalWrapperElement.classList.add('overlay');
  }

  if (target.classList.contains('js-close')) {
    event.preventDefault();

    parentElement = findElement(target, currentTarget, 'modal-wrapper');

    parentElement.classList.remove('overlay');
    parentElement.classList.add('hidden');
  }

  if (target.tagName === 'BUTTON' && target.dataset.slider) {

    parentElement = findElement(target, currentTarget, 'js-slider');

    changeActiveButton(target, parentElement);
    changeSlider(target, parentElement);
  }
});
