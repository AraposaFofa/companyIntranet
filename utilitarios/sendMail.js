var nodemailer = require('nodemailer') /*importar nodemailer*/
const winston = require('../utilitarios/logger')
const fs = require('fs')
/**
 * DECLARAÇÃODECLARAÇÃODECLARAÇÃO DA FUNÇÃO DE ENVIAR O E-MAIL USANDO O NODEMAILER
 */

function enviarEmail(formRequisition) {
    /**
     * CRIAR O TRANSPORTADOR QUE POSSUI O CONTEXTO DA MENSAGEM
     */
    var transporter = nodemailer.createTransport({
        host: 'mail.eletricca.com.br',
        port: 465,
        secure: true,
        auth: {
            user: 'bot@eletricca.com.br',
            pass: 'Bot@8002'
        }
    })
    /**
     * DEFINE O CORPO TEXTUAL 
     */
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
        }
        else{
            winston.email.stream.write(`${info.response} de ${formRequisition}`)
            console.log(info.response)
        }
    })    
}

module.exports = { enviarEmail }