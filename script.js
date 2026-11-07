let dailySelector = document.querySelector("#daily-filter");
let weeklySelector = document.querySelector("#weekly-filter");
let monthlySelector = document.querySelector("#monthly-filter");
let allFilters = document.querySelectorAll(".filter-container p");

let cardStats = document.querySelectorAll(".stat-row h3");
let cardStatsLP = document.querySelectorAll(".stat-row p");

let userData = [];
let workData;
let playData;
let studyData;
let exerciseData;
let socialData;
let selfCareData;

let cardData = [];

fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    userData = data;
    workData = userData[0];
    playData = userData[1];
    studyData = userData[2];
    exerciseData = userData[3];
    socialData = userData[4];
    selfCareData = userData[5];
    console.log(userData);

    cardData = [
      workData,
      playData,
      studyData,
      exerciseData,
      socialData,
      selfCareData,
    ];

    initializeData();
  });

const labels = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

dailySelector.addEventListener("click", updateData);
weeklySelector.addEventListener("click", updateData);
monthlySelector.addEventListener("click", updateData);

function updateData(e) {
  let timeframe = e.target.dataset.timeframe;
  for (const filter of allFilters) {
    filter.classList.remove("selected");
  }
  e.target.classList.add("selected");
  for (const stat of cardStats) {
    for (const data of cardData) {
      if (stat.dataset.card === data.title.toLowerCase()) {
        stat.textContent = `${data.timeframes[timeframe].current}hrs`;
      }
    }
  }
  for (const stat of cardStatsLP) {
    for (const data of cardData) {
      if (stat.dataset.card === data.title.toLowerCase()) {
        stat.textContent = `${labels[timeframe]} - ${data.timeframes[timeframe].previous}hrs`;
      }
    }
  }
}

function initializeData() {
  dailySelector.classList.add("selected");
  let timeframe = "daily";
  for (stat of cardStats) {
    for (const data of cardData) {
      if (stat.dataset.card === data.title.toLowerCase()) {
        stat.textContent = `${data.timeframes[timeframe].current}hrs`;
      }
    }
  }
  for (const stat of cardStatsLP) {
    for (const data of cardData) {
      if (stat.dataset.card === data.title.toLowerCase()) {
        stat.textContent = `${labels[timeframe]} - ${data.timeframes[timeframe].previous}hrs`;
      }
    }
  }
}
