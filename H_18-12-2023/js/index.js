const colors=["r","g","b","y"];
let isStart=true;
let TEAMS=[];
let pairs=[];
function putBlock(i,j,id) {
    document.getElementById(id).innerHTML+=`<div class="${colors[i]} teams" id="${colors[i]}${j}"><p>${i}X${j}</p></div>`;
  
}

function rand(max){
  return Math.floor(Math.random() * max); 
}

function group() {
  let teams = TEAMS;
  let pairs=[];

    let rl =[];
  for(let i=0;i<teams.length;i++){
    if (teams[i]==0) continue;
    let ri=0;
    let test =true;
    // console.log(teams.length);

    while (test) {
      ri=rand(teams.length);
      let skip=false;
      for(let r=0;r<rl.length;r++){
        if (ri==rl[r]) {skip=true; break;}
      }
      if (skip) continue;
      rl.push(""+ri);
      
      console.log(ri);
      console.log(teams[ri][0]);
      // break;
      console.log(rl);

      pairs.push([teams[i],teams[ri]]);
      teams[ri]=0;
      teams[i]=0;
      break;
      
    }
  }
  
  // console.log(pairs);
}

function makeGrid() {
  if(!isStart){group(); return;}
  isStart=false;
  document.getElementById("mainButton").innerHTML="next stage";
  for (let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      putBlock(i,j,"grid");
      TEAMS.push(i+""+j);
    }
  }  
}

