'use strict';

var template = require('./template');
var fs = require('fs');
var images = require('images');
var path = require('path');
var globby = require('globby');
var writeFile = require('write');
var mkdirp = require('mkdirp');
var _ = require('lodash');

module.exports = function (opt, callback) {
  var out = opt.out;
  var dest = opt.dest;
  var verticalGap = 0;
  var horizontalGap = 0;

  // sprite direction
  var direction = 'vertical';

  if (opt.gap) {
    verticalGap = opt.gap.vertical || 0;
    horizontalGap = opt.gap.horizontal || 0;
  }

  if (opt.direction == 'horizontal') {
    direction = "horizontal";
  }

  var imgDirPath = path.join(out, 'img');
  var scssDirPath = path.join(out, 'scss');

  _.forEach([out, imgDirPath, scssDirPath], checkDirExist);

  var files = globby.sync(opt.src);
  var dirs = _.uniq(files.map(function (file) {
    return path.dirname(file);
  }));

  dirs.forEach(function (dir) {
    var spriteImage;
    var sprites = [];
    var width = 0;
    var height = 0;

    var imgs = globby.sync(dir + '/*.png');
    var fileName = dir.split('/').pop();

    var dirFileName = dir.split('/').slice(0, -1).join('/');

    if (dirFileName) {
      _.forEach([path.join(imgDirPath, dirFileName), path.join(scssDirPath, dirFileName)], checkDirExist);
    } else {
      dirFileName = path.join(dir, '..');
    }

    imgs.forEach(function (file) {
      var img = images(file);

      if (direction == 'vertical') {
        if (img.width() > width) {
          width = img.width();
        }

        sprites.push({
          img: img,
          name: path.basename(file),
          x: horizontalGap,
          y: height,
          width: img.width(),
          height: img.height()
        });

        height += verticalGap + img.height();
      } else {
        if (img.height() > height) {
          height = img.height();
        }

        sprites.push({
          img: img,
          dir: path.dirname(file),
          name: path.basename(file),
          x: width,
          y: verticalGap,
          width: img.width(),
          height: img.height()
        });

        width += horizontalGap + img.width();
      }
    });

    spriteImage = images(width + horizontalGap, height + verticalGap);

    sprites.forEach(function (obj) {
      spriteImage.draw(obj.img, obj.x, obj.y);
    });

    console.log(out, dirFileName);

    var templateData = {
      retina: true,
      spriteImage: {
        path: _.repeat('../', dirFileName.split('/').length) + 'img/' + path.join(dirFileName, 'sprite-' + fileName + '.png'),
        width: width,
        height: height
      },
      list: sprites
    };

    spriteImage.save(path.join(imgDirPath, dirFileName, 'sprite-' + fileName + '.png'));
    writeFile.sync(path.join(scssDirPath, dirFileName, 'sprite-' + fileName + '.scss'), template({ data: templateData, type: 'sass' }));
  });

  // 分组
  function checkDirExist(dirname) {
    try {
      // if not exist, throw exception
      fs.accessSync(dirname);
    } catch (err) {
      mkdirp.sync(dirname);
    }
  }
};