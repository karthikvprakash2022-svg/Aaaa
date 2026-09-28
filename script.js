
const pictures = document.querySelectorAll(".Picture");

let zIndexCounter = 1;
let activePicture = null;
let previousTouch = null;

// Arrange all pictures in stack order
pictures.forEach((picture, index) => {
  picture.style.zIndex = index + 1;
  picture.style.pointerEvents = "none";
});

// Only the topmost picture can be dragged
function getTopPicture() {
  const visiblePictures = [...pictures].filter(
    (picture) => picture.style.display !== "none"
  );

  return visiblePictures.reduce((top, picture) => {
    return Number(picture.style.zIndex) > Number(top.style.zIndex)
      ? picture
      : top;
  }, visiblePictures[0]);
}

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
    parseFloat(element.style.top || 0) + movementY;

  const elementX =
    parseFloat(element.style.left || 0) + movementX;

  element.style.top = elementY + "px";
  element.style.left = elementX + "px";
}

function startDrag(element, event) {
  const topPicture = getTopPicture();

  if (element !== topPicture) return;

  activePicture = element;
  element.style.zIndex = zIndexCounter++;

  const updateFunction = (event) => {
    if (activePicture) {
      updateElementPosition(activePicture, event);
    }
  };

  const stopFunction = () => {
    document.removeEventListener("mousemove", updateFunction);
    document.removeEventListener("touchmove", updateFunction);
    document.removeEventListener("mouseup", stopFunction);
    document.removeEventListener("touchend", stopFunction);

    activePicture = null;
    previousTouch = null;
  };

  document.addEventListener("mousemove", updateFunction);
  document.addEventListener("touchmove", updateFunction, {
    passive: true,
  });
  document.addEventListener("mouseup", stopFunction);
  document.addEventListener("touchend", stopFunction);
}

// Initialize pictures
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
});

// YES and NO buttons
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

yesBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  alert("Aww ❤️ I knew it! 💕");
});

noBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  alert("Are you sure? 🥺💔");
});
