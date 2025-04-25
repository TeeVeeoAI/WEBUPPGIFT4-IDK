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
let pos = [0, 0];

function test(){
    c = document.getElementById('Game');
    ctx = c.getContext('2d');
    ctx.fillStyle = "red";
    
    ctx.clearRect(pos[0], pos[1], 20, 20);


    pos[1] += vol[1];
    pos[0] += vol[0];
    if (pos[0] < 0){
        pos[0] = 0;
        vol[0] = 0;
        alert("lose")
    } else if (pos[0] > 190){
        pos[0] = 190;
        vol[0] = 0;
        alert("lose")
    }
    if (pos[1] < 0){
        pos[1] = 0;
        vol[1] = 0;
        alert("lose")
    } else if (pos[1] > 190){
        pos[1] = 190;
        vol[1] = 0;
        
    }
    ctx.fillRect(pos[0],pos[1], 10, 10);
}

setInterval(test, 200);

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
