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