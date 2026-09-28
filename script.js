
const container = document.getElementById("photoContainer");
const intro = document.getElementById("intro");
const introPhoto = document.getElementById("introPhoto");
const slideImage = document.getElementById("slideImage");
const slideText = document.getElementById("slideText");
const proposalCard = document.getElementById("proposalCard");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let unlocked = false;
let zIndexCounter = 10;

// INTRO: 3 PHOTOS TO DRAG MANUALLY
const slides = [
  { src: "IMG_2489.jpeg", text: "Happy 🎉❤️" },
  { src: "IMG_2496.jpeg", text: "Birthday 🎂💕" },
  { src: "IMG_2494.jpeg", text: "Celebrate 🎉💖" }
];

let currentSlide = 0;

function showSlide(index) {
  slideImage.src = slides[index].src;
  slideText.textContent = slides[index].text;

  introPhoto.style.animation = "none";
  void introPhoto.offsetWidth;
  introPhoto.style.animation = "photoAppear 0.7s ease";
}

showSlide(currentSlide);

// MANUAL DRAG TO CHANGE INTRO PHOTO
let startX = 0;
let startY = 0;
let draggingIntro = false;

introPhoto.addEventListener("pointerdown", (event) => {
  draggingIntro = true;
  startX = event.clientX;
  startY = event.clientY;
  introPhoto.setPointerCapture(event.pointerId);
});

introPhoto.addEventListener("pointerup", (event) => {
  if (!draggingIntro) return;
  draggingIntro = false;

  const distanceX = event.clientX - startX;
  const distanceY = event.clientY - startY;

  if (Math.abs(distanceX) > 80 || Math.abs(distanceY) > 80) {
    currentSlide++;

    if (currentSlide < slides.length) {
      showSlide(currentSlide);
    } else {
      // FINISH INTRO
      intro.style.display = "none";
      container.style.display = "block";
    }
  }
});

introPhoto.addEventListener("pointercancel", () => {
  draggingIntro = false;
});

// INITIALIZE PHOTO POSITIONS
const pictures = document.querySelectorAll(
  ".Picture:not(.proposal-card):not(.main-frame), .Picture-video"
);

pictures.forEach((picture) => {
  const randomX = Math.random() * 200 - 100;
  const randomY = Math.random() * 200 - 100;
  const randomRotate = Math.random() * 30 - 15;

  picture.style.left = `${randomX}px`;
  picture.style.top = `${randomY}px`;
  picture.style.transform =
    `translate(-50%, -50%) rotate(${randomRotate}deg)`;
  picture.style.zIndex = zIndexCounter++;
});

// YES BUTTON
yesBtn.addEventListener("click", () => {
  if (unlocked) return;
  unlocked = true;

  // Show all photos, including the fixed main frame
  document.querySelectorAll(".hidden-photo").forEach((photo) => {
    photo.classList.remove("hidden-photo");
  });

  // Remove proposal card
  proposalCard.remove();

  // Show message
  const message = document.createElement("div");
  message.className = "love-message";
  message.textContent =
    "Yayyy! ❤️ I knew you would say YES! I love you! 💕";
  document.body.appendChild(message);

  setTimeout(() => message.remove(), 5000);

  // Enable dragging only on regular photos
  enableDragging();
});

// NO BUTTON
noBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div class="sad-page">
      <div style="font-size:5rem">💔</div>
      <h1>It's Okay...</h1>
      <p>
        Maybe we were never meant to be. 😔
        <br><br>
        I will always cherish the beautiful memories
        we shared. Even if you say no, I will wish
        you nothing but happiness.
        <br><br>
        Take care of yourself. ❤️
      </p>
    </div>
  `;
});

// DRAGGING FOR REGULAR PHOTOS ONLY
function enableDragging() {
  const allPictures = document.querySelectorAll(
    ".Picture:not(.proposal-card):not(.main-frame), .Picture-video"
  );

  allPictures.forEach((picture) => {
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let dragging = false;

    picture.addEventListener("pointerdown", (event) => {
      if (!unlocked) return;
      if (event.target.closest("a, button")) return;

      dragging = true;
      picture.setPointerCapture(event.pointerId);

      startX = event.clientX;
      startY = event.clientY;

      initialLeft = parseFloat(picture.style.left) || 0;
      initialTop = parseFloat(picture.style.top) || 0;

      picture.style.zIndex = ++zIndexCounter;
    });

    picture.addEventListener("pointermove", (event) => {
      if (!dragging) return;

      picture.style.left =
        `${initialLeft + event.clientX - startX}px`;

      picture.style.top =
        `${initialTop + event.clientY - startY}px`;
    });

    function stopDragging() {
      dragging = false;
    }

    picture.addEventListener("pointerup", stopDragging);
    picture.addEventListener("pointercancel", stopDragging);
  });
}
