const filter = () => {
  const menu = document.querySelector('.portfolio-menu'),
    items = menu.querySelectorAll('li'),
    wrapper = document.querySelector('.portfolio-wrapper'),
    markAll = wrapper.querySelectorAll('.all'),
    no = document.querySelector('.portfolio-no');

  const typeFilter = (markType) => {
    markAll.forEach(mark => {
      mark.style.display = 'none';
      mark.classList.remove('animated', 'fadeIn');
    });

    no.style.display = 'none';
    no.classList.remove('animated', 'fadeIn');

    if (markType) {
      markType.forEach(mark => {
        mark.style.display = 'block';
        mark.classList.add('animated', 'fadeIn');
      });
    } else {
      no.style.display = 'none';
      no.classList.remove('animated', 'fadeIn');
    }
  };

  const filterBlock = (btnSelector, markSelector, mark = false) => {
    const btn = menu.querySelector(btnSelector);
    if (mark) {
      btn.addEventListener('click', () => {
        typeFilter(wrapper.querySelectorAll(markSelector));
      });
    } else {
      btn.addEventListener('click', () => {
        typeFilter();
      });
    }
  };

  filterBlock('.all', '.all', true);
  filterBlock('.lovers', '.lovers', true);
  filterBlock('.chef', '.chef', true);
  filterBlock('.girl', '.girl', true);
  filterBlock('.guy', '.guy', true);
  filterBlock('.grandmother');
  filterBlock('.granddad');

  menu.addEventListener('click', (e) => {
    let target = e.target;

    if (target && target.tagName == 'LI') {
      items.forEach(btn => btn.classList.remove('active'));
      target.classList.add('active');
    }
  });
};

export default filter;