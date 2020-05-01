function GetLocalStorage(key) {
  if (localStorage.getItem(key) != null)
    return localStorage.getItem(key);
  return null;
}

function SetLocalStorage(key, value) {
  const items = {
    ...localStorage
  };
  let increment = Object.keys(items).length;
  key = increment.toString() + ' ' + key;
  localStorage.setItem(key, value);
}

function createReminderItems(key, value) {
  day = key.split(' ')[1]
  month = key.split(' ')[2]
  var reminderList = document.getElementById("reminderList");
  var newReminderItem = value;
  var li = document.createElement("li");
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(newReminderItem));
  reminderList.appendChild(li);
  var reminderDate = document.createElement('div');
  reminderDate.className = 'float-right';
  ((parseInt(key % 10)) === 1) ? reminderDate.appendChild(document.createTextNode(month + " " + day + "st")):
    ((parseInt(key % 10)) === 2) ? reminderDate.appendChild(document.createTextNode(month + " " + day + "nd")) :
    ((parseInt(key % 10)) === 3) ? reminderDate.appendChild(document.createTextNode(month + " " + day + "rd")) :
    reminderDate.appendChild(document.createTextNode(month + " " + day + "th"));
  li.appendChild(reminderDate);
}

function loadListItems() {
  const items = {
    ...localStorage
  };
  window.onload = function init() {
    for (var i = 0; i < Object.keys(items).length; i++) {
      createReminderItems(Object.keys(items)[i], Object.values(items)[i]);
    }
  }
}


function arrayOfDaysInMonths(isLeapYear) {
  this[0] = 31;
  this[1] = 28;

  if (isLeapYear)
    this[1] = 29;
  this[2] = 31;
  this[3] = 30;
  this[4] = 31;
  this[5] = 30;
  this[6] = 31;
  this[7] = 31;
  this[8] = 30;
  this[9] = 31;
  this[10] = 30;
  this[11] = 31;
}

function daysInMonth(month, year) {
  // do the classic leap year calculation
  var isLeapYear = (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
  var monthDays = new arrayOfDaysInMonths(isLeapYear);

  return monthDays[month];
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

showCalendar(currentMonth, currentYear);

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  loadListItems();
  var startDay = (new Date(year, month)).getDay();

  // Start the calendar table     
  calendar = document.getElementById("calendar-body");
  calendar.innerHTML = "";
  monthAndYear.innerHTML = months[month] + " " + year;
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year))
        break;

      else {
        cell = document.createElement("td");
        var s = "" + date;
        if ((GetLocalStorage(date) != null))
          s = s.fontcolor("#FF0000");
        s = s.link("javascript:dayClick(" + date + ")")
        cell.innerHTML = s;
        for (var child = cell.firstChild; child !== null; child = cell.nextSibling) {
          cell.appendChild(child);
          row.appendChild(cell);
        }
        date++;
      }
    }
    calendar.appendChild(row);
  }
}

function dayClick(day) {
  key = day + ' ' + months[currentMonth];
  var theStorageItemKey = key;
  var theDayclickedReminder = GetLocalStorage(theStorageItemKey);
  reminder = prompt("Enter a reminder for day " + day + " of this month", theDayclickedReminder);
  SetLocalStorage(theStorageItemKey, reminder);
  createReminderItems(' ' + theStorageItemKey, reminder);
}
