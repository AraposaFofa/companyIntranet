const flags = process.argv //ISSO RETORNAR UM ARRAY, ENTÂO EU DEVO TRATAR COMO UM ARRAY
/**
 *  --nas1 = 1
 *  --nas2 = 2
 *  --local = 5
 *  --endb = 10
 *  --umount = 404
 */

function getFlags(flagParams) {
    let actioner = 0
    flagParams.forEach(element => {
        actioner 
        = element === '--nas1' ? actioner += 1 
        : element === '--nas2' ? actioner += 2
        : element === '--local' ? actioner += 5
        : element === '--endb' ? actioner += 10
        : element === '--unmount' ? actioner += 404
        : actioner
    })
    return actioner
}
const flagSum = getFlags(flags)

function subjectCreator(getFlags) { // EU PODERIA TER USADO O SWITCH, MAS PREFIRO A CADEIA DE IF ELSE POR SER MAIS EXPLICITO PARA QUEM FOR FAZER A MANUTENÇÃO
    if (getFlags === 1) {
        return `BACKUP NAS1 INICIADO!`
    } else if (getFlags === 2){
        return `BACKUP NAS2 INICIADO!`
    } else if (getFlags === 5) {
        return 'BACKUP LOCAL INICIADO!'
    } else if (getFlags === 404) {
        return 'DISCO NÃO MONTADO!'
    } else if (getFlags === 0) {
        return 'ERRO NÃO ESPECIFICADO!'
    } else if (getFlags === 11) {
        return 'FIM BACKUP NAS1'
    } else if (getFlags === 12) {
        return 'FIM BACKUP NAS2'
    } else if (getFlags === 15) {
        return 'FIM BACKUP LOCAL'
    }
}
function textCreator() {
    return Date()
}

var nodemailer = require('nodemailer');
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
	subject: subjectCreator(flagSum),
	text: textCreator()
}

transporter.sendMail(mailOptions, function(error, info){
	if(error){
		console.log(error)
	} else {
		console.log('Email sent: ' + info.response)
	}
})