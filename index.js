
const myArray = document.querySelectorAll("td");


const cross = [];
const circle = [];
let noOfTableClicks = 0;

myArray.forEach((tableData) => {
    tableData.addEventListener("click", function () {
        let cellNo = this.classList[1];
        noOfTableClicks++;
        this.innerHTML = handleClick(noOfTableClicks, cellNo);
        let display = document.querySelector("h2");
        if (checkIfSomeoneWins(cross)) {
            playSound("win")
            display.innerHTML = "cross wins";
        } else if (checkIfSomeoneWins(circle)) {
            playSound("win")
            display.innerHTML = "circle wins";
        } else if (noOfTableClicks === 9) {
            display.innerHTML = "Match Draw";
        }
    })
});

function handleClick(num, cellNo) {
    if (num % 2 === 1) {
        cross.push(cellNo);
        playSound("cross");
        return '<i class="fas fa-times fa-5x"></i>'
    } else {
        circle.push(cellNo);
        playSound("circle");
        return '<i class="far fa-circle fa-4x"></i>'
    }
}

function playSound(name) {
    var myAudio = new Audio("sounds/" + name + ".mp3");
    myAudio.play();
}

function checkIfSomeoneWins(anArray) {
    if (horizontalMatch(anArray) || verticalMatch(anArray) || diagonalMatch(anArray)) {
        return true;
    }
}

function horizontalMatch(anArray) {

    const newArray = anArray.map(function (element) {
        return element.substring(1, 2)
    });

    const newArray0 = newArray.filter(function (element) {
        return element === "0"
    });

    const newArray1 = newArray.filter(function (element) {
        return element === "1"
    });

    const newArray2 = newArray.filter(function (element) {
        return element === "2"
    });

    if (newArray0.length === 3 || newArray1.length === 3 || newArray2.length === 3) {
        return true;
    }

}

function verticalMatch(anArray) {
    const newArray = anArray.map(function (element) {
        return element.substring(2, 3)
    });

    const newArray0 = newArray.filter(function (element) {
        return element === "0"
    });

    const newArray1 = newArray.filter(function (element) {
        return element === "1"
    });

    const newArray2 = newArray.filter(function (element) {
        return element === "2"
    });

    if (newArray0.length === 3 || newArray1.length === 3 || newArray2.length === 3) {
        return true;
    }
}

function diagonalMatch(anArray) {
    const newArray = anArray.map(function (element) {
        return element.substring(1, 3)
    });

    const firstDiag = newArray.includes("00") && newArray.includes("11") && newArray.includes("22")

    const secondDiag = newArray.includes("02") && newArray.includes("11") && newArray.includes("20")

    if (firstDiag || secondDiag) {
        return true;
    }
}


