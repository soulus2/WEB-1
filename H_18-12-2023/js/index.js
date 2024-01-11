const colors=["r","g","b","y"];
let isStart=true;
let TEAMS=[];
function putBlock(i,j,id) {
    document.getElementById(id).innerHTML+=`<div class="${colors[i]} teams" id="${colors[i]}${j}"><p>${i}X${j}</p></div>`;
  
}

function rand(max){
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
function displayPairs(pairs){
  document.getElementById("grid").innerHTML = '';
  for (let p=0;p<pairs.length;p++){
    if (pairs[p]==null) continue;
    document.getElementById("grid").innerHTML+='<dev id="pair'+p+'" class="pairCont">'
    putBlock(pairs[p][0][0],pairs[p][0][1],"pair"+p);
    putBlock(pairs[p][1][0],pairs[p][1][1],"pair"+p);
    document.getElementById("grid").innerHTML+="</div>"
  }
}

function group() {
  let teams=[...TEAMS];
  let pairs=[];
  console.log("teams at start: ",teams);
  while (teams.length>2){
    let r1 = rand(teams.length);
    let r2 = rand(teams.length);
    console.log(teams[r1],teams[r2]);
    if(teams[r1][0]==teams[r2][0]) continue;
    pairs.push([teams[r1],teams[r2]]); 
    teams.splice(r1,1);
    teams.splice(r2,1);
  }
  

  console.log("teams at end: ",teams);
  displayPairs(pairs);
  TEAMS=[];
  for (let p=0;p<pairs.length;p++){
    let rp = rand(2);
    TEAMS.push(pairs[p][rp]);
  }
  console.log("TEAMS in end: ",TEAMS)
  
}

function makeGrid() {
  if(!isStart){group(); return;}
  isStart=false;
  document.getElementById("mainButton").innerHTML="next stage";
  for (let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      putBlock(i,j,"grid");
      TEAMS.push([i,j]);
    }
  }  
}

