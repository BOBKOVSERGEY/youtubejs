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
  const youtuber = () => {

    // создаем элемент в памяти
    const youtuberItems = document.querySelectorAll('[data-youtuber]');

    const youTuberModal = document.querySelector('.youTuberModal');
    const youtuberContainer = document.getElementById('youtuberContainer');

    const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
    const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];



    const sizeVideo = () => {

      let ww = document.documentElement.clientWidth;
      let wh = document.documentElement.clientHeight;

      for (let i = 0; i < qw.length; i++) {
        if (ww > qw[i]) {

          youtuberContainer.querySelector('iframe').style.cssText = `
            width: ${qw[i]}px;
            height: ${qh[i]}px;
          `;

          youtuberContainer.style.cssText = `
            width: ${qw[i]}px;
            height: ${qh[i]}px;
            top: ${(wh - qh[i]) / 2}px;
            left: ${(ww - qw[i]) / 2}px;
          `;

          // выход из цикла
          break;
        }
      }
    };

    youtuberItems.forEach((elem) => {
      elem.addEventListener('click', () => {
        const idVideo = elem.dataset.youtuber;
        youTuberModal.style.display = 'block';

        const youTuberFrame = document.createElement('iframe');
        youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;

        youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);


        window.addEventListener('resize', sizeVideo);

        sizeVideo();

      });
    });

    youTuberModal.addEventListener('click', () => {
      youTuberModal.style.display = '';
      youtuberContainer.textContent = '';

      // удаляем событие
      window.removeEventListener('resize', sizeVideo);
    });





  }

  // modal window
  {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="youTuberModal">
      <div id="youtuberClose">&#215;</div>
      <div id="youtuberContainer"></div>
    </div>
    `);
    youtuber();
  }

  // API Youtube
  {
    const API_KEY = 'AIzaSyDTkvUrFs9B9NVrAzfF7YUvJAnncdUXkqU';
    const CLIENT_ID = '126598786727-gr8jrtc1kiofgn292a0uhc0abbf4ue2p.apps.googleusercontent.com';

    // авторизация
    {

      const buttonAuth = document.getElementById('authorize');
      const authBlock = document.querySelector('.auth');

      const errorAuth = err => {
        console.error(err);
        authBlock.style.display = '';
      };

      gapi.load("client:auth2", () => gapi.auth2.init({client_id: CLIENT_ID}));

      const authenticate = () => gapi.auth2.getAuthInstance()
          .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
          .then(() => console.log("Sign-in successful"))
          .catch(errorAuth);


      const loadClient = () => {
        gapi.client.setApiKey(API_KEY);
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            .then(() => console.log("GAPI client loaded for API"))
            .then(() => authBlock.style.display = 'none')
            .catch(errorAuth);
      };



      buttonAuth.addEventListener('click', () => {
        authenticate().then(loadClient);
      });


    }

    // requests
    {

      const gloTube = document.querySelector('.logo-academy');
      const trends = document.getElementById('yt_trend');
      const like = document.getElementById('like');
      const subscriptions = document.getElementById('subscriptions');

      const searchForm = document.querySelector('.search-form');



      const request = options => gapi.client.youtube[options.method]
          .list(options)
          .then(response => response.result.items)
          .then(data => options.method === 'subscriptions' ?
          renderSub(data) : render(data))
          //.then(youtuber)
          .catch(err => console.err('Во время запроса произошла ошибка ' + err));

      const renderSub = data => {
        console.log(data);
        const ytWrapper = document.getElementById('yt-wrapper' );
        ytWrapper.textContent = '';

        data.forEach((item) => {

          try {
            const {
              snippet:{
                description,
                title,
                resourceId: {
                  channelId
                },
                thumbnails: {
                  high:{url}
                },
              },
            } = item;
            ytWrapper.insertAdjacentHTML('beforeend', `
            <div class="yt" data-youtuber="${channelId}">
              <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
              </div>
              <div class="yt-title">${title}</div>
              <div class="yt-channel">${description}</div>
            </div>
          `);
          } catch (e) {
            console.error('Ошибка загрузки видео ' + e);
          }
        });

        ytWrapper.querySelectorAll('.yt').forEach((item) => {
          item.addEventListener('click', () => {
            request({
              method: 'search',
              part: 'snippet',
              channelId: item.dataset.youtuber,
              order: 'date',
              maxResults: 9,
            });
          });
        });

      };

      const render = data => {
        console.log(data);
        const ytWrapper = document.getElementById('yt-wrapper' );
        ytWrapper.textContent = '';

        data.forEach((item) => {


          try {
            const {
              id,
              id:{videoId},
              snippet:{
                title,
                channelTitle,
                thumbnails: {
                  high:{url}
                },
                resourceId: {
                  videoId: likedVideoId
                } = {},
                },
            } = item;
            ytWrapper.insertAdjacentHTML('beforeend', `
            <div class="yt" data-youtuber="${likedVideoId ||videoId || id}">
              <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
              </div>
              <div class="yt-title">${title}</div>
              <div class="yt-channel">${channelTitle}</div>
            </div>
          `);
          } catch (e) {
            console.error('Ошибка загрузки видео ' + e);
          }
        });

        youtuber();

      };

      gloTube.addEventListener('click', () => {
        request({
          method: 'search',
          part: 'snippet',
          channelId: 'UCVswRUcKC-M35RzgPRv8qUg',
          order: 'date',
          maxResults: 9,
        });
      });

      trends.addEventListener('click', () => {
        request({
          method: 'videos',
          part: 'snippet',
          chart: 'mostPopular',
          regionCode: 'RU',
          maxResults: 9,
        });
      });

      like.addEventListener('click', () => {
        request({
          method: 'playlistItems',
          part: 'snippet',
          playlistId: 'LLOdVaOahtAm073HWwxvsn2A',
          maxResults: 9,
        });
      });

      subscriptions.addEventListener('click', () => {
        request({
          method: 'subscriptions',
          part: 'snippet',
          mine: true,
          maxResults: 9,
        });
      });

      searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const value = searchForm.elements[0].value;

        if (!value) {
          searchForm.style.border = '1px solid red';
          return;
        }

        searchForm.style.border = '';

        request({
          method: 'search',
          part: 'snippet',
          order: 'relevance',
          maxResults: 9,
          q: value
        });

        searchForm.elements[0].value = '';



      });

    }

  }


});