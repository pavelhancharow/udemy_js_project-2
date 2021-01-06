import { postData } from "../services/requests";

const drop = () => {
  const fileInputs = document.querySelectorAll('[name=upload]');

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function hightLight(item) {
    item.closest('.file_upload').style.border = '5px solid yellow';
    item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
  }

  function unhightLight(item) {
    item.closest('.file_upload').style.border = 'none';

    if (item.closest('.calc-form')) {
      item.closest('.file_upload').style.backgroundColor = '#ffffff';
    } else {
      item.closest('.file_upload').style.backgroundColor = '#ededed';
    }
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => hightLight(input), false);
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => unhightLight(input), false);
    });
  });

  fileInputs.forEach(input => {
    input.addEventListener('drop', (e) => {
      input.files = e.dataTransfer.files;
      if (input.getAttribute('data-upload')) {
        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData();
        [...input.files].forEach(file => {
          formData.append('image', file);

          postData('assets/server.php', formData)
            .then(res => {
              console.log(res);
            });
        });
      }
      let dots;
      const arr = input.files[0].name.split('.');

      dots = arr[0].length > 6 ? "..." : '.';
      const name = arr[0].substring(0, 6) + dots + arr[1];
      input.previousElementSibling.textContent = name;
    });
  });
};

export default drop;