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

  // menu
  {
    const burger = document.querySelector('.spinner'),
    sidebarMenu = document.querySelector('.sidebarMenu');

    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      sidebarMenu.classList.toggle('rollUp');
    });

    sidebarMenu.addEventListener('click', (e) => {
      let target = e.target;

      target = target.closest('a[href="#"]');

      if (target) {
        // получаем родителя ссылки
        const parentTarget = target.parentNode;

        sidebarMenu.querySelectorAll('li').forEach((elem)=> {
          if (elem === parentTarget) {
            elem.classList.add('active');
          } else {
            elem.classList.remove('active');
          }
        })

      }

    });

  }

  // modal window
  {
    // создаем элемент в памяти
    const divYoutuber = document.createElement('div');
  }


});