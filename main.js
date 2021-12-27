img = "";
stat = "";
objects = [];
song = "";

function preload(){
    song = loadSound("alert.mp3");
}


function setup() {
  canvas = createCanvas(700, 500);
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
  document.getElementById("status").innerHTML = "Status - Detecting Objects";
}



function modelLoaded(){
    console.log("Model Loaded");
    stat = true;
}

function gotResult(error , results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video ,0, 0 ,700 , 500);
    
    if(stat != ""){


        objectDetector.detect(video , gotResult);

        for(i = 0 ; i<objects.length ; i++){
        document.getElementById("status").innerHTML = "Status - Object Detected";
        fill("lightslantegray");
        text(objects[i].label  , objects[i].x+15 , objects[i].y+15);
        noFill()
        stroke("lightslantegray");
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
        if(objects[i].label == "person"){
            document.getElementById("answer").innerHTML = "Baby  found";
            song.stop();
        }
        else{
            document.getElementById("answer").innerHTML = "Baby not found";
            song.play();
        }
    }


    if(objects.length == 0){
        document.getElementById("answer").innerHTML = "Baby not found";
        song.play();
    }

}