const flags = process.argv


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

function subjectCreator(flagSum) {
    if (flagSum === 1) {
        return `BACKUP NAS1 INICIADO!`
    } else if (flagSum === 2){
        return `BACKUP NAS2 INICIADO!`
    } else if (flagSum === 5) {
        return 'BACKUP LOCAL INICIADO!'
    } else if (flagSum === 404) {
        return 'DISCO NÃO MONTADO!'
    } else if (flagSum === 0) {
        return 'ERRO NÃO ESPECIFICADO!'
    } else if (flagSum === 11) {
        return 'FIM BACKUP NAS1'
    } else if (flagSum === 12) {
        return 'FIM BACKUP NAS2'
    } else if (flagSum === 15) {
        return 'FIM BACKUP LOCAL'
    }
}

console.log(flagSum)
console.log(subjectCreator(flagSum))