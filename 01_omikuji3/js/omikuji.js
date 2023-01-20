"use strict";
window.addEventListener("DOMContentLoaded",
    function() {
        $("header").textillate({
            loop: false,
            minDisplayTime: 2000, 
            initialDelay: 2000, 
            autoStart: true,
            in: { 
            effect: "fadeInLeftBig", 
            delayScale: 1.5, 
            delay: 50, 
            sync: false, 
            shuffle: true 
            }
            });
            
            $(function(){
            ScrollReveal().reveal("#btn1", { duration: 9000 });
            });
        
    setTimeout(
        function(){
            let popMessage = "いらっしゃい！おみくじ引いてって！";
        window.alert(popMessage);
    }, "5000"
        
    );
        // let popMessage = "いらっしゃい！おみくじ引いてって！";
        // window.alert(popMessage);
    }, false

    );
let soundEndflag = "0";
const btn1 = document.getElementById ("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage");
btn1.addEventListener    ("click",
    function(){
      if( soundEndflag === "1"){
        soundControl("end","");
      }
        
      //let n = Math.floor(Math.random() * 3);
      //switch (n) {
      //  case 0:
      //  btn1.textContent = "Very Happy!!";
      //  btn1.style.color = "#FF0000";
      //  btn1.style.fontSize ="2em";
      //  break;
      //  case 1:
      //  btn1.textContent = "Happy!!";
      //  btn1.style.color = "#FFF001";
      //  btn1.style.fontSize ="2em";
      //  break;
      //  case 2:
      //  btn1.textContent = "UnHappy!!";
      //  btn1.style.color = "#261e1c";
      //  btn1.style.fontSize ="2em";
      // break;
      //}/omikuji_sound1.mp3
      let resultText = ["img/daikichi.png","img/chukichi.png","img/syokichi.png","img/suekichi.png","img/daikyo.png",]
      let resultSound = ["sound/omikuji_sound1.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound3.mp3"];
      let resultMaxSpeed = [ 10,10,8,5,5];
      let resultMaxSize = [30,30,30,40,30];
      let resultImage = ["img/star.png","img/sakura_hanabira.png","img/water1.png","img/redLeaves4.png","img/snowflakes.png",]
      let n = Math.floor(Math.random() *resultText.length);
      omikujiTextImage.src = resultText[n];
      omikujiTextImage.classList.add("omikujiPaper");
      omikujiTextImage.addEventListener("animationend",
        function() {
          omikujiTextImage.classList.remove("omikujiPaper");
        },false
      );
      w_sound = resultSound[n];
      soundControl("start", w_sound);
      soundEndflag = "1";
      $(document).snowfall("clear");
      // jQueryl
      setTimeout(
        function() {
      $(document).ready(function(){
        $(document).snowfall({
          maxSpeed :resultMaxSpeed[n], // 最大速度
          minSpeed : 1, // 最小速度
          maxSize : resultMaxSize[n], // 最大サイズ
          minSize : 1, // 最小サイズ
          image : resultImage[n]
        });
      });
    },
      "200"
      );
  },false

);
let w_sound
let music
function soundControl(status, w_sound){
  if(status === "start") {
    music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();
  } else if(status === "end"){
    music.pause();
    music.currentTime= 0;
  }
}