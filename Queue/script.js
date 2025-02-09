const queue = [];
const queueElement = document.querySelector('.queue-representation');
const valueInput = document.getElementById('value-input');
const enqueueButton = document.getElementById('enqueue-btn');
const dequeueButton = document.getElementById('dequeue-btn');
const messageBox = document.getElementById('message');
const speedControl = document.getElementById("speedControl");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let animationSpeed = 2;

// Add sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updateQueueDisplay() {
  queueElement.innerHTML = '';
  for (let i = 0; i < queue.length; i++) {
    const element = document.createElement('div');
    element.classList.add('queue-element');
    element.textContent = queue[i];
    queueElement.appendChild(element);
  }
}

async function enqueueElement(element) {
  return new Promise((resolve) => {
    element.classList.add('enqueue-animation');
    element.addEventListener('animationend', () => {
      element.classList.remove('enqueue-animation');
      resolve();
    }, { once: true });
  });
}

async function enqueue(value) {
  if (typeof value === 'string') {
    // Handle space-separated integers
    const values = value.trim().split(' ');
    for (const item of values) {
      if (item) {
        queue.push(item);
        updateQueueDisplay();
        const element = queueElement.querySelector(':last-child');
        valueInput.value = '';
        enqueueElement(element);
      }
    }
  } else {
    // Handle single value
    queue.push(value);
    updateQueueDisplay();
    const element = queueElement.querySelector(':last-child');
    valueInput.value = '';
    enqueueElement(element);
  }
  dequeueButton.disabled = false;
  messageBox.textContent = ''; // Clear any previous messages
  document.querySelector("#message1").innerHTML = `Front = ${queue[0]}`;
}

async function dequeueElementWithAnimation() {
  if (queue.length === 0) {
    messageBox.textContent = 'Queue is empty!';
    return false;
  }
  const element = queueElement.querySelector(':first-child');
  return new Promise((resolve) => {
    element.classList.add('dequeue-animation');
    element.addEventListener('animationend', () => {
      resolve(true);
    }, { once: true });
  });
}

async function dequeue() {
  const animationComplete = await dequeueElementWithAnimation();
  if (!animationComplete) return;

  const value = queue.shift(); // FIFO - remove from front
  updateQueueDisplay();
  if (queue.length === 0) {
    dequeueButton.disabled = true;
  }
  messageBox.textContent = `Dequeued element: ${value}`;
  document.querySelector("#message1").innerHTML = queue.length > 0 ? `Front = ${queue[0]}` : 'Queue is empty';
}

enqueueButton.addEventListener('click', () => {
  const value = valueInput.value.trim();
  if (value) {
    enqueue(value);
  } else {
    messageBox.textContent = 'Please enter a value to enqueue.';
  }
});

dequeueButton.addEventListener('click', dequeue);

speedControl.addEventListener("input", () => {
  animationSpeed = 6 - speedControl.value;
});
