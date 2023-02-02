checkSortMode()

let sortToggle = document.getElementById('ramais')

sortToggle.addEventListener('change', () =>{
    document.getElementById('ramais').classList.toggle('sorted-table')
})

function checkDarkMode(){
    if (localStorage.sortToggle) {
        document.getElementById('ramais').classList.add('sorted-table')
    }
    else{
        document.getElementById('ramais').classList.remove('sorted-table')
    }
}

if (sortToggle.checked) {
    localStorage.sortToggle = true
}
else{
    localStorage.sortToggle = false
}