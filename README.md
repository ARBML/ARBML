 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/logo.png" width = "200px"/>
 </p>


## Motivation 
As you know machine learning has proven its importance in many fields, like computer vision, NLP, reinforcement learning, adversarial learning, etc ..  Unfortunately, there is a little work to make machine learning accessible for Arabic-speaking people. 

## Goal
Our goal is to enrich the Arabic content by creating open-source projects and open the community eyes on the significance of machine learning. We want to create interactive **applications** that allow **novice** Arabs to learn more about machine learning and appreciate its advances. 

## Challenges 
Arabic language has many complicated features compared to other languages. First, Arabic language is written right to left. Second, it contains many letters that cannot be pronounced by most foreigners like `ض ، غ ، ح ، خ، ظ`. Moreover, Arabic language contains special characters called Diacritics which are special characters that help readers pronounced words correctly. For instance the statement ` السَّلامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ` containts special characters after most of the letters. The diactrics follow special rules to be given to a certain character. These rules are construct a complete area called `النَّحْوُ الْعَرَبِيُّ`. Compared to English, the Arabic language words letters are mostly connected `اللغة` as making them disconnected is difficult to read `ا ل ل غ ة`. Finally, there as many as half a billion people speaking Arabic which resulted in many dialects in different countires. 

## Procedure 
Our procedure is generalized and can be generalized to many language models not just Arabic. This standrized approach takes part as multiple steps starting from training on colab then porting the models to the web. 
 <p align="center"> 
<img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/procedure.png"/>
 </p>



## Models

<table class="tg">
  <tr>
    <th class="tg-yw4l"><b>Name</b></th>
    <th class="tg-yw4l"><b>Description</b></th>
    <th class="tg-yw4l"><b>Notebook</b></th>
    <th class="tg-yw4l"><b>Demo (soon)</b></th>
  </tr>
  <tr>
    <td class="tg-yw4l">Arabic Diacritization</td>
    <td class="tg-yw4l">Simple RNN model ported from <a href ="https://github.com/Barqawiz/Shakkala">Shakkala</a></td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Diactrization.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "#"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic Digits Classification</td>
    <td class="tg-yw4l">Basic RNN model with classification head</td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Digits_Classification.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg"height = '20px' >
    </a></td>
    <td><a href = "#"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic Letters Classification</td>
    <td class="tg-yw4l">Basic RNN model with classification head</td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Letters_Classification.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "#"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic2English Translation</td>
    <td class="tg-yw4l">seq2seq with Attention</td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_nmt_attention.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "#"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

   <tr>
    <td class="tg-yw4l">Arabic Poem Generation</td>
    <td class="tg-yw4l">CharRNN model with multinomial distribution</td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Poem_Generation.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "#"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic Words Embedding</td>
    <td class="tg-yw4l">N-Grams model ported from <a href ="https://github.com/bakrianoo/aravec">Aravec</a></td></td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Words_Embedding.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "#"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic Sentiment Classification</td>
    <td class="tg-yw4l">RNN with Bidirectional layer </td></td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Sentiment_Classification.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "#"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic Image Captioning</td>
    <td class="tg-yw4l">Encoder-Decoder architecture with attention </td></td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Image_Captioning.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "#"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic Word Similarity</td>
    <td class="tg-yw4l">Embedding layers using cosine similarity</td></td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Word_Similarity.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "#"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>
</table>
  
## Datasets 

