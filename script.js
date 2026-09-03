let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let acceptingInput = false;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 350);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 350);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;


    let rnd = Math.floor(Math.random() * btns.length);
    let rndmColor = btns[rnd];
    gameSeq.push(rndmColor);

   
    acceptingInput = false;
    let i = 0;
    let interval = setInterval(function () {
        let btn = document.querySelector(`.${gameSeq[i]}`);
        gameFlash(btn);
        i++;
        if (i >= gameSeq.length) {
            clearInterval(interval);
            acceptingInput = true; 
        }
    }, 350);
}

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            console.log("same value");
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = "Game Over! Press any key to restart";
        reset();
    }
}

function btnPress() {
    if (!acceptingInput) return; 

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userColor);

    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    acceptingInput = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}