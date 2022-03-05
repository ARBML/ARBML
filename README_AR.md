 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/logo.png" width = "200px"/>
 </p>

## <div dir="rtl">الدافع</div>
<div dir="rtl">
تعلم الآلة والذكاء الإصطناعي اصبح له أهمية كبرى في الكثير من المجالات كالرؤية الحاسوبية ، معالجة اللغة الطبيعية ، الخ ... ولكن لسوء الحظ ليس هناك الكثير من المصادر مفتوحة المصدر لتسهيلها للناطقين باللغة العربية.
</div>

<br>
<br>

## <div dir="rtl">هدفنا</div>
<div dir="rtl"> 
  إثراء المحتوى العربي لمجال تعلم الآلة بإنشاء عدد من المشاريع مفتوحة المصدر لكي نشير لأهمية تعلم الآلة في حياتنا. لذلك نريد إنشاء برامج لتسهيل العرب من التعرف على أهمية الذكاء الإصطناعي وتعلم الآلة . 
</div>

<br>
<br>

## <div dir="rtl">التحديات</div>
<div dir="rtl">
 اللغة العربية تمتلك الكثير من الصفات التي تجعلها أكثر تعقيدا مقارنة مع اللغات الأخرى مثل الإنجليزية. أولا, كتابة اللغة العربية تتم من اليمين إلى اليسار. ثانيا, تحتوي اللغة العربية على أحرف
لايمكن لأغلب غير الناطقين بها تعلم نطقها بسهولة مثل حرف ` الضاد, الغين, الحاء والخاء والظاء. ` بالإضافة,
تحتوي اللغة العربية على التشكيل, الضمة, الفتحة والكسرة تساعد متحدثي العربية على معرفة النطق الصحيح للكلمة. كمثال: جملة `السَّلامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ` تحتوي على تشكيل متعدد للكلمات يتبع قوانين وأسس النحو والصرف. مقارنة مع اللغة الإنجليزية, كلمات اللغة العربية تتميز باتصال الأحرف, هذا الإتصال يجعل فصل الأحرف مهمة صعبة وغير مفيدة للقارئ. أخيرا, يتحدث قرابة النصف مليار شخص اللفة العربية, مما نتج عنه تواجد لكنات مختلفة لكل مقطع من العالم العربي.
</div>

<br>
<br>

## <div dir="rtl">الطريقة</div>
<div dir="rtl">
 طريقتنا يمكن تعميمها على مختلف نماذج اللغة وليست محصورة على اللغة العربية. خطوات هذه الطريقة تبدأ من تدريب النماذج على مذكرة الكولاب وتمثيل النماذج على صفحات الويب

<br>
<br>

<p align="center"> 
<img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/procedure.png"/>

</div>

## <div dir="rtl">النماذج</div>

