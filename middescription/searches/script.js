let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
function addAnimationEndListener(element) {
    // Add an event listener for the 'animationend' event
    const animationEndHandler = () => {
        // Set display to 'none' after the fade-out animation completes
        element.style.display = "none";
        // Remove the event listener to avoid multiple bindings
        element.removeEventListener('animationend', animationEndHandler);
    };

    element.addEventListener('animationend', animationEndHandler, { once: true });
}


document.querySelector(".Linear-Search").addEventListener('mouseover', () => {
    document.querySelector(".linear").style.display = "block";
    document.querySelector(".linear").style.animation = "fade-in 500ms forwards";
})

document.querySelector(".Linear-Search").addEventListener('mouseout', () => {
    document.querySelector(".linear").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".linear"));
});

document.querySelector(".Binary-Search").addEventListener('mouseover', () => {
    document.querySelector(".binary").style.display = "block";
    document.querySelector(".binary").style.animation = "fade-in 500ms forwards";
})

document.querySelector(".Binary-Search").addEventListener('mouseout', () => {
    document.querySelector(".binary").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".binary"));
});


document.querySelector(".Sentinel-Search").addEventListener('mouseover', () => {
    document.querySelector(".Sentinel").style.display = "block";
    document.querySelector(".Sentinel").style.animation = "fade-in 500ms forwards";
})

document.querySelector(".Sentinel-Search").addEventListener('mouseout', () => {
    document.querySelector(".Sentinel").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".Sentinel"));
});

document.querySelector(".Fibonacci-Search").addEventListener('mouseover', () => {
    document.querySelector(".Fibonacci").style.display = "block";
    document.querySelector(".Fibonacci").style.animation = "fade-in 500ms forwards";
})

document.querySelector(".Fibonacci-Search").addEventListener('mouseout', () => {
    document.querySelector(".Fibonacci").style.animation = "fade-out 500ms ease-in-out";
    addAnimationEndListener(document.querySelector(".Fibonacci"));
});


document.querySelector(".Linear-Search").addEventListener("onclick",()=>{
    location.href="..\..\LinearSearch\LinearSearch.html";
});

document.querySelector(".Binary-Search").addEventListener("onclick",()=>{
    location.href="..\..\BinarySearch\BinarySearch.html";
});