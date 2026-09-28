
const pictures = document.querySelectorAll(".Picture");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let previousTouch = null;
let zIndexCounter = 1;

// Drag photos
function updateElementPosition(element, event) {
  let movementX = 0;
  let movementY = 0;

  if (event.type === "touchmove") {
    const touch = event.touches[0];

    if (previousTouch) {
      movementX = touch.clientX - previousTouch.clientX;
      movementY = touch.clientY - previousTouch.clientY;
    }

    previousTouch = touch;
  } else {
    movementX = event.movementX;
    movementY = event.movementY;
  }

  element.style.left =
    (parseFloat(element.style.left) || 0) + movementX + "px";

  element.style.top =
    (parseFloat(element.style.top) || 0) + movementY + "px";
}

function startDrag(element, event) {
  element.style.zIndex = zIndexCounter++;

  const updateFunction = (e) => updateElementPosition(element, e);

  const stopFunction = () => {
    previousTouch = null;

    document.removeEventListener("mousemove", updateFunction);
    document.removeEventListener("touchmove", updateFunction);
    document.removeEventListener("mouseup", stopFunction);
    document.removeEventListener("touchend", stopFunction);
  };

  document.addEventListener("mousemove", updateFunction);
  document.addEventListener("touchmove", updateFunction, {
    passive: true
  });

  document.addEventListener("mouseup", stopFunction);
  document.addEventListener("touchend", stopFunction);
}

// Initialize photo positions and dragging
pictures.forEach((picture) => {
  const range = 100;

  const randomX = Math.random() * range * 2 - range;
  const randomY = Math.random() * range * 2 - range;
  const randomRotate = Math.random() * 50 - 25;

  picture.style.top = `${randomY}px`;
  picture.style.left = `${randomX}px`;

  picture.style.transform =
    `translate(-50%, -50%) rotate(${randomRotate}deg)`;

  picture.addEventListener("mousedown", (event) => {
    if (event.target.closest(".choice-buttons")) return;
    startDrag(picture, event);
  });

  picture.addEventListener("touchstart", (event) => {
    if (event.target.closest(".choice-buttons")) return;
    startDrag(picture, event);
  }, { passive: true });
});

// Prevent button interactions from dragging the photo
[yesBtn, noBtn].forEach((button) => {
  button.addEventListener("mousedown", (event) => {
    event.stopPropagation();
  });

  button.addEventListener("touchstart", (event) => {
    event.stopPropagation();
  });
});

// YES button
yesBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  noBtn.style.display = "none";

  let message = document.getElementById("yesMessage");

  if (!message) {
    message = document.createElement("div");
    message.id = "yesMessage";
    message.textContent = "YAY! ❤️ I KNEW YOU WOULD SAY YES! 🥰";

    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ff1744;
      color: white;
      padding: 25px;
      border-radius: 20px;
      z-index: 999999;
      text-align: center;
      width: 85%;
      font-family: Arial, sans-serif;
      font-size: 22px;
    `;

    document.body.appendChild(message);
  }
});

// NO button moves away
function moveNoButton(event) {
  event.stopPropagation();

  const maxX = window.innerWidth - noBtn.offsetWidth - 10;
  const maxY = window.innerHeight - noBtn.offsetHeight - 10;

  noBtn.style.position = "fixed";
  noBtn.style.left =
    Math.max(10, Math.random() * maxX) + "px";
  noBtn.style.top =
    Math.max(10, Math.random() * maxY) + "px";

  noBtn.style.zIndex = "999999";
}

noBtn.addEventListener("click", moveNoButton);

noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton(event);
}, { passive: false });

// Disable right-click and image dragging
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  event.preventDefault();
});
