"use strict";

window.addEventListener("DOMContentLoaded",
    function() {
        // ベージ本体が読み込まれたタイミングで実行するコード
        const item = document.querySelectorAll(".item01, .item02");
        item.forEach(function(element, index){
            //0.2s毎にずれて表示
            setTimeout(function () {
                element.classList.add("fade-in");

            }, 200 * index);
        });
    },false
);
