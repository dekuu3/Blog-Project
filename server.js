const express = require('express')
const mongoose = require('mongoose')
const Post = require('./models/post')
const postsRouter = require('./routes/posts')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', 
{ useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const posts = await Post.find().sort({
    createdAt: 'desc' 
  })
  res.render('posts/index', { posts: posts })
})

app.use('/posts', postsRouter)

app.listen(5000);  