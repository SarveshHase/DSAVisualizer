async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function visualizeInsertionSort() {
  const arrayInput = document.getElementById("arrayInput").value;
  const array = arrayInput.split(" ").map(Number);
  let cont = document.getElementById("array-container");
  let arrayStateContainer = document.getElementById("array-state-container");
  cont.innerHTML = '';
  arrayStateContainer.innerHTML = '';

  // Create initial array visualization
  for (let i = 0; i < array.length; i++) {
    createArrayBar(cont, array[i]);
    createArrayBar(arrayStateContainer, array[i], "array-bar1");
  }

  insertionSortAnimation(array);
}

function createArrayBar(container, value, className = "array-bar") {
  let box = document.createElement("div");
  box.style.display = "flex";
  box.className = className;
  box.style.width = "80px";
  box.style.height = "80px";
  // box.style.backgroundColor = "red"
  box.innerHTML = value;
  box.style.color = "white";
  box.style.backgroundColor = "black";
  box.style.alignItems = "center";
  box.style.justifyContent = "center";
  box.style.border = "2px solid white";
  container.appendChild(box);
}

async function insertionSortAnimation(array) {
  const bars = document.querySelectorAll(".array-bar");
  const codeExecutionContainer = document.querySelector(".c");
  let t1 = document.querySelector("#time").value;
  let comparisons = 0;

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].style.backgroundColor = "#e74c3c";
    codeExecutionContainer.innerHTML = `Inserting element ${key} into the sorted portion`;
    await sleep(t1);

    while (j >= 0 && array[j] > key) {
      bars[j].style.backgroundColor = "#e78c3c";
      bars[j + 1].style.backgroundColor = "#e78c3c";
      
      codeExecutionContainer.innerHTML = `Comparing ${array[j]} > ${key}`;
      await sleep(t1 / 2);

      // Swap animation
      await swapBars(bars[j], bars[j + 1], array[j], key, t1);
      
      array[j + 1] = array[j];
      j--;
      comparisons++;

      bars[j + 1].style.backgroundColor = "#3498db";
      await sleep(t1 / 2);
    }

    array[j + 1] = key;
    bars[j + 1].innerHTML = key;
    bars[j + 1].style.backgroundColor = "#2ecc71";

    await sleep(t1);

    // Reset colors
    for (let k = 0; k <= i; k++) {
      bars[k].style.backgroundColor = "#3498db";
    }
  }

  // Final sorted array
  bars.forEach((bar) => (bar.style.backgroundColor = "#2ecc71"));
  codeExecutionContainer.innerHTML = `Sorting completed!<br>
    Total comparisons: ${comparisons}<br>
    Time Complexity: O(n^2) in worst and average case, O(n) in best case`;
}

async function swapBars(bar1, bar2, value1, value2, time) {
  return new Promise(resolve => {
    bar1.style.transition = `transform ${time / 1000}s`;
    bar2.style.transition = `transform ${time / 1000}s`;

    bar1.style.transform = "translateY(80px)";
    bar2.style.transform = "translateX(-80px)";

    setTimeout(() => {
      bar1.innerHTML = value2;
      bar2.innerHTML = value1;

      bar1.style.transform = "none";
      bar2.style.transform = "none";
      bar1.style.transition = "none";
      bar2.style.transition = "none";

      resolve();
    }, time);
  });
}