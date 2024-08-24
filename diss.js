const letters = document.querySelectorAll(".letter");
//const disForm = document.querySelector("#dis-cont");
const parags = document.querySelector("#parags");
const newPost = document.querySelector("#new-post");
const button = document.querySelector(".form > button");
const bucket = document.querySelector("#bucket");
const photo = document.querySelectorAll(".photo");
const pull = document.querySelector("#pull");
let count = 0;
const ballAnim = gsap
  .timeline()
  .to(".ball", { y: -50, repeat: -1, yoyo: true });

letters.forEach((letter) => {
  letter.addEventListener("click", () => {
    const fadeX = gsap
      .timeline({
        paused: true,
        defaults: { transformOrigin: "center center", perspective: 200 },
      })
      .fromTo(
        letter,
        { scale: 1 },
        {
          scale: 0,
          rotateX: gsap.utils.random(-90, 90),
          rotateY: gsap.utils.random(-90, 90),
          rotateZ: gsap.utils.random(-90, 90),
          duration: 3,
          onComplete: function () {
            letter.remove();
          },
        }
      );
    if (disForm.classList.contains("hide-form")) {
      letter.querySelector("img").src = "./imgs/X.svg";
      fadeX.play();
    }
    disForm.querySelector("textarea").value = "";
    disForm.classList.remove("hide-form");
    ballAnim.play();
    Draggable.create(disForm, {
      trigger: "#dragme",
      onDrag: function () {
        ballAnim.pause();
      },
      onDragEnd: function () {
        ballAnim.play();
      },
    });
  });
});

let index = 0;
button.addEventListener("click", () => {
  parags.insertAdjacentHTML(
    "beforeend",
    `<p id="p${index}">${disForm.querySelector("textarea").value}</p>`
  );
  disForm.classList.add("hide-form");
  ballAnim.pause();
  Draggable.create("p", {
    zIndexBoost: false,
    onClick: function () {
      bucket.textContent = this.target.id;
    },
  });
  index++;
});

bucket.addEventListener("click", (event) => {
  parags.querySelector(`#${event.target.textContent}`).innerHTML = "";
});

photo.forEach((ph) => {
  ph.addEventListener("click", () => {
    makePhoto(ph).then(() => {
      Draggable.create(".newphoto");
    });
  });
});

function makePhoto(obj) {
  return new Promise((resolve) => {
    const makediv = document.createElement("div");
    makediv.setAttribute("class", "newphoto");
    makediv.innerHTML = `<img src="${obj.querySelector("img").src}" alt="" />`;
    resolve(makediv);
    document.body.appendChild(makediv);
  });
}

const photoMenu = gsap
  .timeline({ paused: true, defaults: { duration: 0.4 } })
  .to(".photo-cont", { x: -150 })
  .fromTo(pull, { x: -38 }, { x: 0 }, "<");

photoMenu.reverse();
pull.addEventListener("click", () => {
  if (photoMenu.reversed()) {
    photoMenu.play();
  } else {
    photoMenu.reverse();
  }
});
