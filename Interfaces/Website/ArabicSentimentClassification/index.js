$(document).ready(function() {
  var word2idx = new Object();
  var model = undefined
  max_tokens = 113 

  /*
  * start the models and warm up 
  */
  
  async function start()
  {
      // load the dictionaries
      await loadDict('word2idx.csv')
  
      // load the models
      model = await tf.loadLayersModel("model/model.json", false);
      console.log('finished loading the model ...')
      
      output = model.predict(tf.zeros([1, max_tokens]))
      console.log('warming up ...')
      $("#loader").hide();
      $(".inputs").show();
      $(".outputs").show();
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
  
  async function classify(sentence)
  {
      
      // convert the input statement to a sequence of integers
      sequence = create_sequences(sentence)
  
      var input = tf.tensor(sequence).asType("int32")
      input = tf.expandDims(input, 0)
      
  
      input.print()
      pred = model.predict(input).dataSync()
      
      // return the output
      result = ""
      if (pred >= 0.5)
          result = "إيجابي بنسبة %" + Math.round(pred * 100)
      else
          result = "سلبي بنسبة %" + (100 -Math.round(pred * 100))
      //show output 
      $("#output").val(result);
  }
  start();
  $(".submit").on("click", function() {
      sentence = $("#input").val();
      classify(sentence);
    });
  });
  