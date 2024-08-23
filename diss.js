const letters = document.querySelectorAll(".letter");
//const disForm = document.querySelector("#dis-cont");
const parags = document.querySelector("#parags");
const newPost = document.querySelector("#new-post");
const button = document.querySelector(".form > button");
const bucket = document.querySelector("#bucket");

let count = -1;
let idx = 0;
letters.forEach((letter) => {
  letter.addEventListener(
    "click",
    () => {
      // if (disForm.classList.contains("hide-form"))

      // disForm.querySelector("textarea").value = "";
      // disForm.classList.remove("hide-form");
      if (!document.querySelector(".form-cont")) {
        letter.querySelector("img").src = "./imgs/X.svg";
        makeForm().then(
          document.querySelectorAll(".form > button").forEach((btn) => {
            btn.addEventListener("click", () => {
              parags.insertAdjacentHTML(
                "beforeend",
                `<p id="p${idx}">${
                  document.querySelector(".form > textarea").value
                }</p>`
              );
              Draggable.create("p", {
                zIndexBoost: false,
                onClick: function () {
                  bucket.textContent = this.target.id;
                },
              });
              document.querySelector(".form-cont").remove();
              idx++;
            });
          })
        );
      }
    },
    { once: true }
  );
});

function makeForm() {
  return new Promise(function (resolve) {
    count++;
    const block = document.createElement("div");
    block.innerHTML = `<div class="form">
    <div id="dragme${count}" style="font-family: Fustat;
  border: 3px solid red;
  color: red;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  width: 100px;
  text-align: center;
  align-self: center;
  margin-bottom: 1em;">DRAG ME</div>
        <textarea
        name="distext"
          maxlength="100"
          rows="5"
          cols="20"
          placeholder="Write your line here..."
        ></textarea>
        <button>DONE</button>`;
    block.setAttribute("class", "form-cont");
    resolve(block, count);
    Draggable.create(block.querySelector(".form-cont"), {
      trigger: `.form-cont > .form > dragme${count}`,
      zIndexBoost: false,
    });

    document.querySelector("#dis-cont").appendChild(block);
  });
}

bucket.addEventListener("click", (event) => {
  parags.querySelector(`#${event.target.textContent}`).innerHTML = "";
});
