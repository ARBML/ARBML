$(document).ready(function() {

  var classNames = [ 'صفر', 'واحد', 'اثنان', 'ثلاثة', 'اربعة', 'خمسة', 'ستة',
  'سبعة', 'ثمانية', 'تسعة'];

//webkitURL is deprecated but nevertheless 
URL = window.URL || window.webkitURL;
var gumStream;
//stream from getUserMedia() 
var rec;
//Recorder.js object 
var input;

//MediaStreamAudioSourceNode we'll be recording 
// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;

//new audio context to help us record 
var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");


//add events to those 3 buttons 
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);


function startRecording()
{
  /* Disable the record button until we get a success or fail from getUserMedia() */

  var constraints = {
    audio: true,
    video: false
  }

  recordButton.disabled = true;
  stopButton.disabled = false;

  /* We're using the standard promise based getUserMedia()

  https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
    /* assign to gumStream for later use */
    gumStream = stream;
    /* use the stream */
    input = audioContext.createMediaStreamSource(stream);
    /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
    rec = new Recorder(input, {
        numChannels: 1
    }) 
    //start the recording process 
    rec.record()

  }).catch(function(err) {
    //enable the record button if getUserMedia() fails 
    recordButton.disabled = false;
    stopButton.disabled = true;
  });
}



function stopRecording() {
  console.log("stopButton clicked");
  //disable the stop button, enable the record too allow for new recordings 
  stopButton.disabled = true;
  recordButton.disabled = false;

  //tell the recorder to stop the recording 
  rec.stop(); //stop microphone access 
  gumStream.getAudioTracks()[0].stop();
  //create the wav blob and pass it on to createDownloadLink 
  rec.exportWAV(createDownloadLink);
}


function preprocess(array) {
  return tf.tidy(() => {
      //convert to a tensor 
      let tensor = tf.tensor(array);
      tensor.max().print();
      //pad 
      const padded = tensor.pad([[0, 44100]]);

      //slice
      const sliced = padded.slice([0], [44100]);

      //normalize
      const offset = sliced.abs().max();
      const normalized = sliced.div(offset);

      //We add a dimension to get a batch shape 
      var batched = normalized.expandDims(0)
      batched = batched.expandDims(2)
      return batched
  })
}


function predict(arr)
{
  const input = preprocess(arr);
  const logits = model.predict(input);
  console.log(logits)
  const top3 = tf.topk(logits, 3, true);
  const indices = top3.indices.dataSync();
  $("#output").text(classNames[indices[0]]+' أو '+classNames[indices[1]] +' أو '+classNames[indices[2]]);
}

async function createDownloadLink(blob) {

  var url = URL.createObjectURL(blob);
  const arrayBuffer = await new Response(blob).arrayBuffer();
  console.log(arrayBuffer)
  audioContext.decodeAudioData(arrayBuffer, function(audioBuffer){
    console.log(audioBuffer.sampleRate, audioBuffer.numberOfChannels)
    arr = audioBuffer.getChannelData(0);
    predict(arr)

  });

  var au = document.createElement('audio');

  var link = document.createElement('a');
  //add controls to the <audio> element 
  au.controls = true;
  au.src = url;
  //link the a element to the blob 
  link.href = url;
  link.download = new Date().toISOString() + '.wav';
  link.innerHTML = link.download;

  //add the li element to the ordered list 
  if (recordingsList.firstChild != null){
    recordingsList.removeChild(recordingsList.firstChild);
  }
  recordingsList.appendChild(au)
  
}

/*
* start the models and warm up 
*/
async function start()
{
    // const recognizer = speechCommands.create('BROWSER_FFT');

    model = await tf.loadLayersModel('model//model.json')
    
    //warm up 
    model.predict(tf.zeros([1, 44100, 1]))
    console.log('finished loading the model')
    // // Make sure that the underlying model and metadata are loaded via HTTPS
    // // requests.
    // await recognizer.ensureModelLoaded();
    // console.log("model loaded ")
    // const model = recognizer.model;
    // recognizer.model = undefined;

    // const inputShape = model.inputs[0].shape;
    // console.log(recognizer.model);
    // console.log(inputShape);
    
    $("#loader").hide();
    $("#inputs").show();
    $("#outputs").show();
    $("#output").val("");
}


async function detect()
{
    //first clear the canvas previous drawing 
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    //store the output and identify the max length of the ouput 

    
}


  start();

  $(".upload").on("click", function() {
    $(".preview").focus().trigger('click');
  });

  $(".submit").on("click", function() {
    detect()
  });
});
