$(document).ready(function() {

    label2meter = 
    {0: 'السريع',
    1: 'الكامل',
    2: 'المتقارب',
    3: 'المتدارك',
    4: 'المنسرح',
    5: 'المديد',
    6: 'المجتث',
    7: 'الرمل',
    8: 'البسيط',
    9: 'الخفيف',
    10: 'الطويل',
    11: 'الوافر',
    12: 'الهزج',
    13: 'الرجز'}
    
  var char2idx = new Object();
  var model = undefined
  max_tokens = 100 

  /*
  * start the models and warm up 
  */
  
  
  async function start()
  {
      // load the dictionaries
      await loadDict('char2idx.csv')

      // load the models
      model = await tf.loadLayersModel("model2/model.json", false);
      console.log('finished loading the model ...')
      output = model.predict(tf.ones([1, max_tokens]))
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
              char2idx[key] = parseInt(value)

          }
          
      },})
  }
  
  /*
  * clearn arabic text
  */

  function clean(text) {
    preprocessed_text = text;
    preprocessed_text = strip_harakat(preprocessed_text);
    preprocessed_text = strip_tatweel(preprocessed_text);
    preprocessed_text = normalize_hamza(preprocessed_text);
    preprocessed_text = normalize_ligature(preprocessed_text);
    preprocessed_text = execlude_special_chars(preprocessed_text);
    return preprocessed_text;
  }

  /*
  * create a sequence of integers using word2idx from a statement
  */
  
  function create_sequences(sentence)
  {
      
      let words = sentence.trim().split("")
      seq = Array.from(Array(max_tokens), () => 0) 
      for(var i= 0 ; i< words.length ; i++)
      {
          seq[i] = char2idx[words[i]]
      }
      return seq
  }
  
  /*
  * given a statement in arabic translate to english
  */
  
  async function classify(text)
  {
      let sentence = clean(text)
      let sequence = create_sequences(sentence)
      var input = tf.tensor(sequence).asType("int32")
      input = tf.expandDims(input, 0)
      let logits = model.predict(input)
      label = tf.argMax(logits, 1).dataSync()
      //show output 
      $("#output").val(label2meter[label[0]]);
  }
  start();
  $(".submit").on("click", function() {
      sentence = $("#input").val();
      classify(sentence);
    });
  });
  