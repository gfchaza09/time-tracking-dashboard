"use strict";

const dailyButton = document.getElementById("button-daily");
const weeklyButton = document.getElementById("button-weekly");
const monthlyButton = document.getElementById("button-monthly");

const dataTime = document.querySelectorAll(".data-time");
const previousTime = document.querySelectorAll(".previous-time");

const cardTitle = document.querySelectorAll(".card-title");

const showTitles = () => {
    for(let i=0; i<cardTitle.length; i++) {
        fetch("../data.json")
            .then((response) => response.json())
            .then((data) => cardTitle[i].textContent = data[i].title);
    }
}

// const showTitles = () => {
//     const mydata = JSON.parse(data);
//     console.log(mydata);
//     for(let i=0; i<cardTitle.length; i++) {
//         cardTitle[i].textContent = data[i].title;
//     }
// }

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
const data = readTextFile("/data.json", function(text){
    return JSON.parse(text);
});

console.log(data);

const showInfo = (time) => {
    for(let i=0; i<dataTime.length; i++) {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => {
                if (time==="daily") {
                    dataTime[i].textContent = `${data[i].timeframes.daily.current}hrs`;
                    previousTime[i].textContent = `Last day - ${data[i].timeframes.daily.previous}hrs`;
                } else if (time==="weekly") {
                    dataTime[i].textContent = `${data[i].timeframes.weekly.current}hrs`;
                    previousTime[i].textContent = `Last week - ${data[i].timeframes.weekly.previous}hrs`;
                } else if (time==="monthly") {
                    dataTime[i].textContent = `${data[i].timeframes.monthly.current}hrs`;
                    previousTime[i].textContent = `Last month - ${data[i].timeframes.monthly.previous}hrs`;
                }
            })
    }
}

const select = (button) => {
    button.addEventListener("click",()=> {
        button.style.color = "#fff";
    })
}

const deselect = (button1, button2) => {
    button1.style.color = "hsl(235, 45%, 61%)";
    button2.style.color = "hsl(235, 45%, 61%)";
}

showTitles();
showInfo("weekly");
select(weeklyButton);

dailyButton.addEventListener("mouseover",()=>{
    select(dailyButton);
});

weeklyButton.addEventListener("mouseover",()=>{
    select(weeklyButton);
});

monthlyButton.addEventListener("mouseover",()=>{
    select(monthlyButton);
});

dailyButton.addEventListener("click",()=>{
    showInfo("daily");
    select(dailyButton);
    deselect(weeklyButton,monthlyButton);
});

weeklyButton.addEventListener("click",()=>{
    showInfo("weekly");
    select(weeklyButton);
    deselect(dailyButton,monthlyButton);
});

monthlyButton.addEventListener("click",()=>{
    showInfo("monthly");
    select(monthlyButton);
    deselect(weeklyButton,dailyButton);
});
