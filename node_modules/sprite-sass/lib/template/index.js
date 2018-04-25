'use strict';

var _ = require('lodash');

var template = {
  sass: require('./sass.template.js')
};

module.exports = function () {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments[1];

  var ret = "";

  if (opt.data) {
    var data = opt.data;

    if (opt.type && template[opt.type]) {
      ret = template[opt.type](data);
    } else {
      // Todo
    }
  }

  return ret;
};