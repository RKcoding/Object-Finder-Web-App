status = "";
objects = "";

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("model_status").innerHTML = "Status: Detecting Objects";
    Object Name = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 300, 300);
    if (status != empty) {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "The number of objects detected are:" + objects.length;
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if (objects[i].label == Object Name) {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = Object Name + " found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(Object Name + " found");
            synth.speak(utterThis);
        } else {
            document.getElementById("object_status").innerHTML = Object Name + " not found";
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
