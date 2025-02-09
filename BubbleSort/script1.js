async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function visualizeBubbleSort() {
  const arrayInput = document.getElementById("arrayInput").value;
  const array = arrayInput.split(" ");
  let cont = document.getElementById("array-container");
  let arrayStateContainer = document.getElementById("array-state-container");
  cont.innerHTML = '';
  arrayStateContainer.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    array[i] = parseInt(array[i], 10);
  }


  // console.log(typeof array[0]); debugging
  let iarray = [...array];
  for (let i = 0; i < array.length; i++) {
    let box = document.createElement("div");
    box.style.display = "flex";
    box.className = "array-bar";
    box.style.width = "80px";
    box.classList.add("array-bar");
    box.style.height = `80px`;
    box.innerHTML = `${array[i]}`;
    box.style.color = "white";
    box.style.backgroundColor = "black";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.border = "2px solid white";
    cont.appendChild(box);
  }
  // arrayStateContainer.innerHTML="Initial Array: ";
  for (let i = 0; i < iarray.length; i++) {
    let boxi = document.createElement("div");
    boxi.style.display = "flex";
    boxi.className = "array-bar1";
    boxi.style.width = "80px";
    boxi.classList.add("array-bar1");
    boxi.style.height = `80px`;
    boxi.innerHTML = `${iarray[i]}`;
    boxi.style.color = "white";
    boxi.style.backgroundColor = "black";
    boxi.style.alignItems = "center";
    boxi.style.justifyContent = "center";
    boxi.style.border = "2px solid white";
    arrayStateContainer.appendChild(boxi);
  }
  // arrayStateContainer.innerHTML = "Initial Array State: " + array; 

  bubbleSortAnimation(array);
}
async function swapBars(bar1, bar2, value1, value2, i, j, time) {
  return new Promise(resolve => {
    // Swap the bars with a transition of 2 seconds
    bar1.style.transition = "transform 2s";
    bar2.style.transition = "transform 2s";

    // Scale the bars
    //   bar1.style.transform = "scale(1.2)";
    //   bar1.style.transform = "scale(1.2)";
    bar1.style.transform = "translate(80px)";
    bar2.style.transform = "translate(-80px)";

    // Wait for the transition to complete
    setTimeout(() => {
      // Swap values in the bars
      bar1.innerHTML = value2;
      bar2.innerHTML = value1;

      // Reset the style and transition properties
      bar1.style.transform = "scale(1.0)";
      bar2.style.transform = "scale(1.0)";
      bar1.style.transition = "none";
      bar2.style.transition = "none";
      document.querySelector(".c").innerHTML = ``;
      resolve(); // Resolve the promise
    }, time); // 2000 milliseconds = 2 seconds
  });

}
//Actual Sorting:
// Add a new HTML element to display the current line of code
const codeExecutionContainer = document.querySelector(".c");

async function bubbleSortAnimation(array) {
  let ite = 1;
  let com = 0;
  const bars = document.querySelectorAll(".array-bar");
  let t1 = document.querySelector("#time").value;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      // Highlight bars being compared
      bars[j].style.backgroundColor = "#e74c3c";
      bars[j + 1].style.backgroundColor = "#e74c3c";

      // Update the displayed code line
      codeExecutionContainer.innerHTML = `Comparing elements at indices ${j} and ${j + 1}`;

      // Wait for a short duration to visualize the comparison
      await sleep(1000);

      if (array[j] > array[j + 1]) {
        codeExecutionContainer.innerHTML = `Swapping elements at indices ${j} and ${j + 1}`;
        // Wait for a short duration to visualize the comparison
        await sleep(500);
        // Swap bars[j] and bars[j+1] with a promise
        await swapBars(bars[j], bars[j + 1], array[j], array[j + 1], i, j, t1);

        // Swap values in the array
        const temp1 = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp1;

        // Highlight the swapped bars
        bars[j].style.backgroundColor = "#e78c3c";
        bars[j + 1].style.backgroundColor = "#e78c3c";

        // Update the displayed code line
      }
      else {
        await sleep(1000);
        bars[j].style.backgroundColor = "#e78c3c";
        bars[j + 1].style.backgroundColor = "#e78c3c";

        // Update the displayed code line
        codeExecutionContainer.innerHTML = `No swapping needed for elements at indices ${j} and ${j + 1}`;
      }

      await sleep(1000);
      // Reset the color and scale of the bars
      bars[j].style.backgroundColor = "#3498db";
      bars[j + 1].style.backgroundColor = "#3498db";
      com += 1;
    }
    ite += 1;
  }

  // Highlight the sorted array
  bars.forEach((bar) => (bar.style.backgroundColor = "#2ecc71"));
  document.querySelector(".c").innerHTML = `1. Total iterations required were ${ite} <br>
        2. Total Comparisons made were ${com} <br>
        3.The Time Complexity for Bubble Sort is O(n^2). `;
}

