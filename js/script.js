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

    const changeLang = (btn, lang) => {
      const langRu = [
        'ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
        'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
        'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
        'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
        'En', ' '
      ];
      const langEn = [
        '`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
        'Ru', ' '
      ];

      if (lang === 'En') {
        btn.forEach((elem, i) => {
          elem.textContent = langEn[i];
        });
      } else {
        btn.forEach((elem, i) => {
          elem.textContent = langRu[i];
        });
      }

    };

    const typing = (event) => {
      const target = event.target;

      if (target.tagName.toLowerCase() === "button") {
        const contentButton = target.textContent.trim();
        const buttons = [...keyboard.querySelectorAll('button')]
          .filter(elem => elem.style.visibility !== 'hidden');


        if (contentButton === '⬅') {
          searchInput.value = searchInput.value.slice(0, -1);
        } else if(!contentButton) {
          searchInput.value += ' ';
        } else if (contentButton === 'En' || contentButton === 'Ru') {
          changeLang(buttons, contentButton);
        } else {
          searchInput.value += contentButton;
        }

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