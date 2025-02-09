async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  async function visualizeMergeSort() {
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
  
    await mergeSortAnimation(array, 0, array.length - 1);
  
    // Mark all elements as sorted
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#2ecc71";
      await sleep(50);
    }
  
    document.querySelector(".c").innerHTML = `Sorting completed!<br>
      Time Complexity: O(n log n) in all cases`;
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
  
  async function mergeSortAnimation(array, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
  
      // Visualize splitting
      await visualizeSplit(left, mid, right);
  
      // Recursively sort the left and right halves
      await mergeSortAnimation(array, left, mid);
      await mergeSortAnimation(array, mid + 1, right);
  
      // Merge the sorted halves
      await merge(array, left, mid, right);
    }
  }
  
  async function visualizeSplit(left, mid, right) {
    const bars = document.querySelectorAll(".array-bar");
    const codeExecutionContainer = document.querySelector(".c");
    let t1 = parseInt(document.querySelector("#time").value);
  
    codeExecutionContainer.innerHTML = `Splitting array from index ${left} to ${right}`;
  
    for (let i = left; i <= right; i++) {
      if (i <= mid) {
        bars[i].style.backgroundColor = "#e74c3c"; // Left half
      } else {
        bars[i].style.backgroundColor = "#3498db"; // Right half
      }
    }
  
    await sleep(t1);
  
    // Reset colors
    for (let i = left; i <= right; i++) {
      bars[i].style.backgroundColor = "black";
    }
  }
  
  async function merge(array, left, mid, right) {
    const bars = document.querySelectorAll(".array-bar");
    const codeExecutionContainer = document.querySelector(".c");
    let t1 = parseInt(document.querySelector("#time").value);
  
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = new Array(n1);
    const R = new Array(n2);
  
    for (let i = 0; i < n1; i++) {
      L[i] = array[left + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = array[mid + 1 + j];
    }
  
    let i = 0, j = 0, k = left;
  
    while (i < n1 && j < n2) {
      codeExecutionContainer.innerHTML = `Comparing ${L[i]} and ${R[j]}`;
      bars[left + i].style.backgroundColor = "#e74c3c";
      bars[mid + 1 + j].style.backgroundColor = "#3498db";
      await sleep(t1 / 2);
  
      if (L[i] <= R[j]) {
        array[k] = L[i];
        // bars[k].style.height = `${L[i]}px`;
        bars[k].innerHTML = L[i];
        i++;
      } else {
        array[k] = R[j];
        // bars[k].style.height = `${R[j]}px`;
        bars[k].innerHTML = R[j];
        j++;
      }
      bars[k].style.backgroundColor = "#e78c3c";
      k++;
      await sleep(t1 / 2);
    }
  
    while (i < n1) {
      array[k] = L[i];
    //   bars[k].style.height = `${L[i]}px`;
      bars[k].innerHTML = L[i];
      bars[k].style.backgroundColor = "#e78c3c";
      i++;
      k++;
      await sleep(t1 / 2);
    }
  
    while (j < n2) {
      array[k] = R[j];
    //   bars[k].style.height = `${R[j]}px`;
      bars[k].innerHTML = R[j];
      bars[k].style.backgroundColor = "#e78c3c";
      j++;
      k++;
      await sleep(t1 / 2);
    }
  
    // Reset colors for the merged part
    for (let i = left; i <= right; i++) {
      bars[i].style.backgroundColor = "black";
    }
  }