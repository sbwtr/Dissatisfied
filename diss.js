const disCont = document.querySelector("#dis-cont");
const form = document.querySelector(".form");
const parags = document.querySelector("#parags");

class storeNotePos {
  static noteXPos;
  static noteYPos;
  static getValues() {
    return { x: this.noteXPos, y: this.noteYPos };
  }
}

document.body.addEventListener("click", (event) => {
  if (event.ctrlKey && disCont.classList.contains("hide-cont")) {
    storeNotePos.noteXPos = event.clientX;
    storeNotePos.noteYPos = event.clientY;
    disCont.style.top = `${event.clientY}px`;
    disCont.style.left = `${event.clientX}px`;
    disCont.classList.remove("hide-cont");
  }
});

form.querySelector("button").addEventListener("click", () => {
  addParag(
    storeNotePos.getValues().x,
    storeNotePos.getValues().y,
    form.querySelector("textarea").value
  );
});

function addParag(x, y, value) {
  const note = document.createElement("p");
  note.setAttribute("class", "note");
  note.style.top = `${y}px`;
  note.style.left = `${x}px`;
  note.textContent = value;
  parags.appendChild(note);
  Draggable.create(".note");
  disCont.classList.add("hide-cont");
}
