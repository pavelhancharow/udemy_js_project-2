const modals = () => {
  let btnPressed = false;

  function bindModal(triggerSelector, modalSelector, closeSelector, destroyBtn = false) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]'),
      scroll = calcScroll();

    trigger.forEach(item => item.addEventListener('click', (e) => {
      if (e.target) { e.preventDefault(); }

      btnPressed = true;

      if (destroyBtn) { item.remove(); }

      windows.forEach(item => {
        item.style.display = 'none';
        item.classList.add('animated', 'fadeIn');
      });

      modal.style.display = "block";
      document.body.style.cssText = `overflow: hidden; margin-right: ${scroll}px`;
    }));

    close.addEventListener('click', () => {
      windows.forEach(item => item.style.display = 'none');

      modal.style.display = "none";
      document.body.style.cssText = `overflow: auto; margin-right: 0px`;
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        windows.forEach(item => item.style.display = 'none');

        modal.style.display = "none";
        document.body.style.cssText = `overflow: auto; margin-right: 0px`;
      }
    });
  }

  function showModal(selector, timer) {
    setTimeout(() => {
      let display;

      document.querySelectorAll('[data-modal]').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = "block";
        document.body.style.overflow = "hidden";
      }
    }, timer);
  }

  function calcScroll() {
    let div = document.createElement('div');
    div.style.cssText = `width: 50px; height: 50px; overflow-y: scroll; visibility: hidden`;
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

      if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
        document.querySelector(selector).click();
      }
    });
  }

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift');
  showModal('.popup-consultation', 60000);
};

export default modals;