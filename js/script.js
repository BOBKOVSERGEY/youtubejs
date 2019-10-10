//включили строгий режим
'use strict';

// когда загрузиться полность dom дерево
document.addEventListener('DOMContentLoaded', () => {

  // Экранная клавиатура
  {
    const keyboardButton =  document.querySelector('.search-form__keyboard'),
        keyboard = document.querySelector('.keyboard'),
    closeKeyboard = document.getElementById('close-keyboard'),
    searchInput = document.querySelector('.search-form__input');

    const toggleKeyboard = () => {
      keyboard.style.top = keyboard.style.top ? '' : keyboard.style.top = '50' + '%';
    };

    const typing = (event) => {
      const target = event.target;

      if (target.tagName.toLowerCase() === "button") {
        //searchInput.value = searchInput.value + target.textContent.trim();
        searchInput.value += target.textContent.trim();
      }

      // backspace

      // space

    };

    keyboardButton.addEventListener('click', toggleKeyboard);

    closeKeyboard.addEventListener('click', toggleKeyboard);

    keyboard.addEventListener('click', typing);

  }


});