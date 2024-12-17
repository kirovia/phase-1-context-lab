/* Your Code Here */

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
};

function createTimeInEvent(date) {
    let splitDate = date.split(' ');
    const newObject = {
        type: 'TimeIn',
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    };
    this.timeInEvents.push(newObject);
    return this;
};

function createTimeOutEvent(date) {
    let splitDate = date.split(' ');
    const newObject = {
        type: 'TimeOut',
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    };
    this.timeOutEvents.push(newObject);
    return this;
};

function hoursWorkedOnDate(date) {
    let clockIn = 0;
    let clockOut = 0;
    this.timeInEvents.forEach(item => {
        if (item.date === date) {
            clockIn = item.hour;
        }
    })
    this.timeOutEvents.forEach(item => {
        if (item.date === date) {
            clockOut = item.hour;
        }
    })
    return (clockOut - clockIn) / 100;
};

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.filter(employee => employee.firstName === firstName)[0];
};

function calculatePayroll(array) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        counter += allWagesFor.call(array[i], array[i])
    }
    return counter;
};