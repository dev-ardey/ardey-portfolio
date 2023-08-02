

// hide and unhide projects 
// observer
// function that runs every time te visibility of observed elements changes
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      // changes class to show
      entry.target.classList.add('show');
    }
    // do it more than once 
    else {
      entry.target.classList.remove('show');
    }
  });
});

// grab all hidden elements
const hiddenElements = document.querySelectorAll('.hidden');

// tell the observer what to observe, loop over each elements and observe all hidden elements
hiddenElements.forEach((el) => observer.observe(el));






// skill - list transform functions 

document.addEventListener('DOMContentLoaded', function () {
  var skillList = document.getElementById('skill-list');
  var skillListVisible = localStorage.getItem('skillListVisible');

  if (skillListVisible === 'true') {
    skillList.style.display = 'block';
    document.getElementById('checkbox').checked = true;
  } else {
    skillList.style.display = 'none';
    document.getElementById('checkbox').checked = false;
  }
});

document.getElementById('checkbox').onclick = function () {
  toggleSkillList();
};

function toggleSkillList() {
  var checkbox = document.getElementById('checkbox');
  var skillList = document.getElementById('skill-list');

  if (checkbox.checked) {
    skillList.style.display = 'block';
    localStorage.setItem('skillListVisible', 'true');
  } else {
    skillList.style.display = 'none';
    localStorage.setItem('skillListVisible', 'false');
  }
}



// project slider 

const dots = document.querySelectorAll(".dot");
const slidesContainer = document.querySelector(".slides");

let slideIndex = 0;

// Get the last visited slide index from localStorage or set it to 0 if it's not found
slideIndex = parseInt(localStorage.getItem("lastSlideIndex")) || 0;
updateSlidePosition();
updateActiveDot();

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    slideIndex = parseInt(dot.getAttribute("data-slide"));
    updateSlidePosition();
    updateActiveDot();
    // Save the current slide index in localStorage
    localStorage.setItem("lastSlideIndex", slideIndex);
  });
});

function updateSlidePosition() {
  const slideWidth = slidesContainer.clientWidth / 4;
  slidesContainer.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

function updateActiveDot() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active-dot", index === slideIndex);
  });
}





// darkmode 



const darkModeElement = document.getElementById("darkmode");
const body = document.body;
const navbar = document.getElementById("navbar");

// Function to toggle dark mode state and update styles
function toggleDarkMode() {
  if (darkModeElement.classList.contains("darkmode-active")) {
    darkModeElement.classList.remove("darkmode-active");
    darkModeElement.classList.add("darkmode-reversed");
    // Remove the animation class
    darkModeElement.style.animation = "none";
    // Reset the animation after a short delay (0ms) to retrigger it
    setTimeout(() => {
      darkModeElement.style.animation = "";
    }, 0);
    // Store the dark mode state in localStorage as "false" when reversed (not active)
    localStorage.setItem("darkModeState", "false");
  } else {
    darkModeElement.classList.add("darkmode-active");
    darkModeElement.classList.remove("darkmode-reversed");
    // Remove the animation class
    darkModeElement.style.animation = "none";
    // Reset the animation after a short delay (0ms) to retrigger it
    setTimeout(() => {
      darkModeElement.style.animation = "";
    }, 0);
    // Store the dark mode state in localStorage as "true" when active
    localStorage.setItem("darkModeState", "true");
  }

  // Call the function to update styles
  updateDarkModeStyles();
}

//darkmode root color

// Set the value of --background2 to the computed value of --darkmode2
// Function to handle styles based on dark mode state
function updateDarkModeStyles() {
  if (darkModeElement.classList.contains("darkmode-active")) {
    // darkModeElement.style.backgroundColor = "var(--button-color)";
    // navbar.style.backgroundColor = "var(--button-color)";
    body.style.color = "rgba(254,250,245,255)";

    //linked aan darkModeColor maar wil dat het alleen 
    const darkModeColor = getComputedStyle(document.documentElement).getPropertyValue('--darkmode2');
    document.documentElement.style.setProperty('--background2', darkModeColor);

    const darkModeBackground = getComputedStyle(document.documentElement).getPropertyValue('--darkmode-background1');
    document.documentElement.style.setProperty('--theme-color2', darkModeBackground);

    const h1Color = getComputedStyle(document.documentElement).getPropertyValue('--h1-darkmode');
    document.documentElement.style.setProperty('--h1-background', h1Color);

    const darkText = getComputedStyle(document.documentElement).getPropertyValue('--button-text-dark');
    document.documentElement.style.setProperty('--button-text-light', darkText);

    console.log("darkmode on")


  } else {
    body.style.color = "black";
    // darkModeElement.style.backgroundColor = "var(--button-color)";
    // navbar.style.backgroundColor = "var(--button-color)";

    const lightModeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-color-1');
    document.documentElement.style.setProperty('--background2', lightModeColor);

    const lightModeBackground = getComputedStyle(document.documentElement).getPropertyValue('--theme-color-2');
    document.documentElement.style.setProperty('--theme-color2', lightModeBackground);

    const h1restore = getComputedStyle(document.documentElement).getPropertyValue('--h1-reset');
    document.documentElement.style.setProperty('--h1-background', h1restore);

    const lightText = getComputedStyle(document.documentElement).getPropertyValue('--button-text-reset');
    document.documentElement.style.setProperty('--button-text-light', lightText);


    console.log("darkmode off")

  }
}

// Check if dark mode state is stored in localStorage on page load
const isDarkMode = localStorage.getItem("darkModeState");
// Apply the appropriate class based on the stored state
if (isDarkMode === "true") {
  darkModeElement.classList.add("darkmode-active");
} else {
  darkModeElement.classList.remove("darkmode-active");
}

// Call the function to update styles on page load
updateDarkModeStyles();

darkModeElement.addEventListener("click", () => {
  // Call the function to toggle dark mode and update styles
  toggleDarkMode();
});

