$(document).ready(function() {
  //map the indices to characters
  word2index = null;

  $(".inputs").hide();
  $(".outputs").hide();
  $("#before-output-loader").hide();

  async function start() {
    //load the model
    model = await tf.loadLayersModel("model/model.json");
    console.log("loading the model ...");
    $("#base-loader").hide();
    // get words indexes
    console.log("fetching words indexes:");
    wordsIndexJsonFile = "word_index.json";
    word2index = await (await fetch(wordsIndexJsonFile)).text();
    word2index = JSON.parse(word2index);
    console.log(word2index);
    console.log("model loaded,");
    $(".inputs").show("slow");
  }

  function preprocess(input_int) {
    var tensor = tf.tensor(input_int);
    tensor = tf.expandDims(tensor, 0);
    return tensor;
  }

  function postprocess(predictions) {
    console.log(predictions);
    logits = tf.squeeze(predictions, 0);
    predicted_ids = tf.argMax(logits, 0).dataSync();

    return predicted_ids;
  }

  function strip_harakat(text) {
    cleanedText = text;
    cleanedText = cleanedText.replace(/َ|ً|ُ|ٌ|ِ|ٍ|~|ْ|ّ/g, "");
    return cleanedText;
  }

  function strip_tatweel(text) {
    cleanedText = text;
    cleanedText = cleanedText.replace(/ـ/g, "");
    return cleanedText;
  }

  function normalize_hamza(text) {
    cleanedText = text;
    if (cleanedText[0] == "\u0622") {
      if (
        cleanedText.length >= 3 &&
        !/َ|ً|ُ|ٌ|ِ|ٍ|~|ْ|ّ/.test(cleanedText[1]) &&
        (cleanedText[2] == "" || cleanedText.length == 3)
      ) {
        cleanedText = cleanedText = "ء" + "ا" + cleanedText.slice(2, -1);
      } else {
        cleanedText = "ء" + "ء" + cleanedText.slice(2, -1);
      }
    }
    cleanedText = cleanedText.replace(/\u0622/g, "ءء");
    cleanedText = cleanedText.replace(
      /ء|\u0624|\u0626|\u0654|\u0655|\u0625|\u0623/g,
      "ء"
    );
    return cleanedText;
  }

  function normalize_ligature(text) {
    cleanedText = text;
    cleanedText = cleanedText.replace(
      /\ufefb|\ufef7|\ufef9|\ufef5/g,
      "\u0644\u0627"
    );
    return cleanedText;
  }

  function execlude_special_chars(text) {
    cleanedText = text;
    execluded_chars =
      "!()*-.1234567890:=o[]«»;؛,،~?؟#\u200f\ufeff\t\n\u200cabcdefjhijklmnopqrstuvwxyz٠١٢٣٤٥٦٧٨٩{}_^÷\"'<>.×*\u200d2–4؟\u200c«\uf020)\u200f.(\uf02d,*»!?\uf02e:؛×\uf03a";
    for (var i = 0; i < execluded_chars.length; i++) {
      cleanedText = cleanedText.replace(/execluded_chars[i]/g, "");
    }
    return cleanedText;
  }

  function input_preprocessing(text) {
    preprocessed_text = text;
    preprocessed_text = strip_harakat(preprocessed_text);
    preprocessed_text = strip_tatweel(preprocessed_text);
    preprocessed_text = normalize_hamza(preprocessed_text);
    preprocessed_text = normalize_ligature(preprocessed_text);
    preprocessed_text = execlude_special_chars(preprocessed_text);
    return preprocessed_text;
  }

  function text_to_sequences(text) {
    tokens = text.split(" ");
    sequence = [];
    tokens.forEach(element => {
      if (word2index[element]) {
        sequence.push(word2index[element]);
      }
    });
    while (sequence.length < 44) {
      sequence.push(-1);
    }
    return sequence.slice(0, 45);
  }

  function classifyResults(id) {
    if (id == 0) {
      return "العصر القديم، من الجاهلية وحتى الدولة العباسية";
    } else if (id == 1) {
      return "العصر الأوسط، من بعد الدولة العباسية وحتى العثمانية";
    } else if (id == 2) {
      return " العصر الحديث، من بعد الدولة العثمانية ";
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function generate() {
    // show the loader
    $("#before-output-loader").show();
    console.log("starting the inference function");
    console.log("wait a little for the loader to show");
    await sleep(250);
    console.log("continue");
    // //get input
    text = "";
    $(".shatr").each((index, shatr) => {
      text += $(shatr).val();
      text += " ";
      if (index % 2 == 1) {
        text += " ";
      }
    });

    // process input
    console.log("input text:");
    console.log(text);

    if (!text) {
      alert("قم بإدخال ثلاثة أبيات أولا");
      return;
    }

    // preprocess input
    preprocessed_input = input_preprocessing(text);
    input_sequence = text_to_sequences(preprocessed_input);
    // console.log([input_sequence]);
    tensor = preprocess(input_sequence);
    predictions = model.predict(tensor);

    // process output
    predicted_id = postprocess(predictions);

    result = classifyResults(predicted_id);
    // show output
    console.log(result);
    $(".output-text").text(result);
    $("#before-output-loader").hide();
    console.log("wait a little for the loader to hide");
    await sleep(250);
    console.log("show the final results:");
    $(".outputs").show();
  }
  start();
  $(".submit").on("click", function() {
    generate();
  });
});
