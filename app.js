// include express
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// request and response 
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant : restaurant })
})

app.get('/search', (req, res) => {
  console.log(req.query)

  if(!req.query.keywords) {
    res.redirect('/')
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().replace(/ /g, '').toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.trim().replace(/ /g, '').toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keywords: keywords })

})

// start and listen
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})