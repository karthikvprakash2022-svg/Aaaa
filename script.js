
const cards = [...document.querySelectorAll('#stage .Picture')];
const stage = document.getElementById('stage');
const gallery = document.getElementById('gallery');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');

const galleryGrid = gallery.querySelector('.gallery-grid');
const galleryCards = [...galleryGrid.querySelectorAll('.Picture')];

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
  if (current < cards.length - 1) {
    current++;
    showCard(current);
  }
}

function setupSwipe(element, callback) {
  let x = 0;
  let y = 0;

  element.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    x = event.clientX;
    y = event.clientY;
  });

  element.addEventListener('pointerup', (event) => {
    if (event.target.closest('button')) return;

    const dx = event.clientX - x;
    const dy = event.clientY - y;

    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy)) {
      callback();
    }
  });
}

setupSwipe(stage, nextCard);

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

  galleryGrid.style.display = 'flex';
  galleryGrid.style.position = 'relative';
  galleryGrid.style.justifyContent = 'center';
  galleryGrid.style.alignItems = 'center';
  galleryGrid.style.height = '75vh';
  galleryGrid.style.minHeight = '450px';
  galleryGrid.style.maxWidth = '100%';
  galleryGrid.style.touchAction = 'pan-y';

  galleryCards.forEach((card) => {
    card.style.position = 'absolute';
    card.style.left = '50%';
    card.style.top = '50%';
    card.style.width = 'min(82vw, 350px)';
    card.style.transform = 'translate(-50%, -50%)';
    card.style.margin = '0';
  });

  galleryCurrent = 0;
  showGalleryCard(galleryCurrent);

  setupSwipe(galleryGrid, nextGalleryCard);

  window.scrollTo({ top: 0, behavior: 'smooth' });
});

noBtn.addEventListener('click', () => {
  noCount++;

  if (noCount <= 5) {
    const parent = noBtn.parentElement;
    const maxX = Math.max(0, parent.clientWidth - noBtn.offsetWidth - 20);

    noBtn.style.left = (Math.random() * maxX - maxX / 2) + 'px';
    noBtn.style.top = (Math.random() * 100 - 50) + 'px';
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
