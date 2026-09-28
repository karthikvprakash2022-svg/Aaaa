
const pictures = document.querySelectorAll(".Picture");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let zIndexCounter = 1;
let noClickCount = 0;
let isBlank = false;

// Drag photos using mouse or touch
pictures.forEach((picture) => {
  const range = 100;

  const randomX = Math.random() * range * 2 - range;
  const randomY = Math.random() * range * 2 - range;
  const randomRotate = Math.random() * 50 - 25;

  picture.style.top = `${randomY}px`;
  picture.style.left = `${randomX}px`;
  picture.style.transform =
    `translate(-50%, -50%) rotate(${randomRotate}deg)`;

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  picture.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".choice-buttons")) return;
    if (event.target.closest("a")) return;
    if (isBlank) return;

    dragging = true;

    picture.setPointerCapture(event.pointerId);
    picture.style.zIndex = zIndexCounter++;

    startX = event.clientX;
    startY = event.clientY;

    initialLeft = parseFloat(picture.style.left) || 0;
    initialTop = parseFloat(picture.style.top) || 0;
  });

  picture.addEventListener("pointermove", (event) => {
    if (!dragging || isBlank) return;

    const movementX = event.clientX - startX;
    const movementY = event.clientY - startY;

    picture.style.left = initialLeft + movementX + "px";
    picture.style.top = initialTop + movementY + "px";
  });

  picture.addEventListener("pointerup", () => {
    dragging = false;
  });

  picture.addEventListener("pointercancel", () => {
    dragging = false;
  });
});

// YES button
yesBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  if (isBlank) return;

  noBtn.style.display = "none";

  let message = document.getElementById("yesMessage");

  if (!message) {
    message = document.createElement("div");
    message.id = "yesMessage";
    message.textContent =
      "YAY! ❤️ I KNEW YOU WOULD SAY YES! 🥰";

    document.body.appendChild(message);
  }
});

// NO button: move top and bottom 5 times,
// then make the entire page blank on the next click.
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (isBlank) return;

  // After 5 movements, the next click blanks the page.
  if (noClickCount >= 5) {
    isBlank = true;
    document.body.innerHTML = "";
    document.body.className = "blank-screen";
    document.body.style.background = "#ffffff";
    return;
  }

  noClickCount++;

  noBtn.style.position = "absolute";
  noBtn.style.left = "50%";
  noBtn.style.transform = "translateX(-50%)";
  noBtn.style.zIndex = "9999999";

  // Odd numbers: top, even numbers: bottom
  if (noClickCount % 2 === 1) {
    noBtn.style.top = "10px";
    noBtn.style.bottom = "auto";
  } else {
    noBtn.style.top = "auto";
    noBtn.style.bottom = "10px";
  }
});

// Prevent right-click and image dragging
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  event.preventDefault();
});
