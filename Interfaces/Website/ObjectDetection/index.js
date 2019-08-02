$(document).ready(function() {

var labels = undefined; 
var ctx = undefined;
var canvas = undefined;
var labels = new Object();

/*
* browse image from the file system
*/
function handleFiles(e) {
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 512, 512);    
    }
    img.src = url;
}

function measureTextWidth(text, font)
{
  var d = document.createElement("span");
  d.font = font;
  d.textContent = text;
  document.body.appendChild(d);
  var emWidth = d.offsetWidth;
  document.body.removeChild(d);
  return emWidth
}
function createBBox(x, y, w, h, name)
{
  //determine the length of the text
  ctx.font = "15px Comic Sans MS";
  const textWidth = measureTextWidth(name, ctx.font)

  const color = stringToColour(name)

  ctx.strokeStyle = color;
  ctx.lineWidth   = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = color;
  ctx.fillRect(x+w-textWidth, y-30, textWidth, 30);

  ctx.fillStyle = "white";
  ctx.fillText(name, x+w-textWidth, y-10); 
}

function loadInitialImg()
{
    //Loading of the home test image - img1
    var img = new Image();

    img.onload = function () {
        //draw background image
        ctx.drawImage(img, 0, 0, 512, 512);
    };

    img.src = 'images/player.jpg';
}

/*
* start the models and warm up 
*/
async function start()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    await loadDict('labels.csv')

    loadInitialImg();

    // Load the model
    model = await cocoSsd.load('lite_mobilenet_v2');
    console.log('finished loading the model');
    
    $("#loader").hide();
    $("#inputs").show();
    $("#outputs").show();
    $("#output").val("");
}


  /*
  * load dictionary of labels
  */
  
 async function loadDict(url)
 {
     await $.ajax({
     url: url,
     dataType: 'text',
     success:function(data){
         console.log(url)
         lst = data.split(/\r\n|\n/)
         for(var i = 0 ; i < lst.length ;i++){
             key = (lst[i]).split(',')[0]
             value = (lst[i]).split(',')[1]
             labels[key] = value;
         }
         
     },})
 }

 function stringToColour (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}


/*
* given a statement in arabic translate to english
*/

async function detect()
{
    //first clear the canvas previous drawing 
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    //store the output and identify the max length of the ouput 
    const predictions = await model.detect(canvas);
    console.log(predictions.length);
    for ( i = 0 ; i < predictions.length ; i++)
    {
      const box = predictions[i].bbox
      const class_name = predictions[i].class
      createBBox(box[0], box[1], box[2], box[3], labels[class_name]);
    }
    
}


  start();

  $(".upload").on("click", function() {
    $(".preview").focus().trigger('click');
  });

  var input = document.getElementById('preview');
  input.addEventListener('change', handleFiles, false);

  $(".submit").on("click", function() {
    detect()
  });
});
