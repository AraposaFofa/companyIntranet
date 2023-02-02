setInterval(clockDate, 1000)
function clockDate() {
    let clock = new Date()
    let hour = clock.getHours()
    let minutes = clock.getMinutes()
    let day = clock.getDate()
    let month = clock.getMonth()
    let year = clock.getFullYear()
    month = month +1
    
    function zeroBeforeSingleChar(zeroless){
        if (zeroless < 10) {
            return '0'+zeroless
        }
        else{
            return zeroless
        }
    }

    let currentTime = `${zeroBeforeSingleChar(hour)}:
    ${zeroBeforeSingleChar(minutes)}`
    let currentDate = `${zeroBeforeSingleChar(day)}/
    ${zeroBeforeSingleChar(month)}/${year}`

    document.getElementById('clock-date')
    .innerHTML = `${currentTime}<br>${currentDate}`

    /*Putting it inside DOM*/
}
clockDate()