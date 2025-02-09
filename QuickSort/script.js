async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  async function visualizeQuickSort() {
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
  
    await quickSortAnimation(array, 0, array.length - 1);
  
    // Mark all elements as sorted
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#2ecc71";
      await sleep(50);
    }
  
    document.querySelector(".c").innerHTML = `Sorting completed!<br>
      Time Complexity: O(n log n) average case, O(n^2) worst case`;
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
  
  async function quickSortAnimation(array, low, high) {
    if (low < high) {
      let pi = await partition(array, low, high);
  
      await quickSortAnimation(array, low, pi - 1);
      await quickSortAnimation(array, pi + 1, high);
    }
  }
  
  async function partition(array, low, high) {
    const bars = document.querySelectorAll(".array-bar");
    const codeExecutionContainer = document.querySelector(".c");
    let t1 = parseInt(document.querySelector("#time").value);
  
    let pivot = array[high];
    bars[high].style.backgroundColor = "#e74c3c"; // Pivot
    codeExecutionContainer.innerHTML = `Choosing pivot: ${pivot}`;
    await sleep(t1);
  
    let i = low - 1;
  
    for (let j = low; j <= high - 1; j++) {
      bars[j].style.backgroundColor = "#e78c3c"; // Current element
      codeExecutionContainer.innerHTML = `Comparing ${array[j]} with pivot ${pivot}`;
      await sleep(t1 / 2);
  
      if (array[j] < pivot) {
        i++;
        codeExecutionContainer.innerHTML = `Swapping ${array[i]} and ${array[j]}`;
        await swapBars(bars[i], bars[j], array[i], array[j], t1);
        [array[i], array[j]] = [array[j], array[i]];
      }
  
      bars[j].style.backgroundColor = "black";
      await sleep(t1 / 2);
    }
  
    codeExecutionContainer.innerHTML = `Placing pivot ${pivot} in its correct position`;
    await swapBars(bars[i + 1], bars[high], array[i + 1], array[high], t1);
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
  
    bars[high].style.backgroundColor = "black";
    bars[i + 1].style.backgroundColor = "#3498db"; // Pivot in correct position
  
    return i + 1;
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