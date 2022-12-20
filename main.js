prediction_1 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version',ml5.version);
classifer = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/lRXpNUO9X/model.json', Modelloaded);

function Modelloaded() {
    console.log('Model loaded')
}

function check() {
    img = document.getElementById('captured_image');
    classifer.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        if(results.label == "Mask") {
            document.getElementById("update_emoji").innerHTML = "&#128512;"
        }

        if(results.label == "NoMask") {
            document.getElementById("update_emoji").innerHTML = "&#128542;"
        }
    }
}