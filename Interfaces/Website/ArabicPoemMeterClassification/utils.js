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
      "!()*-.1234567890:=o[]«»;؛,،~?؟\u200f\ufeff\t\n\u200cabcdefjhijklmnopqrstuvwxyz٠١٢٣٤٥٦٧٨٩{}_^÷\"'<>.×*\u200d2–4؟\u200c«\uf020)\u200f.(\uf02d,*»!?\uf02e:؛×\uf03a";
    for (var i = 0; i < execluded_chars.length; i++) {
      cleanedText = cleanedText.replace(/execluded_chars[i]/g, "");
    }
    return cleanedText;
  }
