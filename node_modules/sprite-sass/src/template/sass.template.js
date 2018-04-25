'use strict'

var _ = require('lodash')

_.templateSettings.interpolate = /{%=([\s\S]+?)%}/g
_.templateSettings.evaluate = /{%([\s\S]+?)%}/g;
_.templateSettings.escape = /{%-([\s\S]+?)%}/g;

const TEMPLATE = `
{% _.forEach(data.list, function(item) { %}
{% if (data.retina) { %}
\${%= item.name %}: {%= item.x / 2 %}px {%= item.y / 2 %}px {%= item.width / 2 %}px {%= item.height / 2 %}px;
{% } else { %}
\${%= item.name %}: {%= item.x %}px {%= item.y %}px {%= item.width %}px {%= item.height %}px;
{% } %}
{% }); %}

$spriteImage: url({%= data.spriteImage.path %});

@mixin sprite-position-x($sprite, $positionX: 0) {
  $sprite-offset-x: nth($sprite, 1);
  background-position-x: $sprite-offset-x + $positionX;
}

@mixin sprite-position-y($sprite, $positionY: 0) {
  $sprite-offset-y: nth($sprite, 2);
  background-position-y: $sprite-offset-y + $positionY;
}

@mixin sprite-position($sprite, $positionX: 0, $positionY: 0) {
  @include sprite-position-x($sprite, $positionX);  
  @include sprite-position-y($sprite, $positionY)
}

@mixin sprite($sprite, $positionX: 0, $positionY: 0) {
  background-image: $spriteImage;
  @include sprite-position($sprite, $positionX, $positionY);  
  background-repeat: no-repeat;
  {% if (data.retina) { %}
  background-size: {%= data.spriteImage.width / 2 %}px {%= data.spriteImage.height / 2 %}px;
  {% } %}
}
`
module.exports = function(data) {
  // console.log(data)
  let compile = _.template(TEMPLATE, {variable: 'data'})
  
  return compile(data).replace(/\n{1,}\s*\n{1,}/g, '\n\n')  // 之间多余的行
                      .replace(/^\s*/g, '') // 开头的空格和换行
}
