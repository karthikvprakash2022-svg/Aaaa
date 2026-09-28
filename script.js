const cards = document.querySelectorAll(".swipe-card");
const extraCards = document.querySelectorAll(".extra-card");

let currentCard = 0;
let startX = 0;
let startY = 0;
let isDragging = false;
let noClickCount = 0;

// Stack the first 3 cards in the center
function updateStack() {
  cards.forEach((card, index) => {
    if (index < currentCard) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
      card.style.zIndex = cards.length - index;
      card.style.transform =
        `translateY(${(index - currentCard) * 4}px) scale(${1 - (index - currentCard) * 0.02})`;
    }
  });
}

function swipeCard(card, distance) {
  card.style.transition = "transform 0.4s ease, opacity 0.4s ease";
  card.style.transform =
    `translate(${distance > 0 ? 120 : -120}vw, -20px) rotate(${distance > 0 ? 20 : -20}deg)`;
  card.style.opacity = "0";

  setTimeout(() => {
    card.style.display = "none";
    currentCard++;
    updateStack();
  }, 400);
}

cards.forEach((card, index) => {
  card.addEventListener("pointerdown", (event) => {
    if (index !== currentCard) return;
    if (event.target.closest("button")) return;

    startX = event.clientX;
    startY = event.clientY;
    isDragging = true;
    card.setPointerCapture(event.pointerId);
  });

  card.addEventListener("pointerup", (event) => {
    if (!isDragging || index !== currentCard) return;

    isDragging = false;

    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;

    if (Math.abs(distanceX) > 100) {
      swipeCard(card, distanceX);
    } else {
      card.style.transform = "translate(0, 0)";
    }
  });

  card.addEventListener("pointercancel", () => {
    isDragging = false;
  });
});

// YES: reveal all remaining photos
document.getElementById("yesBtn").addEventListener("click", () => {
  extraCards.forEach((card) => {
    card.classList.remove("extra-card");
    card.style.display = "block";
  });

  document.getElementById("buttonArea").style.display = "none";
  document.querySelector(".question-text").style.display = "none";

  const message = document.getElementById("loveMessage");
  message.textContent = "Yayyy! I love you so much, Aruna! ❤️🥹💖";
  message.style.display = "block";
});

// NO: move 5 times, show note on the 6th click
const noBtn = document.getElementById("noBtn");
const buttonArea = document.getElementById("buttonArea");

noBtn.addEventListener("click", () => {
  noClickCount++;

  if (noClickCount <= 5) {
    noBtn.style.position = "absolute";
    noBtn.style.left = `${Math.random() * 65}%`;
    noBtn.style.top = `${Math.random() * 50}%`;
  } else {
    buttonArea.style.display = "none";
    document.querySelector(".question-text").style.display = "none";

    const message = document.getElementById("loveMessage");
    message.textContent =
      "Even if you say no, you will always be special to me. ❤️🥹";
    message.style.display = "block";
  }
});

// Show the first card initially
updateStack();
