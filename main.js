video = "";
stats = "";
objects = [];
function prelaod() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas  = createCanvas(480,380);
    canvas.center();


}

function start(){
    objectDetector = ml5.objectDetector("cocossd",modeLoaded());
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function modeLoaded(){
    console.log("modelLoaded");
    stats  = true;
    video.loop();
    video.speed(1);
    video.volume(0);
    objectDetector.detect(video,gotResult);
}

function draw (){
    image(video,0,0,380,380);
    
    if (stats != ""){
        objectDetector.detect(video,gotResult)
        r = random(255);
        g = random(255);
        b = random(255);
        for(i=0; i<objects.length; i++){
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15);
        document.getElementById("status").innerHTML = "Status : Object Detected";
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        document.getElementById("no-objects").innerHTML = "Number of objects detected are" + objects.length;
    }
}
}


function gotResult(error, results){
    if(error){
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}