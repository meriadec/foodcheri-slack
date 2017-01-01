var WebClient = require('@slack/client').WebClient

const getMenu = require('./getMenu')

const TOKEN = process.env.TOKEN
const HEADLINE = ':spaghetti: Here is your daily Foodcheri menu :spaghetti:'

getMenu()
  .then(products => {

    console.log('>> posting to slack...')

    const web = new WebClient(TOKEN)

    const attachments = products.map(p => ({
      fallback: p.title,
      title: p.title,
      text: p.desc,
      thumb_url: p.image,
    }))

    const body = { attachments: attachments }

    web.chat.postMessage('@mpillet', HEADLINE, body, (err) => {
      if (err) { console.log('Error:', err) }
    })

  })
