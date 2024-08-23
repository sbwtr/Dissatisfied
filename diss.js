const letters = document.querySelectorAll(".letter");
const disForm = document.querySelector("#dis-cont");
const parags = document.querySelector("#parags");
const newPost = document.querySelector("#new-post");
const button = document.querySelector(".form > button");
const bucket = document.querySelector("#bucket");
let count = 0;

const ballAnim = gsap
  .timeline()
  .to(".ball", { y: -50, repeat: -1, yoyo: true });

letters.forEach((letter) => {
  letter.addEventListener(
    "click",
    () => {
      if (disForm.classList.contains("hide-form"))
        letter.querySelector("img").src = "./imgs/X.svg";
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
      addPicture().then(() => {
        document.querySelectorAll(".elem").forEach((el) => {
          Draggable.create(el);
        });
      });
    },
    { once: true }
  );
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

function addPicture() {
  return new Promise((resolve) => {
    if (count > 4) {
      count = 0;
    } else {
      count++;
    }

    const block = document.createElement("div");
    block.setAttribute(
      "style",
      "position:absolute; bottom:0;left:50%; width:200px; height:200px; background-color:black;"
    );
    block.setAttribute("class", "elem");
    block.innerHTML = `<img style="width:100%; height:100%; object-fit:cover;" src="photos/nasa${count}.jpg" alt="" />`;

    resolve(block, count);
    document.querySelector("#element").appendChild(block);
  });
}
