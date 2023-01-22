"use strict";

let flag = "pen-flag";

let counter = 9;

const squares= document.getElementsByClassName("square");

const squaresArray=Array.from(squares);

const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// class="level"を取得
const levels= document.querySelectorAll(".level");

//  Array に変換...もしline22 でgetElementsByClassNameを使う場合は、forEachが使えないのでArrayに変換すること。
// const levelsArray = array.from(levels);

// levelの要素を取得　レベル設定エリア
const level_1=document.getElementById("level_1");
const level_2=document.getElementById("level_2");
const level_3=document.getElementById("level_3");


//NewGame 
const newgamebtn_display= document.getElementById("newgame-btn");
const newgamebtn=document.getElementById("btn90");

//win or lose Judgment Line
const line1 =JudgLine(squaresArray, ["a_1","a_2","a_3"]);
const line2 =JudgLine(squaresArray, ["b_1","b_2","b_3"]);
const line3 =JudgLine(squaresArray, ["c_1","c_2","c_3"]);
const line4 =JudgLine(squaresArray, ["a_1","b_1","c_1"]);
const line5 =JudgLine(squaresArray, ["a_2","b_2","c_2"]);
const line6 =JudgLine(squaresArray, ["a_3","b_3","c_3"]);
const line7 =JudgLine(squaresArray, ["a_1","b_2","c_3"]);
const line8 =JudgLine(squaresArray, ["a_3","b_2","c_1"]);


const lineArray = [line1, line2,line3,line4,line5,line6,line7,line8];

//level-add
const lineRandom= cornerLine(squaresArray, ["a_1","a_3","c_1","c_3"]); //level-end

let winningLine=null;

const msgtxt1= '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!(your turn)</p>';
const msgtxt2= '<p class="image"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack!(computer turn)</p>';

const msgtxt3 ='<p class="image"><img src ="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4= '<p class="image"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text  animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5= '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>';

let gameSound=["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];

window.addEventListener("DOMContentLoaded",
    function(){
        setMessage("pen-turn");
        // computer-add squareがクリック可能かを判断するクラスを追加
        squaresArray.forEach(function(square){
            square.classList.add("js-clickable");
        });
        //level-add
        LevelSetting(0); //levelの要素を取得　レベル１設定 -level-end-

    },false
);

// レベル設定-------------------------------------------------
let index;
levels.forEach((level) => {
    level.addEventListener("click", () =>{
        index = [].slice.call(levels).indexOf(level);
        LevelSetting(index);
    });
});

function LevelSetting(index){
    // レベル設定ボタン　スタイルクリア
    level_1.classList.remove("level-selected");
    level_2.classList.remove("level-selected");
    level_3.classList.remove("level-selected");
    level_1.classList.remove("level-non-selected");
    level_2.classList.remove("level-non-selected");
    level_3.classList.remove("level-non-selected");

    //  セッションストレージにkey="tic_tac_toe_access"がある場合は初回ではない
    if(sessionStorage.getItem("tic_tac_toe_access")){
        switch (index) {
            case 0:
                sessionStorage.setItem("tic_tac_toe_access", "1");
                level_1.classList.add("level-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
                break;
            case 1:
                sessionStorage.setItem("tic_tac_toe_access", "2");
                level_1.classList.add("level-non-selected");
                level_2.classList.add("level-selected");
                level_3.classList.add("level-non-selected");
                break;
            case 2:
                sessionStorage.setItem("tic_tac_toe_access", "3");
                level_1.classList.add("level-non-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-selected");
                break;
            default:
                level_1.classList.add("level-selected");
                level_2.classList.add("level-non-selected");
                level_3.classList.add("level-non-selected");
                break;
        }
    }else {
        // セッションストレージにkey="tic_tac_toe_access"がない場合は初回実行
        sessionStorage.setItem("tic_tac_toe_access", "1");
        level_1.classList.add("level-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-non-selected");
                
    }

}
//level-end

// computer-add squareをクリックした時にイベント発火
// クリックしたsquareに、penguinsかbearを表示。画像を表示した。
squaresArray.forEach(function(square){
    square.addEventListener('click', ()=>{
        //level-add
        if (counter===9){
            const levelBox = document.getElementById("levelBox");
            levelBox.classList.add("js-unclickable");//ゲーム途中でlevelBoxをクリックできないようにする
        }
        // level-end

        let gameOverFlg = isSelect(square);

        // GameOverではない場合、クマのターン(auto)
        if(gameOverFlg==="0"){
            const squaresBox= document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable"); //square-boxをクリックできないようにする
            setTimeout(
                function(){
                    bearTurn();
                },
                "2000"
            );
        }
    });
});

//judgLine

function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

//level-add --corner Lineを列科化
function cornerLine (targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2] || e.id === idArray[3]);
    });
}
//level-end

function isSelect(selectSquare) {
    let gameOverFlg="0"; //computer-add
    if(flag==="pen-flag"){
        //sound
        let music =new Audio(gameSound[0]);
        music.currentTime=0;
        music.play(); //再生

        selectSquare.classList.add("js-pen-checked");//squareにはpenguinsを表示
        selectSquare.classList.add("js-unclickable");//squareをクリックできないようにする
        selectSquare.classList.remove("js-clickable"); //squareがクリック可能かを判断するクラスを削除

        //penguins win
        if(isWinner("penguins")){
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg="1";
        }
        
        setMessage("bear-turn");
        flag="bear-flag";
    }else{
        //sound
        let music =new Audio(gameSound[1]);
        music.currentTime=0;
        music.play();

        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
        if(isWinner("bear")){
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg="1";
        }
        setMessage("pen-turn");
        flag="pen-flag";
    }
    counter--;

    if(counter===0){
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg="1";
    }
    return gameOverFlg ="0";
}

