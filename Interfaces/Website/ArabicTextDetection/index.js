$(document).ready(function () {

  var ctx = undefined;
  var canvas = undefined;
  var worker = undefined;
  var imageSrc = undefined;

  /*
  * Choose an image randomly. Exclude the current image.
  */
  function getRandomImage() {
    const availableImages = [
      'images/united_nations_intro.png',
      'images/united_nations_intro_amiri.png',
      'images/wikipedia_arabic_language.png',
      'images/ibn_batouta_cover.png',
      'images/ar_news.png',
      'images/ar_physics.png',
    ];
    var imagesExceptCurrent = availableImages.filter(item => !item.endsWith(imageSrc));
    var index = Math.floor(Math.random() * imagesExceptCurrent.length);
    return imagesExceptCurrent[index];
  }

  /*
  * Draw the uploaded image
  */
  function handleFiles(e) {
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Scale image to width == 512
      var scale = img.width / 512;
      canvas.height = img.height / scale
      ctx.drawImage(img, 0, 0, 512, img.height / scale);
    }
    img.src = url;
    imageSrc = url;
    detect();
  }


  function loadRandomImage() {
    var img = new Image();

    img.onload = function () {
      var scale = img.width / 512;
      canvas.height = img.height / scale;
      ctx.drawImage(img, 0, 0, 512, img.height / scale);
    };

    imageSrc = getRandomImage();
    img.src = imageSrc;
    console.log(`Selected image: ${imageSrc}`)
  }

  /*
  * Start the models and warm up
  */
  async function start() {
    $("#loader-result").hide();

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    loadRandomImage();

    // Load the model
    console.log('Loading Tesseract model');
    worker = await Tesseract.createWorker();
    console.log('Finished loading Tesseract worker');
    await worker.loadLanguage('ara');
    await worker.initialize('ara');
    console.log('Finished initializing model for arabic');

    $("#loader").hide();
    $("#inputs").show();
    $("#outputs").show();
    $("#output").val("");

    detect()

  }

  /*
  * given an image with arabic text, detect text.
  */
  async function detect() {
    $("#loader-result").show();
    $(".output-text").hide()
    console.log(`Start scanning image: ${imageSrc}`)
    const { data: { text } } = await worker.recognize(imageSrc);
    $("#loader-result").hide();
    $(".output-text").show();
    console.log(text);
    $(".output-text").text(text);
  }

  start();

  $(".upload").on("click", function () {
    $(".preview").focus().trigger('click');
  });

  $(".change").on("click", function () {
    loadRandomImage();
    $(".output-text").text('');
    detect()
  });

  var input = document.getElementById('preview');
  input.addEventListener('change', handleFiles, false);

});
