const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.scrollPosition = window.scrollY;
    document.body.style.cssTextm = `
        overflow:hidden; 
        position: fixed;
        top: -${document.body.scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${widthScroll}px;
        `                                           // этот код в некоторых телефонах не работает  document.body.style.overflow = 'hidden';
};

const enabledScroll = () => {
    document.body.style.cssTextm = 'position: relative';
    window.scroll({ top: document.body.scrollPosition })              // этот код в некоторых телефонах не работает  document.body.style.overflow = '';
};



{ // МОДАЛЬНОЕ ОКНО
    const presentOrderBtn = document.querySelector('.present__order-btn');
    const pageOverlayModal = document.querySelector('.page__overlay_modal');
    const modalClose = document.querySelector('.modal__close');

    const handlerModal = function (openBtn, model, openSelector, closeTrigger, speedKey = 'default') {

        let opacity = 0;
        const speed = {
            slow: 0.05,
            fast: 0.1,
            default: 0.6,
        };

        const openModal = () => {
            disableScroll();
            model.style.opacity = opacity;
            model.classList.add(openSelector);

            const animation = () => {     //const timer = setInterval(() => {
                opacity += speed[speedKey];          //    opacity += 0.02;
                model.style.opacity = opacity;       //    model.style.opacity = opacity;
                if (opacity < 1) requestAnimationFrame(animation) //    if (opacity >= 1) clearInterval(timer)
            };                                                     //}, speed[speedKey]); //speed[speedKey] ? speed[speedKey] : speed.default);
            requestAnimationFrame(animation);
        };

        const closeModal = () => {
            enabledScroll();
            const animation = () => {
                opacity -= speed[speedKey];                      //    opacity -= 0.02;
                model.style.opacity = opacity;                  //    model.style.opacity = opacity;
                if (opacity > 0) {                                    //    if (opacity <= 0) {
                    requestAnimationFrame(animation)                  //        clearInterval(timers)
                } else {
                    model.classList.remove(openSelector);              //        model.classList.remove(openSelector);
                }                                                  //    }
            };
            requestAnimationFrame(animation);                  //}, speed[speedKey]); //speed[speedKey] ? speed[speedKey] : speed.default);
        };


        openBtn.addEventListener('click', openModal);
        closeTrigger.addEventListener('click', closeModal);
        model.addEventListener('click', (e) => {
            if (e.target === model) {
                closeModal()
            }
        })
    };

    handlerModal(presentOrderBtn,
        pageOverlayModal,
        'page__overlay_modal_open',
        modalClose,
        'slow');
}

{ // БУРГЕР МЕНЬЮ


    const headerContactsBurger = document.querySelector('.header__contacts-burger');
    const headerContacts = document.querySelector('.header__contacts');

    const handlerBurger = (openBtn, menu, openSelector) => {
        openBtn.addEventListener('click', () => {
            if (menu.classList.contains(openSelector)) {
                menu.style.height = '';
                menu.classList.remove(openSelector);
            } else {
                menu.style.height = menu.scrollHeight + 'px';
                menu.classList.add(openSelector);
            }
        })
    };

    handlerBurger(headerContactsBurger, headerContacts, 'header__contacts_open')

}

{ // 

}