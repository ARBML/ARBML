$(document).ready(function () {

  var ctx = undefined;
  var canvas = undefined;
  var worker = undefined;
  var imageSrc = undefined;

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
  }


  function loadInitialImg() {
    var img = new Image();

    img.onload = function () {
      var scale = img.width / 512;
      canvas.height = img.height / scale;
      ctx.drawImage(img, 0, 0, 512, img.height / scale);
    };

    img.src = 'images/united_nations_intro.png';
    imageSrc = img.src;
  }

  /*
  * Start the models and warm up
  */
  async function start() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    loadInitialImg();

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

  }

  /*
  * given an image with arabic text, detect text.
  */
  async function detect() {
    const { data: { text } } = await worker.recognize(imageSrc);
    console.log(text);
    $(".output-text").text(text);
  }

  start();

  $(".upload").on("click", function () {
    $(".preview").focus().trigger('click');
  });

  var input = document.getElementById('preview');
  input.addEventListener('change', handleFiles, false);

  $(".submit").on("click", function () {
    detect()
  });
});
