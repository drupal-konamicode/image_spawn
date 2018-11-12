(function ($) {
  $.fn.imageSpawn = function (options) {
    // Set some defaults in case the transfer is not correct.
    let defaults = {
      images: '/libraries/image_spawn/assets/images/druplicon-small.png',
      amount: 500,
      delay: 10,
    };

    // Extend those options.
    options = $.extend(defaults, options);

    // Split all the images on linebreak.
    let images_array = options.images.split(/\n/);

    // Process the images in order to get the screen width and height values.
    let screen_size_array = [];
    images_array.forEach(function (image) {
      let image_object = new Image();
      image_object.onload = function () {
        screen_size_array.push({
          'image': image,
          'width': $(document).width() - this.width,
          'height': $(document).height() - this.height,
        });
      };
      image_object.src = image;
    });

    // We need a slight delay in order for the images to be loaded and calculate
    // the width and height.
    setTimeout(function () {
      // Spawn images as long as we don't reach the requested amount.
      for (let counter = 0; counter < defaults.amount; counter++) {
        // Randomly pick an image.
        let image = images_array[Math.floor(Math.random() * images_array.length)];

        let image_size = $.grep(screen_size_array, function (screen_size_object) {
          return screen_size_object.image === image;
        });

        let x_pos, y_pos;
        if (image_size.length === 1) {
          // Calculate a random location .
          x_pos = Math.floor(Math.random() * image_size[0].width);
          y_pos = Math.floor(Math.random() * image_size[0].height);
        }
        else {
          // Calculate a random location .
          x_pos = Math.floor(Math.random() * $(document).width() - 175);
          y_pos = Math.floor(Math.random() * $(document).height() - 200);
        }

        // Spawn the images with a small delay.
        setTimeout(function () {
          $('body').append('<img src="' + image + '" style="position: absolute; z-index: 666; left: ' + x_pos + 'px; top: ' + y_pos + 'px;"/>');
        }, counter * defaults.delay);
      }
    }, 500);
  }
})(jQuery);
