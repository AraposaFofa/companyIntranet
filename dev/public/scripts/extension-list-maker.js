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

// const extensionToggle = document.getElementById('toggle-extension-table')
// extensionToggle.addEventListener('change', () => {
//     {
//         let i =  1
//         console.log(i++)
//     }
//     {}
// })