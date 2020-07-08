'use strict';

(function () {

  var cardClose = window.renderCard.card.querySelector('.popup__close');
  cardClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.renderCard.card.classList.add('hidden');
    window.renderCard.card.style.display = 'none';
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.renderCard.card.classList.add('hidden')
      window.renderCard.card.style.display = 'none';
    }
  });

})();
