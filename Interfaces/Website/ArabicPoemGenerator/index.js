$(document).ready(function() {

  //map the indices to characters
  idx2char = [
    "\t",
    "\n",
    " ",
    "ء",
    "آ",
    "أ",
    "ؤ",
    "إ",
    "ئ",
    "ا",
    "ب",
    "ة",
    "ت",
    "ث",
    "ج",
    "ح",
    "خ",
    "د",
    "ذ",
    "ر",
    "ز",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ك",
    "ل",
    "م",
    "ن",
    "ه",
    "و",
    "ى",
    "ي"
  ];
  //map the characters to indices 
  char2idx = {
    "\t": 0,
    "\n": 1,
    " ": 2,
    ء: 3,
    آ: 4,
    أ: 5,
    ؤ: 6,
    إ: 7,
    ئ: 8,
    ا: 9,
    ب: 10,
    ة: 11,
    ت: 12,
    ث: 13,
    ج: 14,
    ح: 15,
    خ: 16,
    د: 17,
    ذ: 18,
    ر: 19,
    ز: 20,
    س: 21,
    ش: 22,
    ص: 23,
    ض: 24,
    ط: 25,
    ظ: 26,
    ع: 27,
    غ: 28,
    ف: 29,
    ق: 30,
    ك: 31,
    ل: 32,
    م: 33,
    ن: 34,
    ه: 35,
    و: 36,
    ى: 37,
    ي: 38
  };

  //some initialization
  model = null;
  $(".inputs").hide();
  $(".outputs").hide();

  //start the model 
  start();

  /* 
   * This function loads the model to the memory. 
   *
   */
  async function start() {
    //load the model
    model = await tf.loadLayersModel("model/model.json");
    $("#loader").hide();
    $(".inputs").show("slow");
    $(".outputs").show("slow");
  }

  /* 
   * Generate the text once the start button is pressed
   *
   */

  $(".submit").on("click", function() {
    generate_text(model);
  });

  /* 
   * generate the text using the loaded model 
   *
   */

  async function generate_text(model) {
    
    //take initial seed 
    start_string = $(".inputs input").val();

    //number of characters to generate 
    num_generate = 150;

    //map the input to indices 
    input_eval = [];
    for (var i = 0; i < start_string.length; i++) {
      input_eval.push(char2idx[start_string.charAt(i)]);
    }

    //preprocess the input
    input_eval = tf.tensor(input_eval);
    input_eval = tf.expandDims(input_eval, 0);

    text_generated = [];

    $(".output-text").text(start_string);
    
    let j = 0;

    //loop until we exceed num_generated and we have a new line
    while(true) {
      j+=1;

      //get predictions for the input 
      predictions = model.predict(input_eval);

      //postprocess the results
      predictions = tf.squeeze(predictions, 0);

      //we sample the next char so we don't loop
      predicted_id = tf.multinomial(predictions, (num_samples = 1));

      //postprocessing steps
      predicted_id = predicted_id.dataSync()[0];
      input_eval = tf.expandDims([predicted_id], 0);

      //get the next char 
      next_char = idx2char[predicted_id];
      text_generated.push(idx2char[predicted_id]);

      //break if we exceed the maximum and we have a new line 
      if ((next_char === "\n") && (j > num_generate )){
        break
      }

      //ignore tab 
      if (next_char === "\t") continue;

      //show the output 
      $(".output-text").text($(".output-text").text() + next_char);

      //allow th gui to show the results 
      await tf.nextFrame();
    }
  }
});