function setMessage(id){
    switch(id){
        case "pen-turn":
            document.getElementById("msgtext").innerHTML=msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML=msgtxt3;
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;
            break;
        default:
            document.getElementById("msgtext").innerHTML=msgtxt1;
    }
}

//win or lost 

function isWinner(symbol){
    const result= lineArray.some(function(line){
        const subResult=line.every(function(square){
            if(symbol==="penguins"){
                return square.classList.contains("js-pen-checked");
            }
            if (symbol==="bear"){
                return square.classList.contains("js-bear-checked");
            }
        });

        if (subResult){ winningLine=line}
        return subResult;
    });
    return result;
}
//gameover
function gameOver(status) {
    //sound
    let w_sound //soundの種類
    switch (status) {
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }
    
    let music = new Audio(w_sound);
    music.currentTime =0;
    music.play();
    //sound end

    // squaresArray.forEach(function(square){
    //     square.classList.add("js-unclickable");
    // });

    squaresBox.classList.add("js-unclickable");//computer add squares-boxをクリックできないようにする

    //display New Game
    newgamebtn_display.classList.remove("js-hidden");

    if (status==="penguins") {
        //winner-line penguins high-light
        if (winningLine){
            //const winningLine=Array.from(square);
            winningLine.forEach(function(square){
                square.classList.add("js-pen_highLight");
            });
           
        }
        //penguins win!! =>snow color is pink
        $(document).snowfall({
            flakeColor:"rgb(255,240,245)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true

        });
    } else if(status==="bear"){
        if (winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-bear_highLight");
            });
            
        }
        //bear win!! =>snow color is pink
        $(document).snowfall({
            flakeColor :"rgb(175,238,238)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true

        });
    }
}

//New Game
 newgamebtn.addEventListener("click",function(){
    flag= "pen-flag";
    counter=9;
    winningLine=null;
    squaresArray.forEach(function(square){
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
    // computer add
        square.classList.add("js-clickable");//squareがクリック可能かを判断するクラスを追加
    });
    //computer add
    squaresBox.classList.remove("js-unclickable");//squareがクリックできるようにする
    levelBox.classList.remove("js-unclickable");//levelBoxをクリックできるように

    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");
    //snowfall stop
    $(document).snowfall("clear");
 },false
 )

 //computer add
 function bearTurn(){
    //levelを取得
    let level = sessionStorage.getItem("tic_tac_toe_access");
    let bearTurnEnd ="0";
     let gameOverFlg="0";
     //bear clickできるクマ

     while(bearTurnEnd==="0"){
       
        if (level ==="1" || level==="2" || level==="3"){
            //クマのリーチ行検索(attack)
            bearTurnEnd = isReach("bear");
            if (bearTurnEnd==="1"){//クマのリーチ行あり...この一手で終わり
                gameOverFlg="1";
                break; //whileを終了
            }
        }
        
        if (level==="2" || level==="3"){
            //ペンギンのリーチ行検索(defense)
            bearTurnEnd = isReach("penguins");
            if (bearTurnEnd==="1"){
                break;//whileを終了
            }
        }
        
        if (level==="2" || level==="3"){
            //真ん中のマス目b_2が空いているから選ぶ
            if (b_2.classList.contains("js-clickable")){
                gameOverFlg=isSelect(b_2);
                bearTurnEnd="1"; //クマのターン終了
                break; //whileを終了
            }
        }

        if (level==="3") {
            //角のマス目a_1,a_3,c_1,c_3が空いていたら選ぶ
            for (let square of lineRandom){
                if(square.classList.contains("js-clickable")){
                    gameOverFlg= isSelect(square);
                    bearTurnEnd="1"; //クマのターン終了
                    break; //forのloopを終了
                }
            }
            if(bearTurnEnd==="1") break; //whileを終了
        }

        const bearSquare = squaresArray.filter(function(square){
            return square.classList.contains("js-clickable");
        });
        let n= Math.floor(Math.random()* bearSquare.length);//クリックできるクマ目の中から、１つをランダムに選ぶ
        gameOverFlg=isSelect(bearSquare[n]);
        break;//while を終了
    }
     // GameOverではない場合
    if (gameOverFlg==="0"){
        squaresBox.classList.remove("js-unclickable");
    } 
 }

 //リーチ行を探す
 function isReach(status){
    let bearTurnEnd="0";//クマのターン

    lineArray.some(function(line){
        let bearCheckCnt=0;//クマがチェックされている数
        let penCheckCnt=0;//ペンギンがチェックされている数
        line.forEach(function(square){
            if(square.classList.contains("js-bear-checked")){
                bearCheckCnt++;
            }
           if( square.classList.contains("js-pen-checked")){
                penCheckCnt++;
           }
        });

        //クマのリーチ行検索時に、クマのリーチ行あり
        if (status==="bear" && bearCheckCnt===2 && penCheckCnt===0){
            bearTurnEnd="1"; //クマのリーチ行あり
        }

        //ペンギンのリーチ行検索時に、ペンギンのリーチ行あり
        if (status==="penguins" && bearCheckCnt===0 && penCheckCnt===2) {
            bearTurnEnd ="1"; //ペンギンのリーチ行あり
        }

        //クマかペンギンのリーチ行ありの場合、空いているマス目を選択する
        
        if (bearTurnEnd==="1"){
            
            line.some(function(square){
                if(square.classList.contains("js-clickable")){
                    isSelect(square);
                    return true; 
                }
            })     
            return true;          
        }
        
    });
    return bearTurnEnd;
 }





 



