(function() {
  'use strict';
 
  var SOW = 0,
      EOW = 6;

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
    console.log();
    this.container = document.querySelector(selector);

    var getCurrentDate = this.options.defaultDate || new Date();
    this.todaysMonth = getCurrentDate.getMonth();
    this.todaysYear = getCurrentDate.getFullYear();
    var todaysDay = getCurrentDate.getDay();
    this.todaysDate = getCurrentDate.getDate();
    var firstDateCurrentMonth = new Date(this.todaysYear, this.todaysMonth, 1);
    var lastDateCurrentMonth = new Date(this.todaysYear, this.todaysMonth + 1, 0);
    var firstDayofMonth = firstDateCurrentMonth.getDay();
    var lastDayofMonth = lastDateCurrentMonth.getDay();

    this.firstPrintingDate = new Date(this.todaysYear, this.todaysMonth, 1 - firstDayofMonth);
    this.lastPrintingDate = new Date(this.todaysYear, this.todaysMonth + 1, EOW - lastDayofMonth);

    this.printMonth(this.container);
  }

  MonthCalendar.prototype.printMonth = function(item) {
    var self = this;
    function printDaysInMonth() {
      var dateHolder = self.firstPrintingDate;
      var coolMonth = [];
      while (true) {
        if (
          dateHolder.getDate() === self.lastPrintingDate.getDate() &&
          dateHolder.getMonth() === self.lastPrintingDate.getMonth() &&
          dateHolder.getFullYear() === self.lastPrintingDate.getFullYear()
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
              if (d.getDate() === self.todaysDate && d.getMonth() === self.todaysMonth && d.getFullYear() === self.todaysYear) {
                return acc + '<td class="active">' + d.getDate() + '</td>';
              } else {
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
        '<caption>' + defaultOptions.months[self.todaysMonth] + ',' + self.todaysYear + '</caption>',
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