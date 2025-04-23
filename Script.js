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
let w = 10;

function test(){
    c = document.getElementById('Game');
    ctx = c.getContext('2d');
    ctx.fillStyle = "red";
    ctx.fillRect(w, 0, 20, 20);
    w++;
}

function test2(){
    ctx.clearRect(w-1, 0, 20, 20)
}

setInterval(test, 500)
setInterval(test2, 500)