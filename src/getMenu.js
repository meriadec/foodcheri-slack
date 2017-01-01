const Nightmare = require('nightmare')

const FOODCHERI_URL = 'https://www.foodcheri.com/'

module.exports = function getMenu () {

  // please, no need to wait 1 year to get my results when testing
  if (process.env.MOCK) {
    return Promise.resolve(require('../mock.json'))
  }

  console.log('>> creating scraper...')
  const nightmare = Nightmare()

  console.log('>> launching scraper...')
  return nightmare
    .goto(FOODCHERI_URL)
    .evaluate(() => {

      function treatProduct (node) {

        // ensure node is really a menu node
        if (!node.getAttribute('data-id-product')) { return }

        // get title
        const titleNode = node.querySelector('.title')
        if (!titleNode) { return }
        const title = titleNode.innerHTML.replace(/&amp;/g, '&')

        // get image
        const imageNode = node.querySelector('.menu-photo img')
        if (!imageNode) { return }
        const src = imageNode.getAttribute('src')

        // get desc
        const descNode = node.querySelector('.shortened-text')

        return {
          title: title,
          image: src,
          desc: $(descNode).text(),
        }
      }

      const products = document.querySelectorAll('.product')
      const parsed = Array.prototype.map.call(products, treatProduct)

      return parsed.filter(e => e)

    })
    .end()
    .catch(err => {
      console.log('>> err:', err, err.stack)
      return []
    })
}
