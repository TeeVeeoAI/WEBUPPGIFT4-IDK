const readme = document.getElementsByClassName('readmes');

function ToggleThemeD(){
    let html = document.getElementsByTagName('html')[0];
    html.classList.toggle('theme-dark');
    html.classList.toggle('theme-light');
    document.getElementById('moon').style.display = "none";
    document.getElementById('sun').style.display = "block";
}
function ToggleThemeL(){
    let html = document.getElementsByTagName('html')[0];
    html.classList.toggle('theme-dark');
    html.classList.toggle('theme-light');
    document.getElementById('moon').style.display = "block";
    document.getElementById('sun').style.display = "none";
}

function OpenNav(){
    if (document.getElementById('dropdown').style.display == "none"){
        document.getElementById('dropdown').style.display = "block";
        document.getElementById('content').style.marginTop = "100px";
    }
    else{
        document.getElementById('dropdown').style.display = "none";
        document.getElementById('content').style.marginTop = "0";
    }
}

function Readmore(index){
    let notOpen = true;
    if(document.getElementsByClassName('readmes')[index].style.display == "block"){
        notOpen = false;
    }
    for (let i = 0; i < 3; i++){
        readme[i].style.display = "none";
    }
    if(notOpen){
        readme[index].style.display = "block"; 
    }
}

//Game
let c;
let ctx;
let vol = [0, 0];
let pos = [90, 90];
let score = 0;
let win = false;
let lose = false;
let start = true;
let length = 2;
let maxL = 10;
let prevPos = [ [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10] ];

function Snake(){
    c = document.getElementById('Game');
    ctx = c.getContext('2d');
    ctx.fillStyle = "red";
    
    ctx.clearRect(pos[0], pos[1], 20, 20);

    MovePos();
    pos[1] += vol[1];
    pos[0] += vol[0];
    if (pos[0] < 0){
        pos[0] = 0;
        vol[0] = 0;
        lose = true;
    } else if (pos[0] > 190){
        pos[0] = 190;
        vol[0] = 0;
        lose = true;
    }
    if (pos[1] < 0){
        pos[1] = 0;
        vol[1] = 0;
        lose = true;
    } else if (pos[1] > 190){
        pos[1] = 190;
        vol[1] = 0;
        lose = true;
    }
    ctx.fillRect(pos[0], pos[1], 10, 10);
    for(let i = 0; i < length; i++){
        ctx.fillRect(prevPos[i][0], prevPos[i][1], 10, 10);
        //console.log("length = " + length + "; \nprevPos["+i+"] \nY = " + prevPos[i][1] + "; \nX = " + prevPos[i][0])
    }
}

setInterval(Snake, 200);
setInterval(Score, 1000);
setInterval(WinLose, 200);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "w":
            vol[0] = 0;
            vol[1] = -10;
            console.log("w")
            break;
        case "s":
            vol[0] = 0;
            vol[1] = 10;
            console.log("s")
            break;
        case "a":
            vol[0] = -10;
            vol[1] = 0;
            console.log("a")
            break;
        case "d":
            vol[0] = 10;
            vol[1] = 0;
            console.log("d")
            break;
    
        default:
            vol[0] = 0;
            vol[1] = 0;
            break;
    }
});

function Score(){
    document.getElementById('score').innerHTML = score;
    if (score > 100 && score < 200){
        document.getElementById('score').style.color = "#dc143c"
    }
    if (score > 200){
        document.getElementById('score').style.color = "#00ff00"
    }
}

function WinLose(){
    if (win){
        document.getElementById('top').innerHTML = "Win";
        document.getElementById('winLose').style.display = "flex";
    }
    if (lose){
        document.getElementById('top').innerHTML = "Lose";
        document.getElementById('winLose').style.display = "flex";
    }
}

function Restart(){
    c = document.getElementById('Game');
    ctx = c.getContext('2d');
    
    ctx.clearRect(pos[0], pos[1], 20, 20);

    vol = [0, 0];
    pos = [90, 90];
    score = 0;
    win = false;
    lose = false;
    start = true;
    length = 1;
    document.getElementById('winLose').style.display = "none";
}

function Food(){
    c = document.getElementById('Game');
    ctx = c.getContext('2d');
    ctx.fillStyle = "green";

    let y = Math.floor(Math.random() * 20)*10;
    let x = Math.floor(Math.random() * 20)*10;
    console.log("y = " + y + "; x = " + x);

    ctx.fillRect(x, y, 10, 10);
}

function MovePos(){
    prevPos[0] = pos;
    for(let i = 0; i < maxL-1; i++){
        prevPos[i+1] = prevPos[i]
    }
}