<table class="tg">

  <tr>
    <th class="tg-yw4l"><b>Name</b></th>
    <th class="tg-yw4l"><b>Description</b></th>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic Digits </td>
    <td class="tg-yw4l">70,000 images (28x28) converted to binary from <a href = "https://www.kaggle.com/mloey1/ahdd1"> Digits</a> </td>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic Letters </td>
    <td class="tg-yw4l">16,759 images (32x32) converted to binary from <a href = "https://www.kaggle.com/mloey1/ahcd1">Letters</a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic Poems </td>
    <td class="tg-yw4l">146,604 poems scrapped from <a href = "https://www.aldiwan.net/">aldiwan</a></td>
  </tr>
  
  <tr>
    <td class="tg-yw4l">Arabic Translation </td>
    <td class="tg-yw4l">100,000 paralled arabic to english translation ported from  <a href = "http://opus.nlpl.eu/OpenSubtitles-v2018.php">OpenSubtitles</a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Product Reviews </td>
    <td class="tg-yw4l">1,648 reviews on products ported from <a href = "https://github.com/hadyelsahar/large-arabic-sentiment-analysis-resouces">Large Arabic Resources For Sentiment Analysis</a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Image Captions </td>
    <td class="tg-yw4l">30,000 Image paths with captions extracted and translated from <a href = "http://cocodataset.org/#home">COCO 2014</a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">Arabic Wiki </td>
    <td class="tg-yw4l">4,670,509 words cleaned and processed from <a href = "https://linguatools.org/tools/corpora/wikipedia-monolingual-corpora/">Wikipedia Monolingual Corpora</a></td>
  </tr>
</table>

## Tools 
To make models easily accessible by contributers, developers and novice users we use two approaches

### Google Colab 
[Google colaboratory](https://colab.research.google.com/) is a free service that is offered by Google for research purposes. The interface of a colab notebook is very similar to jupyter notebooks with slight differences. Google offers three hardware accelerators `CPU, GPU` and `TPU` for speeding up training. We almost all the time use `GPU` because it is easier to work with and acheives good results in a reasonable time. Check this great [tutorial](https://medium.com/deep-learning-turkey/google-colab-free-gpu-tutorial-e113627b9f5d) on medium.

### TensorFlow.js 
TensorFlow.js is part of the TensorFlow ecosystem that supports training and inference of machine learning models in the browser. Please check these steps if you want to port models to the web:

1. Use keras to train models then save the model as `model.save('keras.h5')`
2. Install the TensorFlow.js converter using `pip install tensorflowjs`
3. Use the following script to `tensorflowjs_converter --input_format keras keras.h5 model/`

4. The `model` directory will contain the files `model.json` and weight files same to `group1-shard1of1`

5. Finally you can load the model using TensorFlow.js

Check this [tutorial](https://medium.com/tensorflow/train-on-google-colab-and-run-on-the-browser-a-case-study-8a45f9b1474e) that I made for the complete procedure. 

## Website 
We developed many models to run directly in the browser. Using TensorFlow.js the models run using the client GPU. Since the webpage is static there is no risk of privacy or security. Here is the main intefrace of the website 

<p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/web_interface.png"/>
 </p>


The added models so far 


### Poems Generation
<p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/poems.png"/>
 </p>

 ### English Translation
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/translation.png"/>
 </p>

 ### Words Embedding
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/embedding.png"/>
 </p>

 ### Sentiment Classification 
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/sentiment.png"/>
 </p>

 ### Image Captioning
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/diactrization.png"/>
 </p>

 ### Diactrization 
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/web_interface.png"/>
 </p>


## Contribution 
Check the [CONTRIBUTING.md](https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/CONTRIBUTING.md) for a detailed explanantion about how to contribute. 

## Resources 
As a start we will start on Github for hosting the website, models, datasets and other contents. Unfortunately, there is a limitation on the space that will hunt us in the future. _Please let us know what you suggest on that matter_. 
 
## Contributors
Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/MagedSaeed"><img src="https://avatars2.githubusercontent.com/u/18549783?v=4" width="100px;" alt="MagedSaeed"/><br /><sub><b>MagedSaeed</b></sub></a><br /><a href="#design-MagedSaeed" title="Design">🎨</a> <a href="#ideas-MagedSaeed" title="Ideas, Planning, & Feedback">🤔</a> <a href="#platform-MagedSaeed" title="Packaging/porting to new platform">📦</a></td><td align="center"><a href="http://twitter.com/marchworks"><img src="https://avatars1.githubusercontent.com/u/40798653?v=4" width="100px;" alt="March Works"/><br /><sub><b>March Works</b></sub></a><br /><a href="#ideas-MarchWorks" title="Ideas, Planning, & Feedback">🤔</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!