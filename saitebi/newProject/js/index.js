

function toggleTheme(){
  let themedIDs = ["body"];

  themedIDs.forEach(element => {
    document.getElementById(element).classList.toggle("dark-mode"); 
  });
}

