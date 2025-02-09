// BinarySearch.js
async function startSearching() {
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
    var mainarr = inputArray.split(" ").map(num => parseInt(num, 10));
    mainarr.sort((a, b) => a - b); // Sorting the array
    displayResult('');
    displayComparisons(0);
    displayArray(mainarr);
    searcharr(mainarr);
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

async function searcharr(mainarr) {
    let comparisons = 0;

    var k = parseInt(document.querySelector(".key").value, 10);
    // let ans;
    let ans = await binarySearch(0, mainarr.length - 1);


    // console.log("Ans = "+ ans);
    if (ans == -1) {
        console.log("Ans = " + ans);
        displayResult(`Element ${k} is not present in the array.`, "red");
    }

    async function binarySearch(low, high) {
        return new Promise(resolve => {
            let ans = -1;

            async function search(low, high) {
                if (low <= high) {
                    comparisons++;
                    await displayComparisons(comparisons);
                    let mid = Math.floor((low + high) / 2);
                    await displayMid(mid);
                    let box = document.querySelectorAll(".box")[mid];
                    await updateBox(box);

                    if (k === parseInt(box.textContent, 10)) {
                        ans = mid;
                        resolve(ans);
                    } else if (k < parseInt(box.textContent, 10)) {
                        await search(low, mid - 1);
                    } else {
                        await search(mid + 1, high);
                    }
                } else {
                    resolve(ans);
                }
            }

            search(low, high);
        });
    }

    async function updateBox(box) {
        let value = parseInt(box.textContent, 10);

        if (k === value) {
            box.style.transition = "transform 0.5s ease, background-color 1.0s ease";
            box.style.transform = "scale(1.5)";
            box.style.backgroundColor = "green";
            await new Promise(resolve => setTimeout(resolve, 2000));
            displayResult(`Element ${k} found successfully .`,"green");
            box.style.transform = "scale(1.0)";
        } else {
            box.style.transition = "transform 0.5s ease, background-color 1.0s ease";
            box.style.transform = "scale(1.2)";
            box.style.backgroundColor = "red";
            box.style.color = "white";

            await new Promise(resolve => setTimeout(resolve, 2000));
            box.style.transform = "scale(1.0)";
        }
    }


}

async function displayResult(message,color = "white") {
    let resultDiv = document.createElement('div');
    resultDiv.textContent = '';
    await new Promise(resolve => setTimeout(resolve, 1000));
    resultDiv.className = "result";
    resultDiv.style.color = color;
    resultDiv.textContent = message;
    document.querySelector(".final").appendChild(resultDiv);
}

async function displayComparisons(count) {
    let comparisonsDiv = document.querySelector(".comparisons");
    comparisonsDiv.textContent = '';
    await new Promise(resolve => setTimeout(resolve, 1000));
    comparisonsDiv.textContent = `Total Comparisons: ${count}`;
}

async function displayMid(mid) {
    let midDiv = document.querySelector(".showmid");
    midDiv.textContent = '';
    await new Promise(resolve => setTimeout(resolve, 1000));
    midDiv.textContent = `Mid: ${mid}`;
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
