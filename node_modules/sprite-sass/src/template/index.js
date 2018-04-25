var _ = require('lodash')

var template = {
  sass: require('./sass.template.js')
}

module.exports = function(opt = {}, callback) {
  var ret = ""

  if (opt.data) {
    var data = opt.data

    if (opt.type && template[opt.type]) {
      ret = template[opt.type](data) 
    } else {
      // Todo
    }
  }

  return ret
}
