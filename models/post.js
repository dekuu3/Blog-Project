const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

//This allows our dompurify to create html and purify it by using the jsdom window object
const createDomPurify = require('dompurify')
const { JSDOM} = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitisedHTML: {
    type: String,
    required: true
  }
})

//validations
postSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  if (this.markdown) {
    this.sanitisedHTML = dompurify.sanitize(marked(this.markdown))
  }

  next()
})

module.exports = mongoose.model('Post', postSchema)