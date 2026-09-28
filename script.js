
const container = document.querySelector(".Container");
const pictures = document.querySelectorAll(".Picture");
const videoCard = document.getElementById("video");

const hiddenPages = document.getElementById("hiddenPages");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const yesMessage = document.getElementById("yesMessage");

let previousTouch;
let zIndexCounter = 10;
let noClicks = 0;

// ---------------------------------
// INITIAL CARD SETUP
// ---------------------------------

const visibleCards = [
  videoCard,
  pictures[0],
  pictures[1]
];

visibleCards.forEach((card, index) => {
  card.style.zIndex = zIndexCounter++;

  const range = 100;
  const randomX = Math.random() * (range * 2) - range;
  const randomY = Math.random() * (range * 2) - range;
  const randomRotate = Math.random() * 20 - 10;

  card.style.left = `${randomX}px`;
  card.style.top = `${randomY}px`;
  card.style.transform =
    `translate(-50%, -50%) rotate(${randomRotate}deg)`;
});

// ---------------------------------
// HIDE ALL REMAINING PHOTOS
// ---------------------------------

hiddenPages.hidden = true;
yesMessage.hidden = true;

// ---------------------------------
// DRAG FUNCTION
// ---------------------------------

function updateElementPosition(element, event) {
  let movementX, movementY;

  if (event.type === "touchmove") {
    const touch = event.touches[0];

    movementX = previousTouch
      ? touch.clientX - previousTouch.clientX
      : 0;

    movementY = previousTouch
      ? touch.clientY - previousTouch.clientY
      : 0;

    previousTouch = touch;
  } else {
    movementX = event.movementX;
    movementY = event.movementY;
  }

  const elementY =
    parseInt(element.style.top || 0) + movementY;

  const elementX =
    parseInt(element.style.left || 0) + movementX;

  element.style.top = `${elementY}px`;
  element.style.left = `${elementX}px`;
}

function startDrag(element, event) {
  if (event.target.closest("button")) return;

  element.style.zIndex = zIndexCounter++;

  const updateFunction = (event) =>
    updateElementPosition(element, event);

  const stopFunction = () =>
    stopDrag({
      update: updateFunction,
      stop: stopFunction
    });

  document.addEventListener("mousemove", updateFunction);
  document.addEventListener("touchmove", updateFunction, {
    passive: false
  });

  document.addEventListener("mouseup", stopFunction);
  document.addEventListener("touchend", stopFunction);
}

function stopDrag(functions) {
  previousTouch = undefined;

  document.removeEventListener("mousemove", functions.update);
  document.removeEventListener("touchmove", functions.update);
  document.removeEventListener("mouseup", functions.stop);
  document.removeEventListener("touchend", functions.stop);
}

function enableDrag(element) {
  element.addEventListener("mousedown", (event) =>
    startDrag(element, event)
  );

  element.addEventListener("touchstart", (event) =>
    startDrag(element, event),
    { passive: true }
  );
}

// Enable drag for first three cards
visibleCards.forEach(enableDrag);

// ---------------------------------
// YES: REVEAL ALL HIDDEN PHOTOS
// ---------------------------------

yesBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  hiddenPages.hidden = false;

  const hiddenCards = hiddenPages.querySelectorAll(".Picture");

  hiddenCards.forEach((card) => {
    const range = 100;

    const randomX = Math.random() * (range * 2) - range;
    const randomY = Math.random() * (range * 2) - range;
    const randomRotate = Math.random() * 24 - 12;

    card.style.left = `${randomX}px`;
    card.style.top = `${randomY}px`;

    card.style.transform =
      `translate(-50%, -50%) rotate(${randomRotate}deg)`;

    card.style.zIndex = zIndexCounter++;

    enableDrag(card);
  });

  noBtn.hidden = true;
  yesBtn.disabled = true;
  yesMessage.hidden = false;

  setTimeout(() => {
    yesMessage.hidden = true;
  }, 3000);
});

// ---------------------------------
// NO: MOVE BUTTON, THEN SHOW NOTE
// ---------------------------------

noBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  noClicks++;

  if (noClicks >= 6) {
    document.body.innerHTML = `
      <main class="no-ending">
        <section>
          <h1>You Said NO... 💔</h1>

          <p>
            But no matter what, you'll always be special to me. ❤️
          </p>

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
  noBtn.style.zIndex = "999999";
});

// ---------------------------------
// PREVENT RIGHT CLICK AND IMAGE DRAG
// ---------------------------------

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  event.preventDefault();
});
