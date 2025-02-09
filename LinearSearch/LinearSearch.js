function startSearching() {
    let myGift = checkValidInput();
    if (myGift === 1) {
        alert("Kindly fill both the required fields");
        return;
    } else if (myGift === 2) {
        alert("Oops! you forgot the array, please fill it");
        return;
    } else if (myGift === 3) {
        alert("Oops! you forgot the key, please fill it");
        return;
    }

    let inputArray = document.getElementsByClassName("array")[0].value;
    let mainarr = inputArray.split(" ").map(num => parseInt(num, 10));
    displayResult('');
    displayComparisons(0);
    displayArray(mainarr);
    searcharr(mainarr);
}

async function searcharr(mainarr) {
    let k = parseInt(document.querySelector(".key").value, 10);
    let boxes = document.querySelectorAll(".box");
    let comparisons = 0;
    let found = false;

    for (let i = 0; i < boxes.length; i++) {
        comparisons++;
        displayComparisons(comparisons);
        await new Promise (resolve => setTimeout(resolve,1000));
        if (parseInt(boxes[i].textContent) === k) {
            found = true;
            await animateFound(boxes[i], k, i + 1);
            break;
        }
        else{
            await animatenotFound(boxes[i],k,i+1);
        }
    }

    if (!found) {
        displayResult(`Element ${k} not found in the array.`, "red");
    }
}

function animateFound(box, k, position) {
    return new Promise(resolve => {
        box.style.transition = "transform 0.5s ease, background-color 1.0s ease";
        box.style.transform = "scale(1.5)";
        box.style.backgroundColor = "green";
        setTimeout(() => {
            displayResult(`Element ${k} found at position ${position}.`, "green");
            box.style.transform = "scale(1.0)";
            resolve();
        }, 2000);
    });
}

function animatenotFound(box, k, position) {
    return new Promise(resolve => {
        box.style.transition = "transform 0.5s ease, background-color 1.0s ease";
        box.style.transform = "scale(1.2)";
        box.style.backgroundColor = "red";
        setTimeout(() => {
            // displayResult(`Element ${k} found at position ${position}.`, "green");
            box.style.transform = "scale(1.0)";
            resolve();
        }, 2000);
    });
}


function checkValidInput() {
    let myItms = document.getElementById('utensil').value;
    let myKey = document.getElementById('value').value;

    if (myItms.length === 0 && myKey.length === 0) {
        return 1;
    }
    if (myItms.length === 0) {
        return 2;
    } else if (myKey.length === 0) {
        return 3;
    }
}

function displayArray(arr) {
    let showDiv = document.querySelector(".show");
    showDiv.innerHTML = "";
    arr.forEach(function (i) {
        let box = document.createElement('div');
        box.className = 'box';
        box.style.display = "flex";
        box.className = 'box';
        box.style.height = '8vh';
        box.style.width = '6vw';
        box.style.border = "3px solid white";
        box.style.backgroundColor = "black";
        box.style.color = "white";
        box.style.justifyContent = "center";
        box.style.alignItems = "center";
        box.style.fontSize = "100%";
        box.textContent = i;
        showDiv.appendChild(box);
    });
}

async function displayResult(message, color = "white") {
    let resultDiv = document.createElement('div');
    resultDiv.className = "result";
    resultDiv.style.color = color;
    resultDiv.textContent = message;
    document.querySelector(".comparisons").appendChild(resultDiv);
}

async function displayComparisons(count) {
    let comparisonsDiv = document.querySelector(".comparisons");
    comparisonsDiv.textContent = `Total Comparisons: ${count}`;
}