<table class="tg" dir="rtl" align ="center">
  <tr>
    <th class="tg-yw4l"><b>الإسم</b></th>
    <th class="tg-yw4l"><b>الوصف</b></th>
    <th class="tg-yw4l"><b>النوت</b></th>
    <th class="tg-yw4l"><b>تجربة</b></th>
  </tr>
  <tr>
    <td class="tg-yw4l"> التشكيل</td>
    <td class="tg-yw4l"> Simple RNN ported from <a href ="https://github.com/Barqawiz/Shakkala">Shakkala</a></td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Diactrization.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicDiactrization/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">الترجمة من العربي للإنجليزي</td>
    <td class="tg-yw4l">seq2seq with attention</td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_nmt_attention.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicEnglishTranslation/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

   <tr>
    <td class="tg-yw4l">إنشاء الشعر العربي</td>
    <td class="tg-yw4l">CharRNN model with multinomial distribution</td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Poem_Generation.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicPoemGenerator/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">تضمين اللغة العربية</td>
    <td class="tg-yw4l">N-Grams ported from  <a href ="https://github.com/bakrianoo/aravec">Aravec</a></td></td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Words_Embedding.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicWordSimilarity/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">تحليل المشاعر باللغة العربية</td>
    <td class="tg-yw4l">RNN with Bidirectional layer </td></td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Sentiment_Classification.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicWordSimilarity/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">وصف الصور باستخدام اللغة العربية</td>
    <td class="tg-yw4l">Encoder-Decoder architecture with attention </td></td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Image_Captioning.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicImageCaptioning/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">تحليل تشابه الكلمات</td>
    <td class="tg-yw4l">Embedding layers using cosine similarity</td></td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Word_Similarity.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicWordSimilarity/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>


  <tr>
    <td class="tg-yw4l">التعرف على الأرقام</td>
    <td class="tg-yw4l"> RNN </td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Digits_Classification.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg"height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicDigitsClassification/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">التعرف على الخطابات</td>
    <td class="tg-yw4l">Basic signal processing and classification</td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Speech_Recognition.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg"height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicSpeechRecognition/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></a></td>
  </tr>
  
  <tr>
    <td class="tg-yw4l">التعرف على الأشياء</td>
    <td class="tg-yw4l">SSD Object detection model</td>
    <td class="tg-yw4l"></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ObjectDetection/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></td>
  </tr>

  <tr>
    <td class="tg-yw4l">التصنيف المتري للشعر العربي </td>
    <td class="tg-yw4l">Bidirectional GRU</td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Poem_Metric_Classification.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg"height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicPoemMeterClassification/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></td>
  </tr>

  <tr>
    <td class="tg-yw4l">تصنيف الخط العربي</td>
    <td class="tg-yw4l">CNN</td>
    <td class="tg-yw4l"><a href="https://colab.research.google.com/github/zaidalyafeai/ARBML/blob/master/Interfaces/Notebooks/Arabic_Font_Classification.ipynb">
    <img src="https://colab.research.google.com/assets/colab-badge.svg"height = '20px' >
    </a></td>
    <td><a href = "https://arbml.github.io/ARBML/Interfaces/Website/ArabicFontClassification/index.html"><img src ="https://raw.githubusercontent.com/alrra/browser-logos/master/src/main-desktop-browser-logos.png" height = '20px'/></td>
  </tr>
</table>



## <div dir="rtl">البيانات</div>

<table class="tg" dir="rtl" align = "center">

  <tr>
    <th class="tg-yw4l"><b>الإسم</b></th>
    <th class="tg-yw4l"><b>الوصف</b></th>
  </tr>

  <tr>
    <td class="tg-yw4l">الأرقام العربية </td>
    <td class="tg-yw4l">70,000 images (28x28) converted to binary from <a href = "https://www.kaggle.com/mloey1/ahdd1"> Digits</a> </td>
  </tr>

  <tr>
    <td class="tg-yw4l">الأحرف العربية </td>
    <td class="tg-yw4l">16,759 images (32x32) converted to binary from <a href = "https://www.kaggle.com/mloey1/ahcd1">Letters</a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">القصائد العربية </td>
    <td class="tg-yw4l">146,604 poems scrapped from <a href = "https://www.aldiwan.net/">aldiwan</a></td>
  </tr>
  
  <tr>
    <td class="tg-yw4l">ترجمة اللغة العربية </td>
    <td class="tg-yw4l">100,000 paralled arabic to english translation ported from  <a href = "http://opus.nlpl.eu/OpenSubtitles-v2018.php">OpenSubtitles</a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">مراجعة المنتجات على الويب </td>
    <td class="tg-yw4l">1,648 reviews on products ported from <a href = "https://github.com/hadyelsahar/large-arabic-sentiment-analysis-resouces">Large Arabic Resources For Sentiment Analysis</a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">التعليق على الصور </td>
    <td class="tg-yw4l">30,000 Image paths with captions extracted and translated from <a href = "http://cocodataset.org/#home">COCO 2014</a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">ويكيبيديا العربي </td>
    <td class="tg-yw4l">4,670,509 words cleaned and processed from <a href = "https://linguatools.org/tools/corpora/wikipedia-monolingual-corpora/">Wikipedia Monolingual Corpora</a></td>
  </tr>

  <tr>
    <td class="tg-yw4l">عداد الشعر العربي </td>
    <td class="tg-yw4l">55,440 verses with their associated meters collected from  <a href = "https://www.aldiwan.net/">aldiwan</a></td>
  </tr>
  
  <tr>
    <td class="tg-yw4l">الخطوط العربية</td>
    <td class="tg-yw4l">516 100×100 images for two classes.</td>
  </tr>
  
  
</table>


