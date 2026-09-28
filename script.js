const pictures = document.querySelectorAll(".Picture");

let previousTouch = undefined;
let zIndexCounter = 1;

// Original photo dragging
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

  element.style.top = elementY + "px";
  element.style.left = elementX + "px";
}

function startDrag(element, event) {
  // Don't drag when clicking a button
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
  document.addEventListener("touchmove", updateFunction);
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

// Keep the original random card placement
pictures.forEach((picture) => {
  const range = 100;

  const randomX = Math.random() * (range * 2) - range;
  const randomY = Math.random() * (range * 2) - range;
  const randomRotate = Math.random() * (range / 2) - range / 4;

  picture.style.top = `${randomY}px`;
  picture.style.left = `${randomX}px`;
  picture.style.transform =
    `translate(-50%, -50%) rotate(${randomRotate}deg)`;

  picture.addEventListener("mousedown", (event) =>
    startDrag(picture, event)
  );

  picture.addEventListener("touchstart", (event) =>
    startDrag(picture, event)
  );
});

// YES / NO buttons
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonArea = document.getElementById("buttonArea");
const loveMessage = document.getElementById("loveMessage");

let noClickCount = 0;

// YES: reveal all remaining photos
yesBtn.addEventListener("click", () => {
  document.querySelectorAll(".hidden-photo").forEach((photo) => {
    photo.classList.remove("hidden-photo");
  });

  document.getElementById("questionCard").classList.add("accepted");

  buttonArea.style.display = "none";
  document.querySelector(".question-text").style.display = "none";

  loveMessage.textContent =
    "Yayyy! I love you so much, Aruna! ❤️🥹💖";

  loveMessage.style.display = "block";
});

// NO: move 5 times, show note on the 6th click
noBtn.addEventListener("click", () => {
  noClickCount++;

  if (noClickCount <= 5) {
    const maxX = Math.max(
      0,
      buttonArea.clientWidth - noBtn.offsetWidth
    );

    const maxY = 60;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "absolute";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
  } else {
    buttonArea.style.display = "none";

    document.querySelector(".question-text").style.display = "none";

    loveMessage.textContent =
      "Even if you say no, you will always be special to me. ❤️🥹";

    loveMessage.style.display = "block";
  }
});
