"use strict";

const dailyButton = document.getElementById("button-daily");
const weeklyButton = document.getElementById("button-weekly");
const monthlyButton = document.getElementById("button-monthly");

const dataTime = document.querySelectorAll(".data-time");
const previousTime = document.querySelectorAll(".previous-time");

const cardTitle = document.querySelectorAll(".card-title");

const getData = async (time) => {
    const response = await fetch("data.json");
    if (response.status === 200) {
      const data = await response.json();
      showTitles(data);
      showInfo(time, data)
    } else {
      console.log("Houston!, Houston!... We have a problem");
    }
};

const showTitles = (data) => {
    for(let i=0; i<cardTitle.length; i++) {
        cardTitle[i].textContent = data[i].title;
    }
}

const showInfo = (time, data) => {
    for (let i=0; i<dataTime.length; i++) {
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

getData("weekly");

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
    getData("daily");
    select(dailyButton);
    deselect(weeklyButton,monthlyButton);
});

weeklyButton.addEventListener("click",()=>{
    getData("weekly");
    select(weeklyButton);
    deselect(dailyButton,monthlyButton);
});

monthlyButton.addEventListener("click",()=>{
    getData("monthly");
    select(monthlyButton);
    deselect(weeklyButton,dailyButton);
});
