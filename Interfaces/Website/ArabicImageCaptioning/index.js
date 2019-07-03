$(document).ready(function() {
var idx2word = new Object();

var encoder = undefined
var decoder = undefined

/*
* browse image from the file system
*/

function previewFile(){
    var preview = document.querySelector('img'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
  }

/*
* start the models and warm up 
*/

async function start()
{

    await loadDict("idx2word.csv")
    console.log("finished loading the dictionary")
    console.log(idx2word)
    // load the models
    decoder = await tf.loadLayersModel("decoder/model.json");
    console.log('finished loading the decoder ...')
    
    encoder = await tf.loadLayersModel("encoder/model.json");
    console.log('finished loading the encoder ...')

    //warm up 
    enc_output = tf.zeros([1, 49, 256])
    dec_hidden = tf.zeros([1, 256])
    dec_input = tf.zeros([1, 1])
    logits = decoder.predict([dec_input, dec_hidden, enc_output]);

    output = encoder.predict(tf.zeros([1, 224, 224, 3]))
    console.log("finished warming up")

    $("#loader").hide();
    $("#inputs").show();
    $("#outputs").show();
}

/*
* load word2idx and idx2word
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
            idx2word[key] = value
        }
        
    },})
}

/*
* Get image and preprocess it 
*/
function getImageTensor(){
    let img = document.getElementById("img");
    //convert to tensor 
    var tensor = tf.browser.fromPixels(img);
    tensor = tf.expandDims(tensor, 0)
    tensor = tensor.div(tf.scalar(255))
    tensor = tf.image.resizeBilinear(tensor, [224, 224])
    return tensor
}

/*
* given a statement in arabic translate to english
*/

async function caption()
{
    // store the output and identify the max length of the ouput 

    let image_tensor = getImageTensor()
    var result = ''
    let max_out_length = 10
    i = 0 

    // pass through the encoder 
    let features = encoder.predict(image_tensor)

    let dec_input = tf.expandDims([2], 0)
    var hidden = tf.zeros([1, 256])

    // loop until we break or reach the max 
    while(true && (i < max_out_length))
    {
        // pass the decoder
        output = decoder.predict([dec_input, hidden, features])

        hidden = output[1]
        predictions = output[0]

        // post process the output 
        predicted_id = tf.argMax(predictions, axis = 1).dataSync()[0]

        if (idx2word[predicted_id] === "<end>")
            break
        
        if (idx2word[predicted_id] === "<unk>")
            continue

        result += idx2word[predicted_id] + ' '
        
        // prepare the input for the next iteration 
        dec_input = tf.expandDims([predicted_id], 0)
        i += 1

    }
    //show output 
    $(".output-text").text(result);
    
}
  start();

  $(".upload").on("click", function() {
    $(".preview").focus().trigger('click')
  });

  $(".preview").on("change", function() {
    previewFile()
  });

  $(".submit").on("click", function() {
    caption()
  });
});
