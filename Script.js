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
    if (document.getElementById('dropdown').style.display == "none")
        document.getElementById('dropdown').style.display = "block"
    else
        document.getElementById('dropdown').style.display = "none"
}