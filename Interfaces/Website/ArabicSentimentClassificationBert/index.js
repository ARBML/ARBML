$(document).ready(function() {
    VOCAB_URL = 'model/vocab.json'
    const SEPERATOR = '▁';
    const UNK_INDEX = 1;
    const CLS_INDEX = 2;
    const CLS_TOKEN = '[CLS]';
    const SEP_INDEX = 3;
    const SEP_TOKEN = '[SEP]';
    const NFKC_TOKEN = 'NFKC';
    const MAX_SEQ_LEN = 128 ;
    let models;

    class TrieNode {
      children = {}
      constructor(key) {}
    
      getWord() {
        const output = [];
        let node= this;
    
        while (node != null) {
          if (node.key != null) {
            output.unshift(node.key);
          }
          node = node.parent;
        }
    
        return [output, this.score, this.index];
      }
    }
    
    class Trie {
      root = new TrieNode(null);
    
      insert(word, score, index) {
        let node = this.root;
    
        const symbols = [];
        for (const symbol of word) {
          symbols.push(symbol);
        }
    
        for (let i = 0; i < symbols.length; i++) {
          if (node.children[symbols[i]] == null) {
            node.children[symbols[i]] = new TrieNode(symbols[i]);
            node.children[symbols[i]].parent = node;
          }
    
          node = node.children[symbols[i]];
    
          if (i === symbols.length - 1) {
            node.end = true;
            node.score = score;
            node.index = index;
          }
        }
      }
    
    
      find(token) {
        let node = this.root;
        let iter = 0;
    
        while (iter < token.length && node != null) {
          node = node.children[token[iter]];
          iter++;
        }
    
        return node;
      }
    }
    
      function isWhitespace(ch) {
      return /\s/.test(ch);
      }
    
      function isInvalid(ch) {
        return (ch.charCodeAt(0) === 0 || ch.charCodeAt(0) === 0xfffd);
      }
    
      const punctuations = '[~`!@#$%^&*(){}[];:"\'<,.>?/\|-_+=';
    
      /** To judge whether it's a punctuation. */
      function isPunctuation(ch) {
        return punctuations.indexOf(ch) !== -1;
      }
    
      class BertTokenizer {
    
      /**
       * Load the vacabulary file and initialize the Trie for lookup.
       */
      async load() {
        this.vocab = (await Promise.all([tf.util.fetch(VOCAB_URL).then(d => d.json())]))[0];
        this.trie = new Trie();
        vocab_length = Object.keys(this.vocab).length
        for (let vocabIndex = 0; vocabIndex < vocab_length; vocabIndex++) {
          const word = this.vocab[vocabIndex];
          this.trie.insert(word, 1, vocabIndex);
        }
      }
    
      processInput(text) {
        const charOriginalIndex = [];
        const cleanedText = this.cleanText(text, charOriginalIndex);
        const origTokens = cleanedText.split(' ');
    
        let charCount = 0;
        const tokens = origTokens.map((token) => {
          token = token.toLowerCase();
          const tokens = this.runSplitOnPunc(token, charCount, charOriginalIndex);
          charCount += token.length + 1;
          return tokens;
        });
    
        let flattenTokens = [];
        for (let index = 0; index < tokens.length; index++) {
          flattenTokens = flattenTokens.concat(tokens[index]);
        }
        return flattenTokens;
      }
    
      /* Performs invalid character removal and whitespace cleanup on text. */
      cleanText(text, charOriginalIndex) {
        const stringBuilder= [];
        let originalCharIndex = 0, newCharIndex = 0;
        for (const ch of text) {
          // Skip the characters that cannot be used.
          if (isInvalid(ch)) {
            originalCharIndex += ch.length;
            continue;
          }
          if (isWhitespace(ch)) {
            if (stringBuilder.length > 0 &&
                stringBuilder[stringBuilder.length - 1] !== ' ') {
              stringBuilder.push(' ');
              charOriginalIndex[newCharIndex] = originalCharIndex;
              originalCharIndex += ch.length;
            } else {
              originalCharIndex += ch.length;
              continue;
            }
          } else {
            stringBuilder.push(ch);
            charOriginalIndex[newCharIndex] = originalCharIndex;
            originalCharIndex += ch.length;
          }
          newCharIndex++;
        }
        return stringBuilder.join('');
      }
    
      /* Splits punctuation on a piece of text. */
      runSplitOnPunc(
          text, count,
          charOriginalIndex) {
        const tokens = [];
        let startNewWord = true;
        for (const ch of text) {
          if (isPunctuation(ch)) {
            tokens.push({text: ch, index: charOriginalIndex[count]});
            count += ch.length;
            startNewWord = true;
          } else {
            if (startNewWord) {
              tokens.push({text: '', index: charOriginalIndex[count]});
              startNewWord = false;
            }
            tokens[tokens.length - 1].text += ch;
            count += ch.length;
          }
        }
        return tokens;
      }
    
      tokenize(text) {
        // Source:
        // https://github.com/google-research/bert/blob/88a817c37f788702a363ff935fd173b6dc6ac0d6/tokenization.py#L311
    
        let outputTokens = [];
    
        const words = this.processInput(text);
        words.forEach(word => {
          if (word.text !== CLS_TOKEN && word.text !== SEP_TOKEN) {
            word.text = `${SEPERATOR}${word.text.normalize(NFKC_TOKEN)}`;
          }
        });
        for (let i = 0; i < words.length; i++) {
          const chars = [];
          for (const symbol of words[i].text) {
            chars.push(symbol);
          }
    
          let isUnknown = false;
          let start = 0;
          const subTokens = [];
    
          const charsLength = chars.length;
    
          while (start < charsLength) {
            let end = charsLength;
            let currIndex;
    
            while (start < end) {
              const substr = chars.slice(start, end).join('');
    
              const match = this.trie.find(substr);
              if (match != null && match.end != null) {
                currIndex = match.getWord()[2];
                break;
              }
    
              end = end - 1;
            }
    
            if (currIndex == null) {
              isUnknown = true;
              break;
            }
    
            subTokens.push(currIndex);
            start = end;
          }
    
          if (isUnknown) {
            outputTokens.push(UNK_INDEX);
          } else {
            outputTokens = outputTokens.concat(subTokens);
          }
        }
    
        return outputTokens;
      }
    }
    
    
    class Models {
        async init(){
          console.log('loading tokenizer')
          this.tokenizer = new BertTokenizer();
          await this.tokenizer.load();
          
          console.log('tokenizer loaded')
          console.log('loading model')
          this.model = await tf.loadGraphModel('model/model.json')
          console.log('model loaded')  
          const inputIds = tf.ones([1, MAX_SEQ_LEN], 'int32');
          const segmentIds = tf.ones([1, MAX_SEQ_LEN], 'int32');
          const inputMask = tf.ones([1, MAX_SEQ_LEN], 'int32');
          this.model.execute({
            input_ids: inputIds,
            segment_ids: segmentIds,
            input_mask: inputMask,
          });
          console.log('warming up finished')
      }
    
        async predict(text){
            const queryTokens = this.tokenizer.tokenize(text);
            const tokens = [];
            let segmentIds = [];
            tokens.push(CLS_INDEX);
            segmentIds.push(0);
            for (let i = 0; i < queryTokens.length; i++) {
                const queryToken = queryTokens[i];
                tokens.push(queryToken);
                segmentIds.push(0);
            }
            tokens.push(SEP_INDEX);
            segmentIds.push(0);
            
            let inputIds = tokens;
            let inputMask = inputIds.map(id => 1);
            while ((inputIds.length < MAX_SEQ_LEN)) {
                inputIds.push(0);
                inputMask.push(0);
                segmentIds.push(0);
            }
            console.log(inputIds)
            const batchSize = 1;
            inputIds =
                tf.tensor2d(inputIds, [batchSize, MAX_SEQ_LEN], 'int32');
            segmentIds =
                tf.tensor2d(segmentIds, [batchSize, MAX_SEQ_LEN], 'int32');
            inputMask =
                tf.tensor2d(inputMask, [batchSize, MAX_SEQ_LEN], 'int32');

            const result = this.model.execute({
                input_ids: inputIds,
                segment_ids: segmentIds,
                input_mask: inputMask
            });
            let logits = await Promise.all([result.array()]);
            logits = logits[0][0]
            
            // return the output
            let output = ""
            if (logits[1] > logits[0])
                output = "إيجابي بنسبة %" + Math.round(logits[1] * 100)
            else
                output = "سلبي بنسبة %" + (100 -Math.round(logits[0] * 100))
            //show output 
            $("#output").val(output);
        }
    }
    
  
  async function start()
  {
    models = new Models()
    models.init()
    console.log('warming up ...')
    $("#loader").hide();
    $(".inputs").show();
    $(".outputs").show();
  }
  start();

  $(".submit").on("click", function() {
      sentence = $("#input").val();
      models.predict(sentence);
    });
  });
  