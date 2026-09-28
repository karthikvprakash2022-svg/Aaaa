const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hiddenPages = document.getElementById("hiddenPages");
const yesMessage = document.getElementById("yesMessage");

let zIndex = 10;
let noClicks = 0;

// FIRST 2 PHOTOS + QUESTION CARD
const firstCards = [...document.querySelectorAll(
  '.Picture[data-page]'
)];

firstCards.forEach((card, index) => {
  card.style.zIndex = zIndex++;

  const positions = [
    { x: -35, y: -18, r: -5 },
    { x: 35, y: 18, r: 5 },
    { x: 0, y: 0, r: 0 }
  ];

  const p = positions[index];

  card.style.left = `${p.x}px`;
  card.style.top = `${p.y}px`;
  card.style.transform =
    `translate(-50%, -50%) rotate(${p.r}deg)`;

  enableDrag(card);
});

// DRAG PHOTOS
function enableDrag(card) {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  card.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".choice-buttons")) return;
    if (card.classList.contains("choice-card")) return;

    dragging = true;
    card.setPointerCapture(event.pointerId);
    card.style.zIndex = zIndex++;

    startX = event.clientX;
    startY = event.clientY;

    initialLeft = parseFloat(card.style.left) || 0;
    initialTop = parseFloat(card.style.top) || 0;
  });

  card.addEventListener("pointermove", (event) => {
    if (!dragging) return;

    card.style.left =
      `${initialLeft + event.clientX - startX}px`;

    card.style.top =
      `${initialTop + event.clientY - startY}px`;
  });

  const stopDragging = () => {
    dragging = false;
  };

  card.addEventListener("pointerup", stopDragging);
  card.addEventListener("pointercancel", stopDragging);
  card.addEventListener("lostpointercapture", stopDragging);
}

// YES BUTTON: REVEAL ALL HIDDEN PHOTOS
yesBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  hiddenPages.hidden = false;

  const hiddenCards =
    hiddenPages.querySelectorAll(".Picture");

  hiddenCards.forEach((card, index) => {
    card.style.zIndex = zIndex++;

    card.style.left =
      `${Math.random() * 180 - 90}px`;

    card.style.top =
      `${Math.random() * 180 - 90}px`;

    card.style.transform =
      `translate(-50%, -50%) rotate(${Math.random() * 24 - 12}deg)`;

    enableDrag(card);
  });

  noBtn.hidden = true;
  yesMessage.hidden = false;

  setTimeout(() => {
    yesMessage.hidden = true;
  }, 3000);
});

// NO BUTTON
noBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  noClicks++;

  if (noClicks >= 6) {
    document.body.innerHTML = `
      <main class="no-ending">
        <section>
          <h1>You Said NO... 💔</h1>
          <p>But no matter what, you'll always be special to me. ❤️</p>
          <h2>Happy Birthday, Aruna! 🥺🎂</h2>
          <p>With love, Karthik ❤️</p>
        </section>
      </main>
    `;

    const style = document.createElement("style");

    style.textContent = `
      .no-ending {
        position: fixed;
        inset: 0;
        background: linear-gradient(135deg, #ffdde1, #ee9ca7);
        display: grid;
        place-items: center;
        padding: 20px;
        font-family: Arial, sans-serif;
        text-align: center;
      }

      .no-ending section {
        background: white;
        padding: 30px 22px;
        border-radius: 24px;
        max-width: 400px;
        box-shadow: 0 10px 30px #0002;
      }

      .no-ending h1,
      .no-ending h2 {
        color: #ff1744;
      }

      .no-ending p {
        font-size: 19px;
        line-height: 1.6;
        color: #444;
      }
    `;

    document.head.appendChild(style);
    return;
  }

  noBtn.style.position = "fixed";
  noBtn.style.left = `${15 + Math.random() * 70}%`;
  noBtn.style.top = `${12 + Math.random() * 70}%`;
  noBtn.style.zIndex = "1000000";
});

// PREVENT RIGHT CLICK AND IMAGE DRAG
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  event.preventDefault();
});
