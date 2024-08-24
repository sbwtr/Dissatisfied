const disCont = document.querySelector("#dis-cont");
const form = document.querySelector(".form");
const objects = document.querySelector("#objects");
const photoCont = document.querySelector("#photo-display");
const photo = document.querySelectorAll(".photo");
const bucket = document.querySelector("#bucket");

class storePos {
  static XPos;
  static YPos;
  static getValues() {
    return { x: this.XPos, y: this.YPos };
  }
}
class Erase {
  static object;
}
bucket.addEventListener("click", () => {
  Erase.object.remove();
});

document.body.addEventListener("click", (event) => {
  if (event.ctrlKey && disCont.classList.contains("hide-cont")) {
    placeForm(event, disCont, true);
  }
  if (event.altKey && photoCont.classList.contains("hide-cont")) {
    placeForm(event, photoCont, false);
  }
});

function placeForm(e, domEl, isform) {
  if (isform) {
    domEl.querySelector("textarea").value = "";
  }
  storePos.XPos = e.clientX;
  storePos.YPos = e.clientY;
  domEl.style.top = `${e.clientY}px`;
  domEl.style.left = `${e.clientX}px`;
  domEl.classList.remove("hide-cont");
  domEl.style.zIndex += 1001;
}

form.querySelector("button").addEventListener("click", () => {
  if (form.querySelector("textarea").value !== "")
    addParag(
      storePos.getValues().x,
      storePos.getValues().y,
      form.querySelector("textarea").value
    );
});

photo.forEach((ph) => {
  ph.addEventListener("click", () => {
    addPict(
      storePos.getValues().x,
      storePos.getValues().y,
      ph.querySelector("img").src
    );
  });
});

function addParag(x, y, value) {
  const note = document.createElement("p");
  note.setAttribute("class", "note");
  note.style.top = `${y}px`;
  note.style.left = `${x}px`;
  note.textContent = value;
  objects.appendChild(note);
  Draggable.create(".note", {
    onClick: function () {
      Erase.object = this.target;
    },
  });
  disCont.classList.add("hide-cont");
}

function addPict(x, y, value) {
  const pict = document.createElement("div");
  pict.setAttribute("class", "picture");
  pict.innerHTML = `<img src=${value} alt="" />`;
  pict.style.top = `${y}px`;
  pict.style.left = `${x}px`;
  objects.appendChild(pict);
  Draggable.create(".picture", {
    onClick: function () {
      Erase.object = this.target;
    },
  });
  photoCont.classList.add("hide-cont");
}
