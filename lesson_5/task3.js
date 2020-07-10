'use strict';

const modalWindow = document.querySelector('.modal-window');
const closeBtn = document.createElement('div');
const showBtn = document.querySelector('button');

closeBtn.classList.add('close-button');
modalWindow.appendChild(closeBtn);

showBtn.addEventListener('click', function () {
    modalWindow.classList.add('show-modal');
});

closeBtn.addEventListener('click', function () {
    modalWindow.classList.remove('show-modal');
});