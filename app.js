let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let btnCount = 0;

const resetGame = () => {
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
};

//DOM manipulation
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (btnCount !== 9) {
            if (turnO) {
                box.innerText = "0";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
        }
        box.disabled = true;
        btnCount++;

        let isWinner = checkWinner();
        if (btnCount === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `This Game is Draw. Try again`;
    msgContainer.classList.remove("hide");
    disableBox();
};

const disableBox = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const enableBox = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();
};



const checkWinner = () => {
    for (let pattern of winPatterns) {

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);