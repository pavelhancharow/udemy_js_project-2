const accordion = (triggersSelector) => {
  const btns = document.querySelectorAll(triggersSelector);

  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      btns.forEach(btn => {
        btn.classList.remove('active-style');
        btn.nextElementSibling.classList.remove('active-content');
        btn.nextElementSibling.style.maxHeight = '0px';
      });

      this.classList.add('active-style');
      this.nextElementSibling.classList.add('active-content');

      if (this.classList.contains('active-style')) {
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
      } else {
        this.nextElementSibling.style.maxHeight = '0px';
      }
    });
  });
};

export default accordion;