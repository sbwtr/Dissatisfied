const disCont = document.querySelector("#dis-cont");
const form = document.querySelector(".form");
const objects = document.querySelector("#objects");
const photoCont = document.querySelector("#photo-display");
const photo = document.querySelectorAll(".photo");
const bucket = document.querySelector("#bucket");
const userHelp = document.querySelector("#user-help");
const removeHelp = document.querySelector("#remove");
const helpData = {
  intro:
    "ctrlClick to add paragraph or altClick to add picture. drag to position anywhere. click on element and then on bucket to remove",
};
class storePos {
  static XPos;
  static YPos;
}
class Erase {
  static object;
}

//--------------------------------------

userHelp.textContent = helpData.intro;
removeHelp.addEventListener("click", () => {
  document.querySelector(".help-cont").remove();
});
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
    buildObject(
      storePos.XPos,
      storePos.YPos,
      form.querySelector("textarea").value,
      "note"
    );
});

photo.forEach((ph) => {
  ph.addEventListener("click", () => {
    buildObject(
      storePos.XPos,
      storePos.YPos,
      ph.querySelector("img").src,
      "picture"
    );
  });
});

function buildObject(x, y, value, type) {
  let obj;
  switch (type) {
    case "note":
      disCont.classList.add("hide-cont");
      obj = document.createElement("p");
      obj.textContent = value;
      break;
    case "picture":
      photoCont.classList.add("hide-cont");
      obj = document.createElement("div");
      obj.innerHTML = `<img src=${value} alt="" />`;
      break;
    default:
      break;
  }
  obj.setAttribute("class", type);
  obj.style.top = `${y}px`;
  obj.style.left = `${x}px`;
  Draggable.create(obj, {
    onClick: function () {
      Erase.object = this.target;
    },
  });
  objects.appendChild(obj);
}
document.querySelector("#save").addEventListener("click", () => {
  document.querySelectorAll(".picture").forEach((p) => {
    console.log({
      x: Math.floor(p.getBoundingClientRect().x),
      y: Math.floor(p.getBoundingClientRect().y),
      value: p.firstChild.currentSrc,
      type: p.getAttribute("class"),
    });
  });
  document.querySelectorAll(".note").forEach((n) => {
    console.log({
      x: Math.floor(n.getBoundingClientRect().x),
      y: Math.floor(n.getBoundingClientRect().y),
      value: n.textContent,
      type: n.getAttribute("class"),
    });
  });
});
