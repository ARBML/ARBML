$(document).ready(function() {
  
var word2idx = new Object();
var idx2word = new Object();

var encoder = undefined
var decoder = undefined
var vocab_size = 50000

/*
* start the models and warm up 
*/

async function start()
{
    // load the dictionaries
    await loadDict('word2idx.csv')
    await loadDict('idx2word.csv')

    // load the models
    encoder = await tf.loadLayersModel("model_quantized/model.json");
    console.log('finished loading the encoder ...')    

    // warm up 
    enc_input = tf.zeros([10, 1])
    encoder.summary()
    logits = encoder.predict([enc_input, enc_input]);
    console.log("warmed up ")

    $("#loader").hide();
    $(".inputs").show();
    $(".outputs").show();
    $("#output").val("");
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
* find the similar words
*/


function find_similar(word){
    let word_idx = word2idx[word]
    
    if (word_idx == undefined)
        return "لا توجد نتيجة"
    var in_arr2 = tf.range(0, vocab_size, 1)
    var in_arr1 = tf.fill([vocab_size, 1], word_idx)

    var out = encoder.predict([in_arr1, in_arr2])
    out = out.reshape([vocab_size])

    //find the top k similar indices 
    const {values, indices} = tf.topk(out, 5)

    //get the results from the dictionary 
    let topk_words = indices.dataSync()
    console.log(topk_words)
    let result = " "
    var post_char = " ، "
    var i;

    for(i=0 ; i< topk_words.length -1 ; i++)
        result += (idx2word[topk_words[i]]+ post_char)
    return result + idx2word[topk_words[i]]
}
/*
* given a statement in arabic translate to english
*/

async function embed(word)
{
    let result = find_similar(word)

    //show output 
    $("#output").val(result);
    
}
  start();
  $(".submit").on("click", function() {
      word = $("#input").val();
      embed(word);
    });
  });
  