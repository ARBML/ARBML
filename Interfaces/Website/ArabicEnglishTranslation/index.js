$(document).ready(function() {
  var word2idx = new Object();
var idx2word = new Object();

var encoder = undefined
var decoder = undefined

max_tokens = 17
start_token = 393

/*
* start the models and warm up 
*/

async function start()
{
    // load the dictionaries
    await loadDict('word2idx.csv')
    await loadDict('idx2word.csv')

    // load the models
    decoder = await tf.loadLayersModel("decoder/model.json");
    console.log('finished loading the decoder ...')

    encoder = await tf.loadLayersModel("encoder/model.json");
    console.log('finished loading the encoder ...')

    

    // warm up 
    enc_output = tf.zeros([64, max_tokens, 1024])
    dec_hidden = tf.zeros([64, 1024])
    dec_input = tf.zeros([64, 1])
    logits = decoder.predict([dec_input, dec_hidden, enc_output]);

    output = encoder.predict(tf.zeros([1, max_tokens]))

    $("#loader").hide();
    $(".inputs").show();
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
            if (url === "word2idx.csv")
                word2idx[key] = parseInt(value)
            else
                idx2word[key] = value
        }
        
    },})
}

/*
* create a sequence of integers using word2idx from a statement
*/

function create_sequences(sentence)
{
    
    let words = sentence.trim().split(/\s+/)
    seq = Array.from(Array(max_tokens), () => 0) 
    for(var i= 0 ; i< words.length ; i++)
    {
        seq[i] = word2idx[words[i]]
    }
    return seq
}

/*
* given a statement in arabic translate to english
*/

async function translate(sentence)
{
        
    // convert the input statement to a sequence of integers
    sequence = create_sequences('<start> ' + sentence + ' <end>')
    inputs = tf.tensor([sequence])
    
    // store the output and identify the max length of the ouput 
    result = ''
    max_out_length = 2*sentence.length 
    i = 0 

    // pass through the encoder 
    let output = encoder.predict(inputs)
    enc_out= output[0]
    enc_hidden = output[1]

    // prepare decoder inputs 
    var dec_hidden = enc_hidden
    var dec_input = tf.expandDims([start_token], 0)
    
    // loop until we break or reach the max 
    while(true && (i < max_out_length))
    {
        // pass the decoder
        output  = decoder.predict([dec_input, dec_hidden, enc_out])

        predictions = output[0]
        dec_hidden  = output[1]

        // post process the output 
        predicted_id = tf.argMax(predictions, axis = 1).dataSync()[0]
        

        if (idx2word[predicted_id] == "<end>")
            break
        
        result += idx2word[predicted_id] + ' '
        // prepare the input for the next iteration 
        dec_input = tf.expandDims([predicted_id], 0)
        i += 1

    }
    console.log(result)
    //show output 
    $("#output").val(result);
    
}

  start();
  $(".submit").on("click", function() {
    sentence = $("#input").val();
    translate(sentence);
  });
});
