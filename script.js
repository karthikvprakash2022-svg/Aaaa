
const pictures = document.querySelectorAll(".Picture");

let previousTouch = undefined;
let zIndexCounter = 1;

// Photos that are locked after swapping
const lockedPictures = new Set();

function updateElementPosition(element, event) {
  if (lockedPictures.has(element)) return;

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
    parseFloat(element.style.top || 0) + movementY;

  const elementX =
    parseFloat(element.style.left || 0) + movementX;

  element.style.top = elementY + "px";
  element.style.left = elementX + "px";
}

function startDrag(element, event) {
  // Do not move a locked photo
  if (lockedPictures.has(element)) return;

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

pictures.forEach((picture) => {
  const range = 100;

  const randomX = Math.random() * (range * 2) - range;
  const randomY = Math.random() * (range * 2) - range;
  const randomRotate = Math.random() * (range / 2) - range / 4;

  picture.style.top = `${randomY}px`;
  picture.style.left = `${randomX}px`;

  picture.style.transform =
    `translate(-50%, -50%) rotate(${randomRotate}deg)`;

  picture.addEventListener("mousedown", (event) => {
    startDrag(picture, event);
  });

  picture.addEventListener("touchstart", (event) => {
    startDrag(picture, event);
  });

  // Double-click to lock a photo in its current position
  picture.addEventListener("dblclick", () => {
    lockedPictures.add(picture);
    picture.style.cursor = "default";
  });
});

/* Disable right-click */
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

/* Disable copy and cut */
document.addEventListener("copy", (event) => {
  event.preventDefault();
});

document.addEventListener("cut", (event) => {
  event.preventDefault();
});

/* Disable image dragging */
document.addEventListener("dragstart", (event) => {
  event.preventDefault();
});

/* Disable text selection */
document.addEventListener("selectstart", (event) => {
  event.preventDefault();
});
