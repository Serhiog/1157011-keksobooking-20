'use strict';

(function () {

  var cardClose = window.renderCard.card.querySelector('.popup__close');
  cardClose.addEventListener('click', function () {
    window.renderCard.card.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      window.renderCard.card.classList.add('hidden')
    }
  });

})();
