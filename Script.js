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

//Game¨

let c;
let ctx;
let vol = [0, 0];
let pos = [90, 90];
let score = 0;
let win = false;
let lose = false;
let start = true;
let length = 1;
let maxL = 10;
let prevPos = [ [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10] ];
let foodPos = [[-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10]];
let maxFood = 5;
let curFood = 0;

function Snake(){
    c = document.getElementById('Game');
    ctx = c.getContext('2d');
    ctx.fillStyle = "red";
    
    ctx.clearRect(pos[0], pos[1], 10, 10);

    for (let i = 0; i < maxFood; i++){
        if (pos[0] == foodPos[i][0] && pos[1] == foodPos[i][1]){

            for (let j = i; j < maxFood-1; j++){
                foodPos[j] = foodPos[j+1];
            }
            foodPos[maxFood-1] = [-10, -10]
            curFood--;

            length++;
            score += 100;
            Food();
        }
    }

    if (length >= maxL){
        win = true;
    }
    

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

for(let i = 0; i < 5; i++){
    Food();
}

setInterval(Snake, 100);
setInterval(Score, 1000);
setInterval(WinLose, 200);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

if (!win || !lose){
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case "w":
                vol[0] = 0;
                vol[1] = vol[1] == 10 ? 10 : -10;
                console.log("w")
                break;
            case "s":
                vol[0] = 0;
                vol[1] = vol[1] == -10 ? -10 : 10;
                console.log("s")
                break;
            case "a":
                vol[0] = vol[0] == 10 ? 10 : -10;
                vol[1] = 0;
                console.log("a")
                break;
            case "d":
                vol[0] = vol[0] == -10 ? -10 : 10;
                vol[1] = 0;
                console.log("d")
                break;
            case "e":
                Food();
                console.log("e")
                break;
            case "p":
                console.log("Length: " + length + "\nScore: " + score);
                break;
            case "f": 
                console.log("foodpos: " + foodPos);
                for (let i = 0; i < maxFood; i++){
                    console.log("\nTestx: " + foodPos[i][0] + " | TestY: " + foodPos[i][1])
                }
                break;
        
            default:
                vol[0] = 0;
                vol[1] = 0;
                console.log(event.key)
                break;
        }
    });
}

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
        vol = [0, 0];
        pos = [90, 90];
    }
    if (lose){
        document.getElementById('top').innerHTML = "Lose";
        document.getElementById('winLose').style.display = "flex";
    }
}

function Restart(){
    c = document.getElementById('Game');
    ctx = c.getContext('2d');
    
    ctx.clearRect(0, 0, 200, 200);

    vol = [0, 0];
    pos = [90, 90];
    score = 0;
    win = false;
    lose = false;
    start = true;
    length = 1;
    maxL = 10;
    prevPos = [ [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10] ];
    foodPos = [ [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10] ];
    curFood = 0;
    document.getElementById('winLose').style.display = "none";
}

function Food(){
    c = document.getElementById('Game');
    ctx = c.getContext('2d');
    ctx.fillStyle = "green";

    if (curFood < maxFood){
        let y = Math.floor(Math.random() * 20)*10;
        let x = Math.floor(Math.random() * 20)*10;
        console.log("y = " + y + "; x = " + x);
    
        ctx.fillRect(x, y, 10, 10);
        foodPos[curFood] = [x,y];
        curFood++;
    }
}

function MovePos(){
    prevPos[0] = pos;
    for(let i = 0; i < maxL-1; i++){
        prevPos[i+1] = prevPos[i]
    }
}