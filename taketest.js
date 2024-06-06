// ________QUIZ_APP________________
const quizTimer = document.querySelector("#timer");
const quizCount = document.querySelector(".question h3");
const quizText = document.querySelector("#quiz_title");
const quizAnswers = document.querySelectorAll(".question ul li");
const quizAnswerItem = document.querySelectorAll(".answer_item");
const quizProgress = document.querySelector("#progress");
const quizProgressText = document.querySelector("#progress_text");
// const btnPrev = document.querySelector("#btn_pre");
// const btnNext = document.querySelector("#btn_next");
const quizQuestionsList = document.querySelector(".quiz_list ul");
const quizSubmit = document.querySelector("#quiz_submit");
let quizQuestions = document.querySelectorAll(".quiz_list ul li");
function randomArr(arr) {
  return (arr = arr.sort(() => Math.random() - Math.random()));
}
let questions;
let currentIndex = null;
let listSubmit = [];
let listResult = [];
let isSubmit = false;
let correct = 0;

let startTime;
let endTime;
let formattedTime;
let score;

const API =
  "https://script.google.com/macros/s/AKfycbyetDbQL7UbicFwXiupnBQ-fVFS2Hv-v2axqfYmQZQ-lf2kK7sJ7hOBe-cMSh6oj-gF/exec";
