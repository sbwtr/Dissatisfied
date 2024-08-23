const letters = document.querySelectorAll(".letter");
const disForm = document.querySelector("#dis-cont");
const parags = document.querySelector("#parags");
const newPost = document.querySelector("#new-post");
const button = document.querySelector(".form > button");
const bucket = document.querySelector("#bucket");

letters.forEach((letter) => {
  letter.addEventListener(
    "click",
    () => {
      if (disForm.classList.contains("hide-form"))
        letter.querySelector("img").src = "./imgs/X.svg";
      disForm.querySelector("textarea").value = "";
      disForm.classList.remove("hide-form");
      Draggable.create(disForm, {
        trigger: "#dragme",
      });
      new Test().testing().then(console.log("cliske"));
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
  Draggable.create("p", {
    zIndexBoost: false,
    onClick: function () {
      bucket.textContent = this.target.id;
    },
  });
  index++;
});

function Test() {}

Test.prototype.testing = function () {
  return new Promise(function (resolve, reject) {
    const btn = document.createElement("button");
    btn.innerHTML = "Next";
    btn.addEventListener("click", resolve);
    document.getElementById("element").appendChild(btn);
  });
};

bucket.addEventListener("click", (event) => {
  parags.querySelector(`#${event.target.textContent}`).innerHTML = "";
});
