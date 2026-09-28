
const pictures = document.querySelectorAll(".Picture");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hiddenPages = document.getElementById("hiddenPages");

let zIndexCounter = 1;
let noClickCount = 0;
let isBlank = false;

// ==============================
// DRAG AND MOVE PHOTOS
// ==============================

pictures.forEach((picture) => {
  const range = 100;

  const randomX = Math.random() * range * 2 - range;
  const randomY = Math.random() * range * 2 - range;
  const randomRotate = Math.random() * 50 - 25;

  picture.style.left = `${randomX}px`;
  picture.style.top = `${randomY}px`;
  picture.style.transform =
    `translate(-50%, -50%) rotate(${randomRotate}deg)`;

  picture.style.touchAction = "none";
  picture.style.userSelect = "none";

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  picture.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".choice-buttons, a")) return;
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

    picture.style.left = `${initialLeft + movementX}px`;
    picture.style.top = `${initialTop + movementY}px`;
  });

  const stopDragging = () => {
    dragging = false;
  };

  picture.addEventListener("pointerup", stopDragging);
  picture.addEventListener("pointercancel", stopDragging);
  picture.addEventListener("lostpointercapture", stopDragging);
});

// ==============================
// YES BUTTON
// REVEAL HIDDEN PAGES + POPUP
// ==============================

if (yesBtn && noBtn) {
  yesBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isBlank) return;

    // Hide NO button
    noBtn.style.display = "none";

    // Reveal remaining pages
    if (hiddenPages) {
      hiddenPages.style.display = "block";
    }

    // Remove previous popup
    document.getElementById("yesMessage")?.remove();

    // Create popup
    const message = document.createElement("div");
    message.id = "yesMessage";
    message.textContent = "YAY! ❤️ I KNEW YOU WOULD SAY YES! 🥰";

    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ff1744;
      color: white;
      padding: 25px 30px;
      border-radius: 20px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      z-index: 9999999;
      text-align: center;
      width: 85%;
      max-width: 350px;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
      font-size: 22px;
      font-weight: bold;
      animation: popupEffect 0.3s ease;
    `;

    document.body.appendChild(message);

    // Remove popup after 3 seconds
    setTimeout(() => message.remove(), 3000);
  });
}

// ==============================
// NO BUTTON
// MOVE 5 TIMES, THEN SHOW MESSAGE
// ==============================

if (noBtn) {
  noBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isBlank) return;

    // Show emotional message on 6th click
    if (noClickCount >= 5) {
      isBlank = true;

      document.body.innerHTML = `
        <div style="
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #ffdde1, #ee9ca7);
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 25px;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        ">
          <div style="
            background: white;
            padding: 35px 25px;
            border-radius: 25px;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          ">
            <h1 style="color: #ff1744;">
              You Said NO... 💔
            </h1>

            <p style="
              color: #444;
              font-size: 20px;
              line-height: 1.7;
            ">
              But no matter what, you'll always be special to me. ❤️
            </p>

            <h2 style="color: #ff1744;">
              Happy Birthday, Aruna! 🥺🎂
            </h2>

            <p style="color: #888;">
              With love, Karthik ❤️
            </p>
          </div>
        </div>
      `;

      document.body.style.background = "#ffdde1";
      return;
    }

    noClickCount++;

    noBtn.style.position = "fixed";
    noBtn.style.left = "50%";
    noBtn.style.transform = "translateX(-50%)";
    noBtn.style.zIndex = "9999999";

    // Alternate between top and bottom
    if (noClickCount % 2 === 1) {
      noBtn.style.top = "10px";
      noBtn.style.bottom = "auto";
    } else {
      noBtn.style.top = "auto";
      noBtn.style.bottom = "10px";
    }
  });
}

// ==============================
// PREVENT RIGHT-CLICK AND IMAGE DRAG
// ==============================

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  event.preventDefault();
});

// ==============================
// POPUP ANIMATION
// ==============================

const style = document.createElement("style");

style.textContent = `
  @keyframes popupEffect {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }

    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

document.head.appendChild(style);
