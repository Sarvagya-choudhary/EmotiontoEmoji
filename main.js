prediction_1= "";
prediction_2= "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
camera= document.getElementById("camera");
Webcam.attach(camera);
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captureImage' src='"+data_uri+"'>";
    });
}
console.log('ml5version',ml5.version);
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/B2w0ic9LP/model.json",model_Uploaded);
function model_Uploaded(){
    console.log("model loaded");
}
function speak(){
    var synth= window.speechSynthesis;
    speak1data= "The first prediction is "+prediction_1;
    speak2data="The second prediction is "+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak1data+speak2data);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captureImage");
    classifier.classify(img,result);
}
function result(error,results){
    if(error){
       console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(prediction_1 == "Happy"){
            document.getElementById("update_emoji").innerHTML="&#128522";
        }
        if(prediction_1 == "Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532";
        }
        if(prediction_1 == "Angry"){
            document.getElementById("update_emoji").innerHTML="&#128548";
        }
        if(prediction_2 == "Happy"){
            document.getElementById("update_emoji1").innerHTML="&#128522";
        }
        if(prediction_2 == "Sad"){
            document.getElementById("update_emoji1").innerHTML="&#128532";
        }
        if(prediction_2 == "Angry"){
            document.getElementById("update_emoji1").innerHTML="&#128548";
        }
    }
}