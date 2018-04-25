#SPRITE-SASS

Use sass with image sprite, and allow you to define the position of every sprite element.

> A modular image sprite generator.
  
> Mainly used for mobile develop.

> Generates sprites and proper sass files

> Change sprite position freely

##Install

Install with [npm](https://www.npmjs.com/package/sprite-sass)
```sh
npm install sprite-sass --save-dev
```

##Usage
###Programatic usage
```js
var spriteSass = require('sprite-sass')
spriteSass(options, cb)
```

###With [Gulp](http://gulpjs.com)
In future release
###With [Grunt](http://gruntjs.com)
In future release

##Options

* **direction**: The direction of sprite image(vertical|horizontal) [*Default: vertical*]
* **src**: The glob string array of image sources that generates sprite image.
* **out**: The path of directory to write sprite file to.
* **gap**: Object that configure margin length in pixel about image, include vertical and horizontal.


##Example
```
example
  | - icons
       | - index
       | - list
```
`index` and `list` are image folds, and the options:

```javascript
var options = {
  direction: 'horizontal',
  src: ["./**/*.png", "!./*.png", "!./public/**"],
  out: path.join(__dirname, 'public'),
  gap: {
    vertical: 100,
    horizontal: 100
  }
}
```

Then `sprite-sass` will generate following sprites and sass in ./public
```
example 
  | - public
      | - img 
          | - sprite-index.png
          | - sprite-list.png
      | - scss
          | - sprite-index.scss
          | - sprite-list.png
```

Also you can use `npm run example` to see.
##Sass file
Use previous step result, such as `sprite-index.scss`:

```sass
@mixin sprite($sprite, $positionX: 0, $positionY: 0) {
  background-image: $spriteImage;
  @include sprite-position($sprite, $positionX, $positionY);  
  background-repeat: no-repeat;
  background-size: 234px 9px;
}
```

Note that `sprite` need three parameters:
* **$sprite**: The variable of sprite element 
* **$positionX**: If you want adjust the position of sprite element, pass number with pixel param just like change background-position-x based $sprite.
* **$positionY**: If you want adjust the position of sprite element, pass pixel number just like change background-position-y based $sprite.

For example:

```sass
@import "./public/scss/icons/sprite-index";

.icon {
  @include sprite($arrow-down, -1px, -1px);  
}
```

Now, The position of background image of `.icon` is left 1px and top 1px compare base status.
