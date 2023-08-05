

// hide and unhide projects 
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








// navbar


function toggleNavbar(event) {
  const navbar = document.getElementById("navbar");
  const navbarIcons = document.getElementById("navbar-icons");
  const darkmode = document.getElementById("darkmode");

  // Check if the click is on the navbar or navbar-icons
  const isNavbarClick = event.target === navbar || navbar.contains(event.target);
  const isNavbarIconsClick = event.target === navbarIcons || navbarIcons.contains(event.target);

  if (isNavbarClick && !isNavbarIconsClick) {
    // If clicked on the navbar itself (but not on navbar-icons), toggle the 'expanded' class
    navbar.classList.toggle("expanded");
    // Show/hide the navbar-icons when the navbar is expanded/collapsed
    navbarIcons.style.display = navbar.classList.contains("expanded") ? "block" : "none";
    // Toggle the 'hidden-2' class on #darkmode when the navbar is expanded/collapsed
    darkmode.classList.toggle("hidden-2", navbar.classList.contains("expanded"));
  }
}

// Collapse the navbar when clicking anywhere outside it, but keep it expanded when vw >= vh
document.addEventListener("click", (event) => {
  const navbar = document.getElementById("navbar");
  const navbarIcons = document.getElementById("navbar-icons");
  const darkmode = document.getElementById("darkmode");

  // Check if the viewport width is greater than or equal to the viewport height
  const isVwGreaterThanVh = window.innerWidth >= window.innerHeight;

  if (!navbar.contains(event.target) && !isVwGreaterThanVh) {
    // If clicked outside the navbar and vw < vh, collapse the navbar and remove 'expanded' class
    navbar.classList.remove("expanded");
    navbarIcons.style.display = "none";
    darkmode.classList.remove("hidden-2");
  }
});

// Function to handle viewport resize
function handleViewportResize() {
  const vw = window.innerWidth; // Viewport width in pixels
  const vh = window.innerHeight; // Viewport height in pixels

  const navbar = document.getElementById("navbar");
  const navbarIcons = document.getElementById("navbar-icons");
  const darkmode = document.getElementById("darkmode");

  if (vw < vh) {
    // If viewport width is less than viewport height, collapse the navbar
    navbar.classList.remove("expanded");
    navbarIcons.style.display = "none";
    darkmode.classList.remove("hidden-2");
  } else {
    // If viewport width is greater than or equal to viewport height, keep the navbar expanded
    navbar.classList.add("expanded");
    navbarIcons.style.display = "block";
    darkmode.classList.remove("hidden-2");
  }
}

// Call the function initially to check the viewport size on page load
handleViewportResize();

// Attach the event listener to automatically detect changes in viewport size
window.addEventListener("resize", handleViewportResize);
