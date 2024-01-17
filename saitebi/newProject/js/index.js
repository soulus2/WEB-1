let themedIDs = ["body"];



function toggleTheme(toggleIDs){
  toggleIDs.forEach(element => {
    documoent.body.classList.toggle("dark-mode");
  });
}

document.getElementById("themeToggle").addEventListener("click", toggleTheme); 
