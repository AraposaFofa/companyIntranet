setInterval(showTime, 1000);
/**
 * this is a simple DOM changer for changing the date and time
 */
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min =time.getMinutes();
    let day = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    day = day < 10 ? '0' + day: day;
    month = month +1
    if (month < 10) { month = '0'+month } 
    let currentTime = `${hour}:${min}<br><span id="clock-date">${day}/${month}/${year}</span>`
    document.getElementById("clock").innerHTML = currentTime;
    const message = {
        inicial: 'Olá, seja bem vindo!',
        bomDia: 'Bom dia!',
        almoco: 'Bom almoço!',
        boaTarde: 'Boa tarde!',
        end: 'Acabou o expediente!'
    }
    let text = document.getElementById('mensagem').innerHTML

    if(hour >= 6 && hour < 12){
        text = message['bomDia']
    } 
    else if( hour >= 12 && hour < 13){
        text = message['almoco']
    }
    else if(hour >= 13 && hour <= 17 ){
        if (hour === 17 && min >= 44) {
            text = message['end']
        }
        else{
            text = message['boaTarde']
        }
    }
    else if( hour >= 17){
        if (hour == 17 && min >= 44) {
            text = message['end']            
        }
        else if (hour > 17 || hour < 7){
            text = message['end']
        }
    }
    document.getElementById('mensagem').innerHTML = text
}
showTime();

/*######################    quoter    ######################*/

function quoter() {
    fetch('./quotes.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => {
        const quotes = document.getElementById('quote')
        const author = document.getElementById('author')

        let random =  getRandom(0, JSON.stringify(response.quotes.length))
        
        quotes.innerText = JSON.stringify(response.quotes[random].quote)
        author.innerHTML = JSON.stringify(response.quotes[random].author).replaceAll('"', "")
    })
}
const getRandom = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1) + min)
}
  
/*######################    extension maker    ######################*/

function extensions () {
    fetch('./extensions.json', {
    method: 'GET',
    headers: {
        'Accept' : 'application/json'
    }
    })
	.then(response => response.json())
	.then(response => {
        const table = document.getElementById('ramais')
        table.createTBody()
        let tdCollection, lastLine
		for(i = 0; i < response.extensions.length; i++){
            table.lastElementChild.appendChild(document.createElement('tr'))
            lastLine = table.lastElementChild.lastElementChild
            tdCollection = lastLine.getElementsByTagName('td')
            for(j = 0; j < 4; j++){
                lastLine.appendChild(document.createElement('td'))
            }
            tdCollection[0].innerHTML = i + 1
			tdCollection[1].innerHTML = (JSON.stringify(response.extensions[i].name)).replaceAll('"', "")
            tdCollection[2].innerHTML = (JSON.stringify(response.extensions[i].emai)).replaceAll('"',"")
			tdCollection[3].innerHTML = (JSON.stringify(response.extensions[i].number)).replaceAll('"',"")
		}
    })
}

//https://s2.googleusercontent.com/s2/favicons?domain=https://www.how7o.com

// function faviconGetter() {
//     firstDivIcon = document.querySelector('.bookmark')
//     firstDivIcon.set
// }



// const extensionToggle = document.getElementById('toggle-extension-table')
// extensionToggle.addEventListener('change', () => {
//     {
//         let i =  1
//         console.log(i++)
//     }
//     {}
// })




/*######################    bookmarks!    ######################*/
//esse foi dificil, viu
const deleteButtons = document.getElementsByClassName('tile-del-button')

function deleteBookMarkButtons() {
    for (let i = 0; i < deleteButtons.length; i++) {
        removeParentElement(deleteButtons[i])
    }
    
}
function removeParentElement(element) {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        element.parentElement.remove()
    }, 'false')
}



const PERM_BOOKMARKS = `<a class="tile" href="https://google.com"><div class="tile-icon">
    <img src="https://s2.googleusercontent.com/s2/favicons?domain=google.com" alt="Favicon">
</div><div class="tile-title"><span>Google</span></div></a><a class="tile" href="">
    <div class="tile-icon"><img src="https://s2.googleusercontent.com/s2/favicons?domain=eletricca.com.br" alt="Favicon">
</div><div class="tile-title"><span>Webmail</span></div></a><a class="tile" href="">
<div class="tile-icon"><img src="https://s2.googleusercontent.com/s2/favicons?domain=app.asana.com" alt="Favicon">
</div><div class="tile-title"><span>Asana</span></div></a><a class="tile" href="">
<div class="tile-icon"><img src="https://s2.googleusercontent.com/s2/favicons?domain=app.pipedrive.com" alt="Favicon">
</div><div class="tile-title"><span>Pipedrive</span></div></a>`
{/* <div class="tile" id="add-button">
<div class="add-button">+</div><div class="add-popup"><input type="text" name="bookmark-name" id="bookmark-name" placeholder="name">
    <input type="text" name="bookmar-url" id="bookmark-url" placeholder="url"></div></div> */}

const myMonsterCreation = document.getElementById('bookmarks')
myMonsterCreation.innerHTML = PERM_BOOKMARKS