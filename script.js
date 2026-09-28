
const cards = [...document.querySelectorAll('#stage .Picture')];
const stage = document.getElementById('stage');
const gallery = document.getElementById('gallery');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');

const galleryGrid = gallery.querySelector('.gallery-grid');
const galleryCards = [...galleryGrid.querySelectorAll('.Picture')];

let current = 0;
let noCount = 0;
let topZ = 10;

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

// Swipe first three photos
let startX = 0;
let startY = 0;

stage.addEventListener('pointerdown', (event) => {
  if (event.target.closest('button')) return;
  startX = event.clientX;
  startY = event.clientY;
});

stage.addEventListener('pointerup', (event) => {
  if (event.target.closest('button')) return;

  const dx = event.clientX - startX;
  const dy = event.clientY - startY;

  if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy)) {
    nextCard();
  }
});

// YES: Show all photos as a draggable stack
yesBtn.addEventListener('click', () => {
  stage.style.display = 'none';
  gallery.style.display = 'block';

  gallery.style.position = 'relative';
  gallery.style.height = '85vh';
  gallery.style.minHeight = '550px';
  gallery.style.padding = '20px 0';

  const title = gallery.querySelector('h2');
  title.style.marginBottom = '15px';

  galleryGrid.style.display = 'block';
  galleryGrid.style.position = 'relative';
  galleryGrid.style.width = '100%';
  galleryGrid.style.height = '65vh';
  galleryGrid.style.minHeight = '430px';
  galleryGrid.style.maxWidth = '100%';
  galleryGrid.style.overflow = 'visible';

  const width = Math.min(window.innerWidth * 0.82, 350);
  const centerX = (window.innerWidth - width) / 2;
  const centerY = 15;

  galleryCards.forEach((card, index) => {
    card.classList.remove('hidden');

    card.style.position = 'absolute';
    card.style.width = width + 'px';
    card.style.left = centerX + 'px';
    card.style.top = (centerY + index * 3) + 'px';
    card.style.margin = '0';
    card.style.transform = `rotate(${(index % 2 === 0 ? 1 : -1) * (index % 5 + 1)}deg)`;
    card.style.zIndex = index + 1;
    card.style.cursor = 'grab';
    card.style.touchAction = 'none';

    makeDraggable(card);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Make each photo draggable and keep it where released
function makeDraggable(card) {
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;
  let dragging = false;

  card.addEventListener('pointerdown', (event) => {
    if (event.target.closest('a, button')) return;

    dragging = true;

    startX = event.clientX;
    startY = event.clientY;

    initialLeft = parseFloat(card.style.left) || 0;
    initialTop = parseFloat(card.style.top) || 0;

    card.style.zIndex = ++topZ;
    card.style.cursor = 'grabbing';

    card.setPointerCapture(event.pointerId);
  });

  card.addEventListener('pointermove', (event) => {
    if (!dragging) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    card.style.left = (initialLeft + dx) + 'px';
    card.style.top = (initialTop + dy) + 'px';
  });

  function stopDragging() {
    dragging = false;
    card.style.cursor = 'grab';
  }

  card.addEventListener('pointerup', stopDragging);
  card.addEventListener('pointercancel', stopDragging);
}

// NO button behavior
noBtn.addEventListener('click', () => {
  noCount++;

  if (noCount <= 5) {
    const parent = noBtn.parentElement;
    const maxX = Math.max(0, parent.clientWidth - noBtn.offsetWidth - 20);

    noBtn.style.position = 'relative';
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