## <div dir="rtl">الأدوات</div>

<div dir="rtl">
نستخدم طريقتين لتسهيل الوصول للنماذج للمساهمين و المطورين, والمستخدمين من كافة المجالات
</div>


## <div dir="rtl">الأدوات</div>

### <div dir="rtl">قوقل كولاب</div>
<div dir="rtl">
اداة مجانية من قوقل تستخدم لغرض الأبحاث في تعلم الآلة. بإمكانكم مشاهدة المقالة الآتية لفهمها بشكل أكبر 
<a href = "https://medium.com/deep-learning-turkey/google-colab-free-gpu-tutorial-e113627b9f5d">اضغط هنا </a>
</div>

### <div dir="rtl">تنسرفلو.جي اس</div>
<div dir="rtl">
جزء من حزمة ادوات تنسرفلو مخصصة لتدريب نماذج تعلم الآله وعرضها على المتصفح. لمعرفة كيفية استخدام النماذج على المتصفح, الرجاء 
<a href = "https://medium.com/tensorflow/train-on-google-colab-and-run-on-the-browser-a-case-study-8a45f9b1474e">متابعة هذه المقالة </a>
</div>

### <div dir="rtl">الموقع</div>
<div dir="rtl">
أسسنا نماذج متعددة تعمل بشكل مباشر على المتصفح, للوصول لها
<a href = "https://zaidalyafeai.github.io/ARBML/Interfaces/Website/">اضغط هنا </a>

<p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/web_interface.png"/>
 </p>
</div>


### <div dir="rtl">النماذج المضافة حتى الآن</div>

 ### <div dir="rtl">إنشاء الشعر</div>
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/poems.png"/>
 </p>

 ### <div dir="rtl">الترجمة من اللغة الإنجليزية الى اللغة العربية</div>
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/translation.png"/>
 </p>

 ### <div dir="rtl">تضمين الكلمات العربية</div>
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/embedding.png"/>
 </p>

 ### <div dir="rtl">تصنيف المشاعر</div>
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/sentiment.png"/>
 </p>

 ### <div dir="rtl">وصف الصور</div>
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/caption.png"/>
 </p>

 ### <div dir="rtl">التشكيل</div>
 <p align="center"> 
 <img src = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/Interfaces/Website/images/diactrization.png"/>
 </p>


## <div dir="rtl">المساهمة في المشروع</div>
<div dir="rtl">
بإمكانك المساهمة في تطوير المكتبة, الرجاء قراءة سياسات المشاركة والتواصل مع مؤسسي المشروع قبل البدء, بإمكانك الضغط على
<a href = "https://raw.githubusercontent.com/zaidalyafeai/ARBML/master/CONTRIBUTING.md">هذا الرابط لمعرفة المزيد </a>
</div>


## <div dir="rtl">المساهمين</div>

<div dir="rtl">
 الشكر موصول لكل من ساهم في تطوير عربمل
<a href = "https://allcontributors.org/docs/en/emoji-key"></a>

</div>

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table align = "center">
  <tr>
    <td align="center"><a href="https://github.com/MagedSaeed"><img src="https://avatars2.githubusercontent.com/u/18549783?v=4" width="100px;" alt=""/><br /><sub><b>MagedSaeed</b></sub></a><br /><a href="#design-MagedSaeed" title="Design">🎨</a> <a href="#ideas-MagedSaeed" title="Ideas, Planning, & Feedback">🤔</a> <a href="#platform-MagedSaeed" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="http://twitter.com/marchworks"><img src="https://avatars1.githubusercontent.com/u/40798653?v=4" width="100px;" alt=""/><br /><sub><b>March Works</b></sub></a><br /><a href="#ideas-MarchWorks" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://mhmoodlan.github.io"><img src="https://avatars1.githubusercontent.com/u/10808358?v=4" width="100px;" alt=""/><br /><sub><b>Mahmoud Aslan</b></sub></a><br /><a href="#ideas-mhmoodlan" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/zaidalyafeai/ARBML/commits?author=mhmoodlan" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

<div dir="rtl">
هذا المشروع يتبع سياسة <a href = "https://allcontributors.org/docs/en/emoji-key"> all-contributors</a>, نرحب بالمساهمات الجديدة من الجميع!

</div>