const quiz = {
  send_data: async function (data) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      mode: "no-cors",
      redirect: "follow",
    };

    fetch(
      "https://script.google.com/macros/s/AKfycbxeNMFZW2XtXkvknJEzj4JOmsUzxr5pp-iIeAtVoo4SOlHJbFOI0vfBXyEe_TzxkIYH/exec",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  },

  getQuestions: async function (test) {
    try {
      const response = await fetch(`${API}?category=${test}`);
      const data = await response.json();
      questions = data;
      console.log(data);
      startTime = Date.now();
    } catch (error) {
      alert("Da xay ra loi");
    }
  },
  getResults: async function () {
    quizSubmit.innerText = "Đang nộp bài";
    const postData = {
      category: "test1",
      questionlist: questions,
    };
    console.log(postData);
    try {
      const response = await fetch(API, {
        method: "POST",
        body: JSON.stringify(postData),
      });
      const results = await response.json();
      console.log(results);
      this.handleCheckResults(results);
      quizSubmit.innerText = "Kết quả";
      quizSubmit.style = "pointer-events:none";
    } catch (error) {
      console.log(error);
      alert("Da xay ra loi");
    }
  },
  randomQuestion: function () {
    questions = randomArr(questions);
    questions.forEach((q) => {
      q.answers = randomArr(q.answers);
    });
  },
  renderResults: function () {
    if (listResult[currentIndex] === listSubmit[currentIndex]) {
      quizAnswers.forEach((item) => {
        item.classList.remove("incorrect");
      });
      quizAnswers[listResult[currentIndex]].classList.add("active");
    } else {
      quizAnswers.forEach((item) => {
        item.classList.remove("active");
        item.classList.remove("incorrect");
      });
      quizAnswers[listResult[currentIndex]].classList.add("active");
      quizAnswers[listSubmit[currentIndex]].classList.add("incorrect");
    }
  },

  handleSubmit: function () {
    quizSubmit.addEventListener("click", () => {
      const progressLen = listSubmit.filter((item) => item >= 0);
      if (progressLen.length === questions.length) {
        endTime = Date.now();
        this.getResults();
      } else {
        alert("Bạn chưa chọn hết đáp án");
      }
    });
  },
  handleCheckResults: function (results) {
    questions.forEach((item, index) => {
      const result = results.find((r) => r.quiz_id === item.quiz_id);
      if (item.answers[listSubmit[index]] === result.answer) {
        listResult[index] = listSubmit[index];
        correct++;
      } else {
        quizQuestions[index].classList.add("incorrect");
        listResult[index] = item.answers.indexOf(result.answer);
      }
    });
    isSubmit = true;
    this.handleProgress(correct);
    quizQuestions[0].click();
    score = (correct / questions.length) * 10;
    const data_send = {
      user: "test user",
      id: "test",
      scores: score,
      timeSubmit: new Date().toLocaleString(),
      ques: JSON.stringify(questions), // convert object to string
      listSub: JSON.stringify(listResult), // convert object to string
      listRes: JSON.stringify(listResult),
    };
    console.log(data_send);
    this.send_data(data_send);
  },
  handleQuestionList: function () {
    quizQuestions.forEach((item, index) => {
      item.addEventListener("click", () => {
        item.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        quizQuestions.forEach((item) => {
          item.classList.remove("active");
        });
        item.classList.add("active");
        currentIndex = index;
        this.renderCurQuestions();
        quizAnswers.forEach((item) => {
          item.classList.remove("active");
        });
        const selected = listSubmit[currentIndex];
        selected >= 0 && quizAnswers[selected].click();
        if (isSubmit) {
          this.renderResults();
        }
      });
    });
    quizQuestions[0].click();
  },
  handleAnswer: function () {
    quizAnswers.forEach((answer, index) => {
      answer.addEventListener("click", () => {
        if (!isSubmit) {
          quizAnswers.forEach((item) => {
            item.classList.remove("active");
          });
          answer.classList.add("active");
          quizQuestions[currentIndex].classList.add("selected");
          listSubmit[currentIndex] = index;
          console.log(listSubmit);
          this.handleProgress();
        } else {
          return;
        }
      });
    });
  },
  handleProgress: function (correct) {
    const r = quizProgress.getAttribute("r");
    if (!isSubmit) {
      const progressLength = listSubmit.filter((item) => item >= 0).length;
      quizProgress.style = `stroke-dasharray: ${
        (2 * Math.PI * r * progressLength) / questions.length
      } 9999;`;
      quizProgressText.innerText = `${progressLength}/${questions.length}`;
    } else {
      quizProgress.style = `stroke-dasharray: ${
        (2 * Math.PI * r * correct) / questions.length
      } 9999;`;
      quizProgressText.innerText = `${correct}/${questions.length}`;
    }
  },
  // handleNext: function () {
  //   btnNext.addEventListener("click", () => {
  //     currentIndex++;
  //     if (currentIndex > questions.length - 1) {
  //       currentIndex = 0;
  //     }
  //     quizQuestions[currentIndex].click();
  //   });
  // },
  // handlePrev: function () {
  //   btnPrev.addEventListener("click", () => {
  //     --currentIndex;
  //     if (currentIndex < 0) {
  //       currentIndex = questions.length - 1;
  //     }
  //     quizQuestions[currentIndex].click();
  //   });
  // },
  renderQuestionList: function () {
    let render = "";
    questions.forEach((question, index) => {
      render += ` <li>${index + 1}</li>`;
    });
    quizQuestionsList.innerHTML = render;
    quizQuestions = document.querySelectorAll(".quiz_list ul li");
  },
  renderCurQuestions: function () {
    quizCount.innerText = `Question ${currentIndex + 1}:`;
    quizText.innerText = questions[currentIndex].question;
    quizAnswerItem.forEach((answer, index) => {
      answer.innerText = questions[currentIndex].answers[index];
    });
  },
  renderProgress: function () {
    quizProgress.style = `stroke-dasharray: 0 9999;`;
    quizProgressText.innerText = `0/${questions.length}`;
  },
  renderTimer: function () {
    const quiz_timer = document.querySelector(".quiz_timer");

    var seconds = 2400; // 30 phút
    function countdown() {
      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = seconds % 60;
      if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
      }
      quiz_timer.innerHTML = `<div class="quiz_timer_txt">
                    <span>Time remaining</span>
                    <p id="countdown">${minutes}:${remainingSeconds}</p>
               </div>`;
      if (seconds == 0) {
        clearInterval(countdownTimer);
        quiz_timer.innerHTML = `<div class="quiz_timer_txt">
                    <span>Time remaining</span>
                    <p id="countdown">Hết giờ!</p>
               </div>`;
        this.getResults();
      } else if (isSubmit) {
        clearInterval(countdownTimer);
        let timeTaken = Math.round((endTime - startTime) / 1000); // time in seconds
        let minutes = Math.floor(timeTaken / 60);
        let remainingSeconds = timeTaken % 60;

        if (remainingSeconds < 10) {
          remainingSeconds = "0" + remainingSeconds;
        }

        formattedTime = minutes + ":" + remainingSeconds;
        score = (correct / questions.length) * 10;
        quiz_timer.innerHTML = `<div class="result">
                    <p id="result">Scores: ${score}/10</p>
                    <br>
                    <p id="time_taken">Time taken: ${formattedTime}</p>
               </div>`;
      } else {
        seconds--;
      }
    }

    var countdownTimer = setInterval(countdown, 1000);
  },

  render: function () {
    this.renderQuestionList();
    this.renderProgress();
    this.renderTimer();
  },
  handle: function () {
    this.handleQuestionList();
    this.handleAnswer();
    this.handleSubmit();
  },
  start: async function (test) {
    await this.getQuestions(test);
    this.randomQuestion();
    this.render();
    this.handle();
  },
};
// quiz.start("test1");
window.onload = function () {
  var urlParams = new URLSearchParams(window.location.search);
  var test = urlParams.get("option");
  if (test) {
    quiz.start(test);
  }
};
