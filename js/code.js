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

const resetColor = (btnArr) => {
    for (let i=0; i<2; i++) {
        btnArr[i].classList.remove("select")
    }
}

getData("weekly");
weeklyButton.classList.add("select");

dailyButton.addEventListener("click",()=>{
    getData("daily");
    dailyButton.classList.add("select");
    resetColor([weeklyButton, monthlyButton]);
});

weeklyButton.addEventListener("click",()=>{
    getData("weekly");
    weeklyButton.classList.add("select");
    resetColor([dailyButton, monthlyButton]);
});

monthlyButton.addEventListener("click",()=>{
    getData("monthly");
    monthlyButton.classList.add("select");
    resetColor([weeklyButton, dailyButton]);
});
