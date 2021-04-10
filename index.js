const playerName = [];
playerName.push(prompt("Enter the name of Player-1"));
playerName.push(prompt("Enter the name of Player-2"));
const newNum = Math.floor(Math.random() * 100);
if (newNum % 2 === 1) {
    alert(playerName[0] + " -> Cross & " + playerName[1] + " -> Circle \n Player with cross plays first \n Click on the cell to make your move.");
} else {
    alert(playerName[1] + " -> Cross & " + playerName[0] + " -> Circle \n Player with cross plays first \n Click on the cell to make your move.");
}

let player1Wins = 0, player2Wins = 0, roundNo = 1;
let player1 = [];
let player2 = [];
let numOfClicks = 0;

respondCellClicks();

function respondCellClicks() {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
        cell.addEventListener("click", function () {
            const cellNo = this.classList[1];
            numOfClicks++;
            this.innerHTML = generateSignAndPush(numOfClicks, cellNo);
            setTimeout(() => {
                if (checkForGameEnd(player1)) {
                    player1Wins++;
                    roundNo++
                    nextRound(roundNo);
                } else if (checkForGameEnd(player2)) {
                    player2Wins++;
                    roundNo++
                    nextRound(roundNo);
                } else if (numOfClicks === 9) {
                    player1Wins++;
                    player2Wins++;
                    roundNo++;
                    nextRound(roundNo);
                }
            }, 1000);

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
    document.querySelector("h1").innerHTML= "Tic-Tac-Toe";
    let winner = "";
    if (player1Wins > player2Wins) {
        winner = playerName[0];
    } else if (player1Wins < player2Wins) {
        winner = playerName[1];
    } else {
        handleDraw();
    }
    document.querySelector("h2").innerHTML = '<i class="fas fa-trophy fa"></i>' + winner + " wins";
    // document.querySelector("p").innerHTML = arr.length + " Moves Made";
    // document.querySelector(".btn").style.display = "block";
}

function handleDraw() {
    document.querySelector("table").style.display = "none";
    document.querySelector("h2").innerHTML = "Draw!!!";
    // document.querySelector("p").innerHTML = playerName[0] + " Made " + player1.length + " moves <br> " + playerName[1] + " Made " + player2.length + " moves";
    // document.querySelector(".btn").style.display = "block";
}

function nextRound(roundNo) {
    if (roundNo <= 3) {
        document.querySelector("h1").innerHTML= "Tic-Tac-Toe (Round-"+roundNo+")";
        document.querySelectorAll("td").forEach(tableData => {
            tableData.innerHTML = ""
        })
        document.querySelector("table").style.removeProperty("display");
        numOfClicks = 0;
        player1 = [];
        player2 = [];
    } else {
        displayWinner();
    }

}

function score() {

}