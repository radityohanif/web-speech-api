var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = true;

recognition.onstart = function () {
    console.log('Start Recording..')
    console.log(recognition.lang)
    console.dir(recognition)
};

recognition.onerror = function (event) {
    console.log('Error occurred in recognition : ' + event.error)
};

recognition.onend = function () {
    console.log('Finish Recording..')
};

recognition.onresult = function (event) {
    let speechToTextResult = ""
    for (let i = 0; i < event.results.length; i++) {
        speechToTextResult += event.results[i][0].transcript
    }
    console.log(speechToTextResult)
    $("#text-result").html(speechToTextResult);
};

$("#mic-button").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("btn-dark");
    $(this).toggleClass("btn-danger");
    
    let powerStatus = $(this).attr("data-power")
    if (powerStatus == "off") {
        recognition.start();
        $(this).attr("data-power", "on");
        $("#mic-description").html("Microphone off");
    }
    else if (powerStatus == "on") {
        recognition.stop();
        $(this).attr("data-power", "off");
        $("#mic-description").html("Microphone on");
    }
});

$("#lang-option").change(function (e) { 
    e.preventDefault();
    recognition.lang = $(this).val();
});