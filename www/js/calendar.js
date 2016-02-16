days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

current_date = new Date();

function Calendar(month, year)  {
    this.month = (isNaN(month) || month == null) ? current_date.getMonth() : month;
    this.year = (isNaN(year) || year == null) ? current_date.getFullYear() : year;
    this.json = '';
}

Calendar.prototype.generateJSON = function() {

    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();

    var monthLength = days_in_month[this.month];
    var day = 1;
    var array = [];
    var weeks = 0;
    for (var i = 0; i < 9; i++) {
       var daysArray = [];
        for (var j = 0; j <=6 ;j++) {
            if (day <= monthLength && (i > 0 || j >= startingDay)) {
                daysArray.push(day++);
            }
        }

        array.push(daysArray);
        if (day > monthLength) {
            break;
        }

    }

    var primaryWeek = 8 - array[0].length;
    for (var k = 1; k < primaryWeek; k++) {
        array[0].unshift(null);
    }
    var count = array.length - 1;
    var lastWeek = 8 - array[count].length;
    for (var k = 1; k < lastWeek; k++) {
        array[count].push(null);
    }

    this.json = JSON.stringify(array);
}

Calendar.prototype.getJSON = function() {
  return this.json;
}

