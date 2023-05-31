let numberString = "";
let secretCodeString = "";
const bombScreen = document.getElementById('screen');
let lastActive = undefined;

function updateScreen() {
  bombScreen.textContent = numberString;
}

function addNumber(number) {
  numberString += number;
  updateScreen();
}

function removeLastNumber() {
  numberString = numberString.slice(0, -1);
  updateScreen();
}

function checkCode() {
  if (numberString === secretCodeString) {
    bombScreen.textContent = "Success";
    bombScreen.style.color = "green";
  }
}

const riddles = {
  easy: {
    1: "i = 2<br>return i / 2",
    2: "i = 3<br>return i - 1",
    3: "i = 2<br>return i + 1",
    4: "i = 2<br>return i * 2",
    5: "i = 10<br>return i - 10 + 5",
    6: "i = 18<br>return i // 3",
    7: "i = 28<br>return i / 6 + 1.4",
    8: "i = 56<br>return i / 7",
    9: "i = 4.5<br>return i * 2",
    0: "i = 5<br>return i - i",
  },
  medium: {

  },
  hard: {

  }
};

function randomChoice(dictionary) {
  const keys = Object.keys(dictionary);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const randomValue = dictionary[randomKey];
  return [randomKey, randomValue];
}



const acc = document.getElementsByClassName("show-riddle");
var self = undefined;

for (let i = 0; i < acc.length; i++) {
  const riddle = randomChoice(riddles.easy);
  secretCodeString += riddle[0];
  delete riddles.easy[riddle[0]];
  acc[i].nextElementSibling.innerHTML = riddle[1];
  acc[i].addEventListener("click", function () {
    if (lastActive && lastActive !== this) {
      lastActive.classList.toggle("active");
      lastActive.nextElementSibling.style.display = "none";
      lastActive.lastElementChild.textContent = "+";
    }

    this.classList.toggle("active");
    self = this;
    this.lastElementChild.style.opacity = 0;
    setTimeout(function(){ 
        self.lastElementChild.textContent = (self.lastElementChild.textContent === "+") ? "-" : "+";
        self.lastElementChild.style.opacity = 1;
    },500);
    const panel = this.nextElementSibling;
    panel.style.display = (panel.style.display === "block") ? "none" : "block";

    lastActive = (lastActive === this) ? undefined : this;
  });
}