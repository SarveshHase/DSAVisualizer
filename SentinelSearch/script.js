async function startSearching() {
    let inputValid = checkValidInput();
    if (inputValid !== true) {
        alert(inputValid);
        return;
    }

    let inputArray = document.getElementById("array").value;
    let mainarr = inputArray.split(" ").map(num => parseInt(num, 10));
    let key = parseInt(document.getElementById("key").value, 10);

    clearPreviousResults();
    displayArray(mainarr);
    await sentinelSearch(mainarr, key);
}

function displayArray(arr) {
    let showDiv = document.querySelector(".show");
    showDiv.innerHTML = "";
    arr.forEach(function (i, index) {
        let box = document.createElement('div');
        box.className = 'box';
        box.textContent = i;
        box.id = `box-${index}`;
        showDiv.appendChild(box);
    });
}

async function sentinelSearch(arr, key) {
    let n = arr.length;
    let last = arr[n - 1];
    
    // Display step: Show original array
    await displaySteps("Original array:");
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Modify the last element and show the change
    arr[n - 1] = key;
    await displaySteps(`Adding sentinel: Replacing last element (${last}) with search key (${key})`);
    await updateArrayDisplay(arr, n - 1, 'cyan');
    await new Promise(resolve => setTimeout(resolve, 2000));

    let i = 0;
    let comparisons = 0;

    while (true) {
        comparisons++;
        await highlightBox(i, 'yellow');
        await displayComparisons(comparisons);
        await displaySteps(`Checking index ${i}: ${arr[i]}`);

        if (arr[i] === key) {
            if (i < n - 1 || key === last) {
                await highlightBox(i, 'green');
                displayResult(`Element ${key} found at index ${i}.`, "green");
            } else {
                displayResult(`Element ${key} not found in the array.`, "red");
            }
            // Restore the original last element
            arr[n - 1] = last;
            await displaySteps("Restoring the original last element:");
            await updateArrayDisplay(arr, n - 1, 'white');
            break;
        }
        i++;
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

async function updateArrayDisplay(arr, changedIndex, color) {
    arr.forEach((value, index) => {
        let box = document.getElementById(`box-${index}`);
        box.textContent = value;
        if (index === changedIndex) {
            box.style.backgroundColor = color;
            box.style.color = (color === 'cyan') ? 'black' : 'white';
        }
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function highlightBox(index, color) {
    let box = document.getElementById(`box-${index}`);
    if (box) {
        box.style.transition = "background-color 0.5s ease";
        box.style.backgroundColor = color;
        box.style.color = (color === 'yellow' || color === 'green') ? 'black' : 'white';
        await new Promise(resolve => setTimeout(resolve, 500));
        if (color !== 'green') {
            box.style.backgroundColor = "black";
            box.style.color = "white";
        }
    }
}

function displayResult(message, color = "white") {
    let resultDiv = document.querySelector(".final");
    resultDiv.style.color = color;
    resultDiv.textContent = message;
}

async function displayComparisons(count) {
    let comparisonsDiv = document.querySelector(".comparisons");
    comparisonsDiv.textContent = `Total Comparisons: ${count}`;
}

async function displaySteps(step) {
    let stepsDiv = document.querySelector(".steps");
    stepsDiv.textContent = step;
    await new Promise(resolve => setTimeout(resolve, 500));
}

function checkValidInput() {
    let arrayInput = document.getElementById('array').value;
    let keyInput = document.getElementById('key').value;

    if (arrayInput.trim().length === 0 && keyInput.trim().length === 0) {
        return "Kindly fill both the required fields";
    }
    if (arrayInput.trim().length === 0) {
        return "Oops! you forgot the array, please fill it";
    }
    if (keyInput.trim().length === 0) {
        return "Oops! you forgot the key, please fill it";
    }
    return true;
}

function clearPreviousResults() {
    document.querySelector(".steps").textContent = '';
    document.querySelector(".final").textContent = '';
    document.querySelector(".comparisons").textContent = '';
}