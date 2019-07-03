$(document).ready(function() {
  //map the indices to characters
  char2idx = {
    "\t": 8,
    " ": 28,
    "<EOS>": 3,
    "<GO>": 2,
    "<PAD>": 0,
    "<UNK>": 1,
    "\xa0": 84,
    "«": 74,
    "\xad": 40,
    "°": 5,
    "´": 110,
    "»": 30,
    έ: 69,
    ί: 112,
    α: 47,
    γ: 80,
    ε: 7,
    θ: 51,
    ι: 36,
    κ: 35,
    μ: 54,
    ν: 63,
    ο: 114,
    π: 116,
    ρ: 26,
    σ: 27,
    τ: 78,
    υ: 20,
    χ: 14,
    ψ: 12,
    ω: 89,
    ό: 77,
    ώ: 103,
    ו: 64,
    "؛": 17,
    "؟": 101,
    ء: 120,
    آ: 15,
    أ: 73,
    ؤ: 50,
    إ: 119,
    ئ: 56,
    ا: 68,
    ب: 118,
    ة: 107,
    ت: 22,
    ث: 71,
    ج: 59,
    ح: 86,
    خ: 19,
    د: 104,
    ذ: 97,
    ر: 65,
    ز: 92,
    س: 82,
    ش: 18,
    ص: 75,
    ض: 111,
    ط: 93,
    ظ: 11,
    ع: 95,
    غ: 24,
    ـ: 9,
    ف: 46,
    ق: 38,
    ك: 72,
    ل: 29,
    م: 48,
    ن: 81,
    ه: 49,
    و: 6,
    ى: 39,
    ي: 70,
    "٪": 91,
    "ٰ": 45,
    ٱ: 67,
    ی: 105,
    ے: 37,
    "۵": 109,
    "۷": 106,
    "۸": 10,
    "\u200b": 52,
    "\u200d": 31,
    "\u200e": 117,
    "\u200f": 60,
    "–": 42,
    "‘": 34,
    "’": 41,
    "“": 55,
    "”": 85,
    "•": 62,
    "…": 23,
    "\u202b": 94,
    "\u202c": 108,
    "‰": 115,
    ﮐ: 53,
    "﴾": 44,
    "﴿": 25,
    ﺁ: 16,
    ﺂ: 96,
    ﺃ: 87,
    ﺄ: 61,
    ﺇ: 57,
    ﺈ: 58,
    ﺋ: 100,
    ﺌ: 90,
    ﺑ: 32,
    ﺒ: 113,
    ﺔ: 76,
    ﻓ: 33,
    ﻛ: 13,
    ﻟ: 99,
    ﻠ: 66,
    ﻣ: 43,
    ﻧ: 102,
    ﻴ: 88,
    ﻵ: 83,
    ﻷ: 98,
    ﻹ: 21,
    ﻻ: 79
  };

  idx2char = {
    0: "<PAD>",
    1: "<UNK>",
    2: "<GO>",
    3: "<EOS>",
    4: "ـ",
    5: "َ",
    6: "ُّ",
    7: "َّ",
    8: "ـ",
    9: "ِّ",
    10: "ّ",
    11: "ّْ",
    12: "ٍّ",
    13: "ِّ",
    14: "ٍّ",
    15: "ٌّ",
    16: "َّ",
    17: "ُ",
    18: "ٌّ",
    19: "ًّ",
    20: "ْ",
    21: "ٍ",
    22: "ِ",
    23: "ُّ",
    24: "ًّ",
    25: "ٌ",
    26: "ً",
    27: "ّّ"
  };

  $(".inputs").hide();
  $(".outputs").hide();

  async function start() {
    //load the model
    model = await tf.loadLayersModel("model2/model.json");
    console.log("loading the model ...");
    $("#loader").hide();
    $(".inputs").show("slow");
    $(".outputs").show("slow");
    // warm up
    logits = model.predict(tf.zeros([1, 315]));
  }

  function mapToHarakah(predicted_ids) {
    harakat = [];

    for (var i = 0; i < predicted_ids.length; i++) {
      harakah = idx2char[predicted_ids[i]];
      if (harakah === "<PAD>") continue;
      harakat.push(harakah);
    }

    return harakat;
  }

  function mapToIds(input) {
    input_int = [];

    // loop over the max length
    for (var i = 0; i < 315; i++) {
      if (i >= input.length) input_int.push(0);
      else {
        char = input.charAt(i);

        //maybe the character doesn't exist in the dictionary
        if (char2idx[char] === undefined) input_int.push(char2idx["<UNK>"]);
        else input_int.push(char2idx[char]);
      }
    }

    return input_int;
  }

  function shakkel(input, harakat) {
    result = "";

    for (var i = 0; i < input.length; i++) {
      harakah = harakat[i];

      if (harakah == "<UNK>" || harakah === "ـ") harakah = "";

      result += input.charAt(i) + harakah;
    }
    console.log(result);
    return result;
  }

  function preprocess(input_int) {
    var tensor = tf.tensor(input_int);
    tensor = tf.expandDims(tensor, 0);
    return tensor;
  }

  function postprocess(predictions) {
    logits = tf.squeeze(predictions, 0);
    predicted_ids = tf.argMax(logits, 1).dataSync();

    return predicted_ids;
  }

  async function generate(input) {
    // get input
    // input = document.getElementById("input_text").value;

    // process input
    console.log("input");
    console.log(input);
    input_int = mapToIds(input);
    tensor = preprocess(input_int);
    predictions = model.predict(tensor);

    // process output
    predicted_ids = postprocess(predictions);
    harakat = mapToHarakah(predicted_ids);
    result = shakkel(input, harakat);

    //show output
    // document.getElementById("output_text").innerHTML = result;
    console.log(result);
    $(".output-text").text(result);
  }
  start();
  $(".submit").on("click", function() {
    sentence = $(".inputs textarea").val();
    generate(sentence);
  });
});
