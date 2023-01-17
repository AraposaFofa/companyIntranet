setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min =time.getMinutes();
 
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
 
    let currentTime = hour + ":" + min + " " 
 
    document.getElementById("clock").innerHTML = currentTime;

    const message = {
        inicial: 'Olá, seja bem vindo!',
        bomDia: 'Bom dia!',
        almoco: 'Bom almoço!',
        boaTarde: 'Boa tarde!',
        end: 'Acabou o expediente!'
    }
    let text = document.getElementById('mensagem').innerHTML
    if(hour >= 8 && hour < 12){
        text = message['bomDia']
    } else if( hour >= 12 && hour < 13){
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
    else if( hour >= 17 && min >= 44){
        text = message['end']
    }
    document.getElementById('mensagem').innerHTML = text
}
showTime();


