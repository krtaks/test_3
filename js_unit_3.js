window.onclick = function(e) {
    var elem = e ? e.target : window.event.srcElement;

    if (elem.id == "start") {
        arraySearch = [];
        msec = 33;
        sec = -1;
        min = 0;
        timer();
        for (var i = 0; i < 16; i++) {
            generatorColor();
        }
        console.log(arraySearch);
    } else if (elem.id >= 0 || elem.id <= 15) {
        var point = document.getElementById(elem.id);
        point.style.background = arraySearch[elem.id];
        var counter = 0;
        for (var i = 0; i < arrayFound.length; i++) {
            if (arrayFound[i][0] == elem.id) {
                counter++;
            }
        }
        if (counter == 0) {
            pairSearch(elem.id);
            if (arrayFound.length == 16) {
                clearTimeout(tmsec);
                clearTimeout(tsec);
                var time = "" + min + ":" + sec + ":" + msec;
                setTimeout(alert("Вы затратили " + time), 2000);
            }
        }
    }
};

function cleaner() {
    for (var i = 0; i < 16; i++) {
        var point = document.getElementById(i);
        point.style.background = "white";
    }
}

function addMsec() {
    tmsec = setTimeout(addMsec, 200);
    msec = msec + 179;
    if (msec >= 850) {
        msec = 0;
    }
    document.getElementById("millisec").innerHTML = msec;
}

function addSec() {
    tsec = setTimeout(addSec, 1000);
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
    document.getElementById("sec").innerHTML = sec;
    document.getElementById("min").innerHTML = min;
}

function timer() {
    addMsec();
    addSec();
}

var arraySearch = [];
var arrayColor = {
    1: 'MediumBlue', 2: 'Cyan', 3: 'Red', 4: 'DeepPink',
    5: 'OrangeRed', 6: 'Gold', 7: 'Chocolate', 8: 'Lime'};

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function generatorColor() {
    var color = randomInteger(1,8);
    var count = 0;
    for(var j=0; j<arraySearch.length; j++)
        if(arraySearch[j] == arrayColor[color])
            count++;
    if(count == 2)
        generatorColor();
    else {
        arraySearch.push(arrayColor[color]);
    }
}

var arrayFound = [];

function pairSearch(id) {
    console.log("arrColor[id] ", arraySearch[id]);
    console.log("found ", arrayFound);
    console.log("countPoint ", arrayFound.length);

    if(arrayFound.length % 2 == 0 || arrayFound.length == 0)
        arrayFound.push([id, arraySearch[id]]);
    else if(arrayFound.length % 2 != 0) {
        if(arrayFound[arrayFound.length-1][1] == arraySearch[id])
            arrayFound.push([id, arraySearch[id]]);
        else if(arrayFound[arrayFound.length-1][1] != arraySearch[id]) {
            setTimeout(cleaner, 100);
            arrayFound = [];
        }
    }
    console.log("found", arrayFound);
}