const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const hiddenPages = document.getElementById("hiddenPages");
const yesMessage = document.getElementById("yesMessage");

let currentPage = 1;
let noClicks = 0;
let zIndex = 10;

// ---------------------------------
// INITIAL PAGE SETUP
// ---------------------------------

page1.hidden = false;
page2.hidden = true;
page3.hidden = true;

page1.style.zIndex = zIndex++;
page2.style.zIndex = zIndex++;
page3.style.zIndex = zIndex++;

// ---------------------------------
// SWIPE BETWEEN FIRST TWO PAGES
// ---------------------------------

function showNextPage() {
  if (currentPage === 1) {
    page1.hidden = true;
    page2.hidden = false;
    currentPage = 2;
  } else if (currentPage === 2) {
    page2.hidden = true;
    page3.hidden = false;
    currentPage = 3;
  }
}

function enableSwipe(page) {
  let startX = 0;
  let startY = 0;

  page.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
  });

  page.addEventListener("pointerup", (event) => {
    const diffX = event.clientX - startX;
    const diffY = event.clientY - startY;

    if (
      Math.abs(diffX) > 60 &&
      Math.abs(diffX) > Math.abs(diffY)
    ) {
      showNextPage();
    }
  });
}

enableSwipe(page1);
enableSwipe(page2);

// ---------------------------------
// YES BUTTON: REVEAL ALL PHOTOS
// ---------------------------------

yesBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  hiddenPages.hidden = false;

  const cards = hiddenPages.querySelectorAll(".Picture");

  cards.forEach((card) => {
    card.style.zIndex = zIndex++;

    card.style.left = `${Math.random() * 180 - 90}px`;
    card.style.top = `${Math.random() * 180 - 90}px`;

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

// ---------------------------------
// DRAG REVEALED PHOTOS
// ---------------------------------

function enableDrag(card) {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  card.style.touchAction = "none";

  card.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;

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

// ---------------------------------
// NO BUTTON: MOVE AND SHOW MESSAGE
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
