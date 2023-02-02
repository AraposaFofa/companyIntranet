/**
 * USAGE:
 * Type 'node yt.js ${video URL}' and it will be download on the same dir
 */
const fs = require('fs')
const ytdl = require("ytdl-core");

function youtubeDownloader(aURL, type) {
    aURL = aURL.replaceAll('"', "")
    type = type.replaceAll('"', "")
    const download = ytdl( ytdl.getVideoID(aURL), { filter: `${type}only` })
    console.log('INiciando!')
    ytdl.getBasicInfo(aURL).then( response => {
            download.pipe(fs.createWriteStream(`./yt-downloads/baixados/${type}/${response.videoDetails.title}.mp4`))
        })
}

module.exports = { youtubeDownloader }