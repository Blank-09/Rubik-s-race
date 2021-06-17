const gameBoard = document.querySelector(".game-board");
const colors = ["white", "yellow", "blue", "green", "red", "orange"];

var content = "";

for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 4; j++)
    content += `<div class="cell"><div class="small ${colors[i]}" id="${
      i * 5 + (j + 1)
    }"></div></div>`;

  if (i == 4) {
    content += `<div class="cell"><div class="small" id="${
      i * 5 + (j + 1)
    }"></div></div>`;
    continue;
  }
  content += `<div class="cell"><div class="small ${colors[5]}" id="${
    i * 5 + (j + 1)
  }"></div></div>`;
}

gameBoard.innerHTML = content;

const cells = gameBoard.querySelectorAll(".cell");
const smallCells = gameBoard.querySelectorAll(".small");

smallCells.forEach((cell) => {
  cell.onclick = () => {
    clickMove(cell);
  };
  cell.addEventListener("dragstart", () => {
    cell.classList.add("dragging");
  });

  cell.addEventListener("dragend", () => {
    setDrag(false);
    gameBoard.querySelector(".dragging").classList.remove("dragging");
    checkForWin();
    setDrag(true);
  });
});

cells.forEach((cell) => {
  cell.addEventListener("dragover", () => {
    const draggable = gameBoard.querySelector(".dragging");
    var cls = cell.querySelector(".small");
    if (cls.className.length < 6) {
      var temp = draggable.className;
      draggable.className = "small";
      cls.className = temp;
    }
  });
});

gameBoard.addEventListener("dragover", (e) => {
  e.preventDefault();
});

const randomizer = document.querySelector(".randomizer");
const randomizeCells = randomizer.querySelectorAll(".cell");

function randomColor() {
  return colors[Math.floor(Math.random() * 6)];
}

function randomize() {
  randomizeCells.forEach((cell) => {
    cell.className = `cell ${randomColor()}`;
  });
  checkRepeatMoreThan4();
}

var gameArr = [];

for (var i = 0; i < 5; i++) {
  var temp = [];
  for (var j = 0; j < 5; j++) temp.push(smallCells[i * 5 + j]);
  gameArr.push(temp);
}

var arr = [];
for (var i = 1; i <= 3; i++)
  for (var j = 1; j <= 3; j++) arr.push(smallCells[i * 5 + j]);

function tileAllMatches() {
  for (var i = 0; i < 9; i++) {
    var temp = randomizeCells[i].className.split(" ")[1];
    if (!arr[i].classList.contains(temp)) return false;
  }
  return true;
}

function checkForWin() {
  if (tileAllMatches()) {
    document.querySelector(".lid").classList.toggle("active");
    setTimeout(() => {
      arr.forEach((item) => {
        item.parentElement.style.zIndex = 5;
      });
    }, 2500);
  }
}

function checkPosition() {
  var x, y; // x = array, y = sub-array
  for (var i = 0; i < 5; i++)
    for (var j = 0; j < 5; j++)
      if (gameArr[i][j].className.length <= 5) {
        (x = i), (y = j);
        break;
      }
  return { x: x, y: y };
}

let x, y;

function setDrag(bool) {
  if (bool) {
    var temp = checkPosition();
    x = temp.x;
    y = temp.y;
  }
  if (x != 0) toggleClass(x - 1, y, bool);
  if (x != 4) toggleClass(x + 1, y, bool);
  if (y != 0) toggleClass(x, y - 1, bool);
  if (y != 4) toggleClass(x, y + 1, bool);
}

function toggleClass(x, y, bool) {
  gameArr[x][y].setAttribute("draggable", bool);
  if (bool) gameArr[x][y].classList.add("move");
  else gameArr[x][y].classList.remove("move");
}

function clickMove(el) {
  var p = {
    x: Math.floor((el.id - 1) / 5),
    y: Math.floor((el.id - 1) % 5),
  };

  if (p.x != 0 && gameArr[p.x - 1][p.y].className.length <= 5) move(el);
  if (p.x != 4 && gameArr[p.x + 1][p.y].className.length <= 5) move(el);
  if (p.y != 0 && gameArr[p.x][p.y - 1].className.length <= 5) move(el);
  if (p.y != 4 && gameArr[p.x][p.y + 1].className.length <= 5) move(el);

  checkForWin();
}

function move(el) {
  setDrag(false);
  var temp = el.className;
  el.className = "small";
  gameArr[x][y].className = temp;
  setDrag(true);
}

function checkRepeatMoreThan4() {
  colors.forEach((color) => {
    var i = 0;
    randomizeCells.forEach((item) => {
      if (item.classList.contains(color)) i++;
    });
    if (i > 4) randomize();
  });
}

function spin() {
  const refresh = gsap.timeline({ defaults: { duration: 0.5 } });
  refresh
    .to("svg.fa-redo-alt", { rotate: "720deg" })
    .to("svg.fa-redo-alt", { rotate: "0deg", duration: 0 });
}

document.querySelector("svg.fa-redo-alt").onclick = () => {
  spin();
  randomize();
};

document.body.onload = () => {
  console.log("Body is been loaded...");
  setDrag(true);
  randomize();
};
