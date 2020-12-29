// https://webdesign.tutsplus.com/courses/3-javascript-projects-for-beginners/lessons/creating-a-countdown-timer
// https://codepen.io/tutsplus/pen/EBRgjY

var targetDate = moment('1/1/2020');

var $days = $('#days'),
    $hours = $('#hours'),
    $minutes = $('#minutes'),
    $seconds = $('#seconds');

setInterval(function() {
  // Calculate the time remaining
  var now = moment();
  var timeLeft = moment.duration(targetDate.diff(now));
  updateClock(timeLeft);
}, 10);

function updateClock(remainingTime) {
  // Display the difference
  var days = Math.floor(remainingTime.asDays()),
      hrs = Math.floor(remainingTime.asHours()) % 24,
      mins = Math.floor(remainingTime.asMinutes()) % 60,
      secs = Math.floor(remainingTime.asSeconds()) % 60;
  $('#days').text(padNumber(days));
  $('#hours').text(padNumber(hrs));
  $('#minutes').text(padNumber(mins));
  $('#seconds').text(padNumber(secs));
}

function padNumber(number) {
  var formattedNum = number;
  if (number < 10) {
    formattedNum = "0" + formattedNum;
  }
  return formattedNum;
}