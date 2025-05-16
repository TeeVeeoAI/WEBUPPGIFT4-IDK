//Game

let c;
let ctx;
let vol = [0, 0];
let pos = [90, 90];
let score = 0;
let win = false;
let lose = false;
let started = false;
let length = 1;
let maxL = 31;
let prevPos =   [ 
                    [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10],
                    [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10, -10],
                    [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10, 10]
                ];
let foodPos = [ [Math.floor(Math.random() * 20)*10,Math.floor(Math.random() * 20)*10], 
                [Math.floor(Math.random() * 20)*10,Math.floor(Math.random() * 20)*10], 
                [Math.floor(Math.random() * 20)*10,Math.floor(Math.random() * 20)*10], 
                [Math.floor(Math.random() * 20)*10,Math.floor(Math.random() * 20)*10], 
                [Math.floor(Math.random() * 20)*10,Math.floor(Math.random() * 20)*10]];
let maxFood = 5;
let curFood = 5;
let r = 0;

function Snake(){
    c = document.getElementById('Game');
    ctx = c.getContext('2d');
    
    
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
    
    for (let i = 0; i < maxFood; i++){
        DrawFood(foodPos[i][0], foodPos[i][1]);
    }
    ctx.fillStyle = "#ff1030";

    if (vol[0] > 0 || vol[1] > 0 || vol[0] < 0 || vol[1] < 0){
        if (length <= 1){
            ctx.clearRect(pos[0], pos[1], 10, 10);
        } else {
            ctx.clearRect(prevPos[length-2][0], prevPos[length-2][1], 10, 10)
        }
    }

    if (length >= maxL){
        win = true;
    }
    
    if (vol[0] > 0 || vol[1] > 0 || vol[0] < 0 || vol[1] < 0){
        MovePos();
    }

    pos[1] += vol[1];
    pos[0] += vol[0];
    //console.log(pos[0] + " " + pos[1] + "\n" + prevPos[1][0] + " " + prevPos[1][1] + "\n" + prevPos[1][0] + " " + prevPos[1][1] + "\n" + prevPos[10][0] + " " + prevPos[19][1])
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
    
    for (let i = 0; i < length; i++){
        if (pos[0] == prevPos[i][0] && pos[1] == prevPos[i][1]){
            lose = true;
            vol[1] = 0;
            vol[0] = 0;
        }
    }

    ctx.fillRect(pos[0], pos[1], 10, 10);
}

setInterval(Snake, 100);
setInterval(WinLose, 200);
setInterval(Score, 100)

if ((!win || !lose) && started){
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
                for (let i = 0; i < maxFood; i++){
                    console.log("\nX: " + foodPos[i][0] + " | Y: " + foodPos[i][1])
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
    document.getElementById('score2').innerHTML = score;
    if (score < 1000){
        document.getElementById('score').style.color = "#dc143c"
        document.getElementById('score2').style.color = "#dc143c"
    }
    if (score >= 1000 && score < 2000){
        document.getElementById('score').style.color = "#00ff00"
        document.getElementById('score2').style.color = "#00ff00"
    }
    if (score >= 2000){
        document.getElementById('score').style.color = "#245617"
        document.getElementById('score2').style.color = "#245617"
    }
}

function WinLose(){
    if (win){
        document.getElementById('top').innerHTML = "Win";
        document.getElementById('score').style.display = "block";
        document.getElementById('winLose').style.display = "flex";
        document.getElementById('restart').innerHTML = "Restart";
        vol = [0, 0];
        pos = [90, 90];
    }
    else if (lose){
        document.getElementById('top').innerHTML = "Lose";
        document.getElementById('score').style.display = "block";
        document.getElementById('winLose').style.display = "flex";
        document.getElementById('restart').innerHTML = "Restart";
    } 
    else if(!started){
        document.getElementById('top').innerHTML = "Not Started";
        document.getElementById('score').style.display = "none";
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
    started = true;
    length = 1;
    prevPos =   [ 
        [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10],
        [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10, -10],
        [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10,-10], [-10, 10]
    ];
    foodPos = [ [Math.floor(Math.random() * 20)*10,Math.floor(Math.random() * 20)*10], 
                [Math.floor(Math.random() * 20)*10,Math.floor(Math.random() * 20)*10], 
                [Math.floor(Math.random() * 20)*10,Math.floor(Math.random() * 20)*10], 
                [Math.floor(Math.random() * 20)*10,Math.floor(Math.random() * 20)*10], 
                [Math.floor(Math.random() * 20)*10,Math.floor(Math.random() * 20)*10]];
    curFood = 5;
    document.getElementById('winLose').style.display = "none";
}

function Food(){
    if (curFood < maxFood){
        let y = Math.floor(Math.random() * 20)*10;
        let x = Math.floor(Math.random() * 20)*10;
        console.log("y = " + y + "; x = " + x);
    
        foodPos[curFood] = [x,y];
        curFood++;
    }
}

function MovePos(){
    for (let i = maxL-2; i > 0; i--){
        prevPos[i][0] = prevPos[i-1][0];
        prevPos[i][1] = prevPos[i-1][1];
    }
    prevPos[0][0] = pos[0];
    prevPos[0][1] = pos[1];
}

function DrawFood(x, y){
    c = document.getElementById('Game');
    ctx = c.getContext('2d');

    ctx.fillStyle = "#fea"

    ctx.fillRect(x, y, 10, 10);
}