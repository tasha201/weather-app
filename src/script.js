let now = new Date();
//currrent day of the week
let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let day = days[now.getDay()];
document.querySelector('#day').innerHTML = day;

//currrent month
let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let month = months[now.getMonth()];
document.querySelector('#month').innerHTML = month;

//currrent date
let date = now.getDate();
document.querySelector('#date').innerHTML = date;

//currrent year
let year = now.getFullYear();
document.querySelector('#year').innerHTML = year;

//currrent time
let hours = now.getHours();
if (hours <= 9) {
  document.querySelector('#hours').innerHTML = '0' + hours;
  document.querySelector('#hours').style.fontWeight = '300';
} else {
  document.querySelector('#hours').innerHTML = hours;
  document.querySelector('#hours').style.fontWeight = '300';
}
let minutes = now.getMinutes();
if (minutes <= 9) {
  document.querySelector('#minutes').innerHTML = '0' + minutes;
  document.querySelector('#minutes').style.fontWeight = '300';
} else {
  document.querySelector('#minutes').innerHTML = minutes;
  document.querySelector('#minutes').style.fontWeight = '300';
}

