(function() {
  'use strict';
  var getCurrentDate = new Date(2017, 1, 1);
  var todaysMonth = getCurrentDate.getMonth();
  var todaysYear = getCurrentDate.getFullYear();
  var todaysDay = getCurrentDate.getDay();
  var todaysDate = getCurrentDate.getDate();
  var firstDateCurrentMonth = new Date(todaysYear, todaysMonth, 1);
  var lastDateCurrentMonth = new Date(todaysYear, todaysMonth + 1, 0);
  var firstDayofMonth = firstDateCurrentMonth.getDay();
  var lastDayofMonth = lastDateCurrentMonth.getDay();
  var SOW = 0,
      EOW = 6;
  var firstPrintingDate = new Date(todaysYear, todaysMonth, 1 - firstDayofMonth);
  var lastPrintingDate = new Date(todaysYear, todaysMonth + 1, EOW - lastDayofMonth);


  var defaultOptions = {
    months: [
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
    ],

    days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  };

  function MonthCalendar(selector, options) {
    options = options || {};

    this.options = Object.assign({}, defaultOptions, options);
    this.container = document.querySelector(selector);
    this.getWeekDays(this.container);
  }

  MonthCalendar.prototype.getWeekDays = function(item) {

    function printDaysInMonth() {
      var dateHolder = firstPrintingDate;
      var coolMonth = [];
      while (true) {
        if (
          dateHolder.getDate() === lastPrintingDate.getDate() &&
          dateHolder.getMonth() === lastPrintingDate.getMonth() &&
          dateHolder.getFullYear() === lastPrintingDate.getFullYear()
        ) {
          coolMonth.push(new Date(dateHolder.getTime()));
          break;
        }
        coolMonth.push(new Date(dateHolder.getTime()));

        dateHolder.setDate(dateHolder.getDate() + 1);
      }

      var week = [],
        html = [];

      coolMonth.forEach(function(day) {
        week.push(day);
        if (day.getDay() === EOW) {
          (function() {
            html.push('<tr>' + week.reduce(function(acc, d) {

              if(d.getDate() === todaysDate && d.getMonth() === todaysMonth && d.getFullYear() === todaysYear){
                return acc + '<td class="active">' + d.getDate() + '</td>';
                console.log(d.getDate());
              }
              else
                  {
                    return acc + '<td>' + d.getDate() + '</td>';
                  }
            }, '') + '</tr>');
          })(week)
          week = [];
        }
      });

      // console.log(coolMonth);
      return html.join('');
    }

    function printWeekDay() {
      var coolDay = [];

      for (var i = 0; i <= 6; i++) {
        coolDay.push('<th>' + defaultOptions.days[i] + '</th>');
      }
      return coolDay.join('');
    }

    var html = (function() {
      return [
        '<div class="calendar">',
        '<table style="width:80%">',
        '<caption>' + defaultOptions.months[todaysMonth] + ',' + todaysYear + '</caption>',
        '<tr class="days">',
        printWeekDay(),
        '</tr>',
        printDaysInMonth(),
        '</table>',
        '</div>'
      ].join('');
    })();
    item.innerHTML = html;
  };

  window.MonthCalendar = MonthCalendar;
})();