const express = require('express')
const bodyParser = require('body-parser') 
const app = express()
const nodemailer = require('nodemailer')
const ytd = require('./utilitarios/yt').youtubeDownloader
const logging = require('./utilitarios/logger')
const morgan = require('morgan')
// const ldap = require('ldapjs')
const path = require('path')
const PORT = 51115

//  app.use(morgan('combined', { stream: logging.logger.stream }))
// app.use('/tema2', express.static(path.join(__dirname, 'tema2')))
app.use('/', express.static('dev/public/'))
app.use(express.static(path.join(__dirname, 'dev')))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/dev/')
})
app.get('/lsynclog', (req, res, next) => {
    res.sendFile(__dirname + '/lsyncd/lsyncd.log')
})
app.get('/robots.txt', (req, res, next) => {
    res.sendFile(__dirname+ '/robots.txt')
})
app.get('/quotes.json', (req, res, next) => {
    res.sendFile(__dirname + '/quotes.json')
})
app.get('/extensions.json', (req, res, next) => {
    res.sendFile(__dirname + '/extensions.json')
})
app.get('/yt-downloads', (req, res, next) => {
    res.sendFile(__dirname + '/yt-downloads/')
})
app.post('/yt-downloads', (req, res, next) => {
    ytd(JSON.stringify(req.body.aurl), JSON.stringify(req.body.type))
    res.send('baixado')
})
app.post('/', (req, res, next) => {
    if(req.body.user === undefined || req.body.user === 'undefined' || req.body.user === ""){
        res.send('Coloque um caracter definido!')
    } else {
        sendMail(req.body.user, res)
    }
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
        to: 'lucas.curty@eletricca.com.br',
        subject: `EMAIL MANDADO POR ${formRequisition}`,
        text: `${formRequisition}`
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(`${error.message} de ${formRequisition}`)
            logging.email.stream.write(error)
            res.send('Error!')
        }
        else{
            logging.email.stream.write(`${info.response} de ${formRequisition}`)
            res.send('ENVIADO!')
        }
    })    
}


















/*
 * ###################################################################################################
 *                                  LDAP CLIENT FOR EXTENSION UPDATES
 * ###################################################################################################
*/



/*
const client = ldap.createClient({
    url: ['ldap://10.242.241.240', 'ldap://10.242.241.240']
})

client.on('error', err => {
    console.log(err)
})

client.bind('cn=admin,dc=pbx,dc=com', 'admin', err => {
    console.log(err)   
})

client.search('ou=pbx,dc=pbx,dc=com', {} ,(err, res) => {
    res.on('searchRequest', (searchRequest) => {
        console.log('searchRequest: ', searchRequest.messageID);
      });
      res.on('searchEntry', (entry) => {
        console.log('entry: ' + JSON.stringify(entry.object));
      });
      res.on('searchReference', (referral) => {
        console.log('referral: ' + referral.uris.join());
      });
      res.on('error', (err) => {
        console.error('error: ' + err.message);
      });
      res.on('end', (result) => {
        console.log('status: ' + result.status);
    });
})*/
