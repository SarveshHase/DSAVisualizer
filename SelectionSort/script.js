async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  async function visualizeSelectionSort() {
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
  
    selectionSortAnimation(array);
  }
  
  function createArrayBar(container, value, className = "array-bar") {
    let box = document.createElement("div");
    box.style.display = "flex";
    box.className = className;
    box.style.width = "80px";
    box.style.height = "80px";
    box.innerHTML = value;
    box.style.color = "white";
    box.style.backgroundColor = "black";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.border = "2px solid white";
    container.appendChild(box);
  }
  
  async function selectionSortAnimation(array) {
    const bars = document.querySelectorAll(".array-bar");
    const codeExecutionContainer = document.querySelector(".c");
    let t1 = parseInt(document.querySelector("#time").value);
    let comparisons = 0;
  
    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;
      bars[i].style.backgroundColor = "#e74c3c"; // Current position
      codeExecutionContainer.innerHTML = `Finding minimum element for position ${i}`;
      await sleep(t1);
  
      for (let j = i + 1; j < array.length; j++) {
        bars[j].style.backgroundColor = "#e78c3c"; // Current comparison
        codeExecutionContainer.innerHTML = `Comparing ${array[j]} with current minimum ${array[minIdx]}`;
        await sleep(t1 / 2);
  
        comparisons++;
        if (array[j] < array[minIdx]) {
          if (minIdx !== i) {
            bars[minIdx].style.backgroundColor = "black"; // Reset previous min
          }
          minIdx = j;
          bars[minIdx].style.backgroundColor = "#3498db"; // New minimum
        } else {
          bars[j].style.backgroundColor = "black"; // Reset if not minimum
        }
        await sleep(t1 / 2);
      }
  
      if (minIdx !== i) {
        codeExecutionContainer.innerHTML = `Swapping ${array[i]} and ${array[minIdx]}`;
        await swapBars(bars[i], bars[minIdx], array[i], array[minIdx], t1);
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
      }
  
      bars[i].style.backgroundColor = "#2ecc71"; // Sorted
      await sleep(t1);
    }
  
    // Mark the last element as sorted
    bars[array.length - 1].style.backgroundColor = "#2ecc71";
  
    codeExecutionContainer.innerHTML = `Sorting completed!<br>
      Total comparisons: ${comparisons}<br>
      Time Complexity: O(n^2) in all cases`;
  }
  
  async function swapBars(bar1, bar2, value1, value2, time) {
    return new Promise(resolve => {
      bar1.style.transition = `transform ${time / 1000}s`;
      bar2.style.transition = `transform ${time / 1000}s`;
  
      bar1.style.transform = "translateY(80px)";
      bar2.style.transform = "translateY(-80px)";
  
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