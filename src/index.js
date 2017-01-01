const getMenu = require('./getMenu')

getMenu()
  .then(products => {
    console.log(products)
  })
