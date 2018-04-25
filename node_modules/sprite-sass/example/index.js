var spriteSass = require('../index')
var path = require('path')

spriteSass({
  direction: 'horizontal',
  src: ["./**/*.png", "!./*.png", "!./public/**"],
  out: path.join(__dirname, 'public'),
  gap: {
    vertical: 100,
    horizontal: 100
  }
})

