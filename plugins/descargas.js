import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn: star, command, args, text }) => {
  if (!text) return star.reply(m.chat, '🍭 Ingresa el título de una canción o video de YouTube.', m)
  await m.react('🕓')
  
  try {
    let res = await search(args.join(" "))
    let videoUrl = 'https://youtu.be/' + res[0].videoId
    let img = await (await fetch(`${res[0].image}`)).buffer()
    
    let txt = '*ゲ◜៹ YouTube Audio Downloader ៹◞ゲ*\n\n'
       txt += `›Título : ${res[0].title}\n`
       txt += `›Duración : ${secondString(res[0].duration.seconds)}\n`
       txt += `›Publicado : ${eYear(res[0].ago)}\n`
       txt += `›Canal : ${res[0].author.name || 'Desconocido'}\n`
       txt += `›Url : ${videoUrl}\n\n`
       txt += `🔰 Descargando en formato de audio...`

    await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
    await star.sendFile(m.chat, videoUrl, `${res[0].title}.mp3`, `🎶 Aquí tienes tu audio:\n${videoUrl}`, m, { asDocument: true })

    await m.react('✅')
  } catch {
    await m.react('✖️')
  }
}

handler.help = ['playaudio *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['playaudio']
// handler.register = true 
export default handler

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
  return search.videos
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' Día, ' : ' Días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' Hora, ' : ' Horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' Minuto, ' : ' Minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' Segundo' : ' Segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function eYear(txt) {
    if (!txt) {
        return '×'
    }
    if (txt.includes('month ago')) {
        var T = txt.replace("month ago", "").trim()
        var L = 'hace '  + T + ' mes'
        return L
    }
    if (txt.includes('months ago')) {
        var T = txt.replace("months ago", "").trim()
        var L = 'hace ' + T + ' meses'
        return L
    }
    if (txt.includes('year ago')) {
        var T = txt.replace("year ago", "").trim()
        var L = 'hace ' + T + ' año'
        return L
    }
    if (txt.includes('years ago')) {
        var T = txt.replace("years ago", "").trim()
        var L = 'hace ' + T + ' años'
        return L
    }
    if (txt.includes('hour ago')) {
        var T = txt.replace("hour ago", "").trim()
        var L = 'hace ' + T + ' hora'
        return L
    }
    if (txt.includes('hours ago')) {
        var T = txt.replace("hours ago", "").trim()
        var L = 'hace ' + T + ' horas'
        return L
    }
    if (txt.includes('minute ago')) {
        var T = txt.replace("minute ago", "").trim()
        var L = 'hace ' + T + ' minuto'
        return L
    }
    if (txt.includes('minutes ago')) {
        var T = txt.replace("minutes ago", "").trim()
        var L = 'hace ' + T + ' minutos'
        return L
    }
    if (txt.includes('day ago')) {
        var T = txt.replace("day ago", "").trim()
        var L = 'hace ' + T + ' día'
        return L
    }
    if (txt.includes('days ago')) {
        var T = txt.replace("days ago", "").trim()
        var L = 'hace ' + T + ' días'
        return L
    }
    return txt
}
