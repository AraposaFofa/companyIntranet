const express = require('express')
const bodyParser = require('body-parser') 
const app = express()
const nodemailer = require('nodemailer')
const ytd = require('./utilitarios/yt').youtubeDownloader
const logging = require('./utilitarios/logger')
// const morgan = require('morgan') 
// const testes = require('../test/server').path
const fs = require('fs')
const fileMaker = require('file-maker')
const zip = require('express-zip')
// const ldap = require('ldapjs')
const path = require('path')
const PORT = 51115

//  app.use(morgan('combined', { stream: logging.logger.stream }))
// app.use('/tema2', express.static(path.join(__dirname, 'tema2')))
app.use('/', express.static('dev/public/'))
app.use(express.static(path.join(__dirname, 'dev')))
app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/teste', express.static(testes))

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/dev/')
})
app.post('/', (req, res, next) => {
    if(req.body.user === undefined || req.body.user === 'undefined' || req.body.user === ""){
        res.send('Coloque um caracter definido!')
    } else {
        sendMail(req.body.user, res)
    }
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
// app.get('/teste', (req, res, next) => {
//     res.sendFile(testes)
// })
app.post('/backup-maker', (req, res) => {
    const userName = JSON.stringify(req.body['user-name']).replace('"',"").replace('"', "")
    backupCreator(userName)
    res.zip([
        { path: `./fileMaker/${userName}.bat`, name: `${userName}.bat` },
        { path: `./fileMaker/delUserConnnection.bat`, name: 'delUserConnnection.bat' },
        { path: `./fileMaker/backCron.bat`, name: 'backCron.bat' }
    ])   
})
function backupCreator(userName, userPass) {
    const connectionCreator = new fileMaker();
    const tripleSlash = '\\10.242.241.245'
    connectionCreator.writeLine(`mklink /d "C:\\Users\\%USERNAME%\\Documents\\Meus_Documentos_Na_Rede" "\\${tripleSlash}\\meus-documentos-na-rede\\${userName}"`)
    connectionCreator.saveTo(`./fileMaker/${userName}.bat`)
}
app.get('/yt-downloads', (req, res, next) => {
    res.sendFile(__dirname + '/yt-downloads/')
})
app.post('/yt-downloads', (req, res, next) => {
    ytd(JSON.stringify(req.body.aurl), JSON.stringify(req.body.type))
    res.send('baixado')
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
            logging.email.stream.write(`${info.response} de ${formRequisition} e o ID é:${info.messageId}`)
            res.send('ENVIADO!')
        }
    })    
}


/*
 * ###################################################################################################
 *                                  express.js withouuth ssl
 * ###################################################################################################
*/

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })



/*
 * ###################################################################################################
 *                                  ssl with express.js
 * ###################################################################################################
*/



const https = require('https')
const FileMaker = require('file-maker')
const { json } = require('express')
https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/eletrosena.ddns.net/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/eletrosena.ddns.net/fullchain.pem")
},
app
).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})








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
