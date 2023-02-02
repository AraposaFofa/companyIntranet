const express = require('express') /**espress */
const bodyParser = require('body-parser') /**body-parser pra evitar o erro de versionamento */
const app = express()
const fs = require('fs')
const ee = require('../intranet/utilitarios/sendMail').enviarEmail
const ytd = require('../intranet/utilitarios/yt').youtubeDownloader
const winston = require('../intranet/utilitarios/logger')
const morgan = require('morgan')
const path = require('path')
const nodemailer = require('nodemailer')
/*
* MIDDLEWWARES
*/
//app.use(morgan('combined', { stream: winston.logger.stream })) ative essa linha quando quiser o log do email e do acesso diretamente

app.use('/', express.static('dev/public/'))
app.use(express.static(path.join(__dirname, 'dev')))
app.use('/tema2', express.static(path.join(__dirname, 'tema2')))
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 51115

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/dev/')
})

app.get('/tema2', (req, res, next) => {
    res.sendFile(__dirname + '/tema2')
})

app.get('/robots.txt', (req, res, next) => {
    res.sendFile(__dirname+ '/robots.txt')
})

app.get('/quotes.json', (req, res, next) => {
    res.sendFile(__dirname + '/quotes.json')
})

app.get('/yt-downloads', (req, res, next) => {
    res.sendFile(__dirname + '/yt-downloads/')
})
app.post('/', (req, res, next) => {
    let aux = JSON.stringify(req.body.user)
    console.log(aux)
    if(aux === '"undefined"' || aux === undefined){
        res.send(`${aux} is not a supported char!`)
    }
    else {
        sendMail(req.body.user, res)
    }
})

app.post('/yt-downloads', (req, res, next) => {
    ytd(JSON.stringify(req.body.aurl), JSON.stringify(req.body.type))
    res.send('baixado')
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


function sendMail(formRequisition, res) {
    var transporter = nodemailer.createTransport({
        host: 'mail.eletricca.com.br',
        port: 465,
        secure: true,
        auth: {
            user: 'bot@eletricca.com.br',
            pass: 'Bot@8002'
        }
    })
    var mailOptions = {
        from: 'bot@eletricca.com.br',
        to: 'ponto@eletricca.com.br',
        subject: `EMAIL MANDADO POR ${formRequisition}`,
        text: `${formRequisition}`
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(`${error.message} de ${formRequisition}`)
            winston.email.stream.write(error)
            res.send('Error!')
        }
        else{
            winston.email.stream.write(`${info.response} de ${formRequisition}`)
            console.log(info.response)
            res.send('<div><h1 style="align-text:center; width=100%;">Enviado!</h1></div>')
        }
    })
}
