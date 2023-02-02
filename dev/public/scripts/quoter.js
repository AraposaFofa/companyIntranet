function quoter() {
    fetch('./scripts/quotes.json', {
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
        author.innerHTML = '--'+JSON.stringify(response.quotes[random].author).replaceAll('"', "")
        response = JSON.stringify(response)
        return response
    })
}
const getRandom = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1) + min)
}
quoter()    