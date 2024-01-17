const colors = ["r", "g", "b", "y"];
let isStart = true;

function putBlock(i, j, id) {
    let block = document.createElement("div");
    block.classList.add("" + colors[i]);
    block.classList.add("teams");
    block.id = colors[i] + "" + j;

    let text = document.createElement("p");
    text.textContent = i + " X " + j;
    block.appendChild(text);
    document.getElementById(id).appendChild(block);
}

function rand(max) {
    return Math.floor(Math.random() * max);
}

function moveToBack(array, index) {
    if (index < 0 || index >= array.length) {
        console.error("Index out of bounds");
        return;
    }

    const element = array.splice(index, 1)[0];
    array.push(element);
}

function displayPairs(pairs) {
    document.getElementById("grid").innerHTML = '';
    for (let p = 0; p < pairs.length; p++) {
        if (pairs[p] == null) continue;
        document.getElementById("grid").innerHTML += '<div id="pair' + p + '" class="pairCont">';
        putBlock(pairs[p][0][0], pairs[p][0][1], "pair" + p);
        putBlock(pairs[p][1][0], pairs[p][1][1], "pair" + p);
        document.getElementById("grid").innerHTML += "</div>";
    }
}

function getIds(divId) {
    let divElement = document.getElementById(divId);
    let IDs = [];
    if (divElement) {
        let allElements = divElement.querySelectorAll('*');

        allElements.forEach(function (element) {
            let elementId = element.id;

            IDs.push(elementId);
        });
    }
    return IDs;
}

function HRAMAdd(element) {
    if(document.getElementById("HRAM"))document.getElementById('HRAM').appendChild(element);
}

function group() {
    if (!document.getElementById('teams')) return -1;

    let teams = getIds("teams");
    let teamsCopy = document.createElement('div');
    let iterations = 0;
    teamsCopy.id = 'teamsCopy';

    teams.forEach(element => {
        let bl = document.createElement('div');
        bl.id = element + "copy";
        teamsCopy.appendChild(bl);
    });

    if (teams.length ==2){
      return -3;
    }   

    HRAMAdd(teamsCopy);
    let pairs = [];
        
    let maxIterations=9999999;
    while (getIds("teamsCopy").length > 0 && iterations<maxIterations) {
        
        iterations++;
        let tcp = getIds("teamsCopy");
        let r1 = rand(tcp.length);
        let r2 = rand(tcp.length);
        

        if (tcp[r1][0] == tcp[r2][0]) continue;
        
        let removedElement1 = document.getElementById(tcp[r1]);
        let removedElement2 = document.getElementById(tcp[r2]);

        if (removedElement1 && removedElement1.parentNode) {
            removedElement1.parentNode.removeChild(removedElement1);
        }

        if (removedElement2 && removedElement2.parentNode) {
            removedElement2.parentNode.removeChild(removedElement2);
        }

        pairs.push([tcp[r1].slice(0,2), tcp[r2].slice(0,2)]);
    }
    if(iterations>=maxIterations){
      console.log("Getting random int in javascript sucks");
      location.reload(); 
      return -1;
    }
    displayPairs(pairs);
    document.getElementById("HRAM").removeChild(document.getElementById("teamsCopy"));
    document.getElementById("teams").innerHTML = '';
    for (let p = 0; p < pairs.length; p++) {
        let rp = pairs[p][0];
        let b = document.createElement("div");
        b.id = rp;
        document.getElementById('teams').appendChild(b);
    }
}

function makeGrid() {
    if (!isStart) {
        error = group();
        if (error == -3){
          let rw = rand(2);
          document.getElementById("grid").innerHTML='';
          putBlock(getIds("teams")[rw][0],getIds("teams")[rw][1],"grid");
          document.getElementById("UI").innerHTML = '';
          isStart=true;
        }
        return;

    }
    document.getElementById("grid").innerHTML = '';
    isStart = false;
    document.getElementById("mainButton").innerHTML = "next stage";
    let teamsElement = document.createElement('div');
    teamsElement.id = 'teams';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            putBlock(i, j, "grid");
            let b = document.createElement("div");
            b.id = i + '' + j;
            teamsElement.appendChild(b);
        }
    }
    HRAMAdd(teamsElement);
}

