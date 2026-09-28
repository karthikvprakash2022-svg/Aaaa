
const cards = [...document.querySelectorAll('#stage .Picture')];
const stage = document.getElementById('stage');
const gallery = document.getElementById('gallery');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');

const galleryCards = [...document.querySelectorAll('#gallery .Picture')];

let current = 0;
let galleryCurrent = 0;
let startX = 0;
let startY = 0;
let noCount = 0;

function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.toggle('hidden', i !== index);
  });
}

function nextCard() {
  if (current < 2) {
    current++;
    showCard(current);
  }
}

stage.addEventListener('pointerdown', (event) => {
  if (event.target.closest('button')) return;
  startX = event.clientX;
  startY = event.clientY;
});

stage.addEventListener('pointerup', (event) => {
  if (event.target.closest('button')) return;

  const diffX = event.clientX - startX;
  const diffY = event.clientY - startY;

  if (Math.abs(diffX) > 80 && Math.abs(diffX) > Math.abs(diffY)) {
    nextCard();
  }
});

// Show remaining photos one by one
function showGalleryCard(index) {
  galleryCards.forEach((card, i) => {
    card.classList.toggle('hidden', i !== index);
  });
}

function nextGalleryCard() {
  if (galleryCurrent < galleryCards.length - 1) {
    galleryCurrent++;
    showGalleryCard(galleryCurrent);
  }
}

yesBtn.addEventListener('click', () => {
  stage.style.display = 'none';
  gallery.style.display = 'block';

  gallery.style.position = 'relative';
  gallery.style.height = '85vh';
  gallery.style.minHeight = '500px';

  const grid = gallery.querySelector('.gallery-grid');

  grid.style.display = 'flex';
  grid.style.justifyContent = 'center';
  grid.style.alignItems = 'center';
  grid.style.position = 'relative';
  grid.style.height = '70vh';
  grid.style.maxWidth = '100%';

  galleryCards.forEach((card) => {
    card.style.position = 'absolute';
    card.style.width = 'min(82vw, 350px)';
    card.style.left = '50%';
    card.style.top = '50%';
    card.style.transform = 'translate(-50%, -50%)';
  });

  galleryCurrent = 0;
  showGalleryCard(galleryCurrent);

  window.scrollTo({ top: 0, behavior: 'smooth' });
});

gridSwipeSetup();

function gridSwipeSetup() {
  const grid = gallery.querySelector('.gallery-grid');

  grid.addEventListener('pointerdown', (event) => {
    startX = event.clientX;
    startY = event.clientY;
  });

  grid.addEventListener('pointerup', (event) => {
    const diffX = event.clientX - startX;
    const diffY = event.clientY - startY;

    if (Math.abs(diffX) > 80 && Math.abs(diffX) > Math.abs(diffY)) {
      nextGalleryCard();
    }
  });
}

noBtn.addEventListener('click', () => {
  noCount++;

  if (noCount <= 5) {
    const parent = noBtn.parentElement;
    const maxX = Math.max(0, parent.clientWidth - noBtn.offsetWidth - 20);
    const maxY = 100;

    noBtn.style.position = 'relative';
    noBtn.style.left = (Math.random() * maxX - maxX / 2) + 'px';
    noBtn.style.top = (Math.random() * maxY - maxY / 2) + 'px';
  } else {
    document.getElementById('question').classList.add('hidden');
    yesBtn.classList.add('hidden');
    noBtn.classList.add('hidden');

    message.textContent =
      "Even if you say no, you will always have a special place in my heart. ❤️ Happy Birthday, Aruna! 💖";

    message.classList.remove('hidden');
  }
});

showCard(0);
