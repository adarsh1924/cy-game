const playerName = [];
playerName.push(prompt("Enter the name of Player-1"));
playerName.push(prompt("Enter the name of Player-2"));
const newNum = Math.floor(Math.random() * 100);
if (newNum % 2 === 1) {
    alert(playerName[0] + " -> Cross & " + playerName[1] + " -> Circle \n Player with cross plays first \n Click on the cell to make your move.");
} else {
    alert(playerName[1] + " -> Cross & " + playerName[0] + " -> Circle \n Player with cross plays first \n Click on the cell to make your move.");
}
//Assuming player1 chooses cross and player2 chooses circle
const player1 = [];
const player2 = [];
let num = 0;

//respondCellClicks responds to the cell clicks and using generateSignAndPush it generates the sign as well as keep a record of the cell no. being selected by players. Finally with every clicks it checks for game end.

respondCellClicks();

function respondCellClicks() {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
        cell.addEventListener("click", function () {
            const cellNo = this.classList[1];
            num++;
            this.innerHTML = generateSignAndPush(num, cellNo);
            if (checkForGameEnd(player1)) {
                displayWinner(player1, 0)
            } else if(checkForGameEnd(player2)) {
                displayWinner(player2, 1)
            } else if(num===9) {
                handleDraw();
            }
        });
    });
}

function generateSignAndPush(input, cellNo) {
    if (input % 2 === 0) {
        (newNum % 2 === 1) ? player2.push(cellNo) : player1.push(cellNo)
        return '<i class="far fa-circle fa-4x"></i>'
    } else {
        (newNum % 2 === 1) ? player1.push(cellNo) : player2.push(cellNo)
        return '<i class="fas fa-times fa-5x"></i>'
    }
}

function checkForGameEnd(array) {
    const rowIndex = array.map(function (element) {
        return element.substring(1, 2);
    })
    const colIndex = array.map(function (element) {
        return element.substring(2, 3);
    })
    const rowMatch = [], colMatch = [];
    for (let i = 0; i < 3; i++) {
        rowMatch.push(rowIndex.filter(function (element) {
            return element === i.toString()
        }))
        colMatch.push(colIndex.filter(function (element) {
            return element === i.toString()
        }))
    }
    const diagMatch = (array.includes("a00") && array.includes("a11") && array.includes("a22")) || (array.includes("a02") && array.includes("a11") && array.includes("a20"));
    for (let i = 0; i < 3; i++) {
        if (rowMatch[i].length === 3 || colMatch[i].length === 3 || diagMatch) {
            return true;
        }
    }

}

function playSound(name) {
    var myAudio = new Audio("sounds/" + name + ".mp3");
    myAudio.play();
}

function displayWinner(arr, number) {
    document.querySelector("table").style.display = "none";
    document.querySelector("h2").innerHTML = '<i class="fas fa-trophy fa"></i>' + playerName[number] + " wins";
    document.querySelector("p").innerHTML = arr.length + " Moves Made";
    document.querySelector(".btn").style.display = "block";
}

function handleDraw() {
    document.querySelector("table").style.display = "none";
    document.querySelector("h2").innerHTML = "Draw!!!";
    document.querySelector("p").innerHTML = playerName[0] + " Made " + player1.length + " moves <br> " + playerName[1] + " Made " + player2.length + " moves" ;
    document.querySelector(".btn").style.display = "block";
}