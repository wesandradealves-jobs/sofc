'use strict';

var _ = require('lodash');

_.templateSettings.interpolate = /{%=([\s\S]+?)%}/g;
_.templateSettings.evaluate = /{%([\s\S]+?)%}/g;
_.templateSettings.escape = /{%-([\s\S]+?)%}/g;

var TEMPLATE = '\n{% _.forEach(data.list, function(item) { %}\n{% if (data.retina) { %}\n${%= item.name %}: {%= item.x / 2 %}px {%= item.y / 2 %}px {%= item.width / 2 %}px {%= item.height / 2 %}px;\n{% } else { %}\n${%= item.name %}: {%= item.x %}px {%= item.y %}px {%= item.width %}px {%= item.height %}px;\n{% } %}\n{% }); %}\n\n$spriteImage: url({%= data.spriteImage.path %});\n\n@mixin sprite-position-x($sprite, $positionX: 0) {\n  $sprite-offset-x: nth($sprite, 1);\n  background-position-x: $sprite-offset-x + $positionX;\n}\n\n@mixin sprite-position-y($sprite, $positionY: 0) {\n  $sprite-offset-y: nth($sprite, 2);\n  background-position-y: $sprite-offset-y + $positionY;\n}\n\n@mixin sprite-position($sprite, $positionX: 0, $positionY: 0) {\n  @include sprite-position-x($sprite, $positionX);  \n  @include sprite-position-y($sprite, $positionY)\n}\n\n@mixin sprite($sprite, $positionX: 0, $positionY: 0) {\n  background-image: $spriteImage;\n  @include sprite-position($sprite, $positionX, $positionY);  \n  background-repeat: no-repeat;\n  {% if (data.retina) { %}\n  background-size: {%= data.spriteImage.width / 2 %}px {%= data.spriteImage.height / 2 %}px;\n  {% } %}\n}\n';
module.exports = function (data) {
  // console.log(data)
  var compile = _.template(TEMPLATE, { variable: 'data' });

  return compile(data).replace(/\n{1,}\s*\n{1,}/g, '\n\n') // 之间多余的行
  .replace(/^\s*/g, ''); // 开头的空格和换行
};