/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(data){
    return {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

let createEmployeeRecords = function(arr){
    return  arr.map(function(data){
        return createEmployeeRecord(data)
    })
}

let createTimeInEvent = function(dateTime){
    let [date, hour] = dateTime.split(' ')

    this.timeInEvents.push({
        type: 'TimeIn',
        date,
        hour: parseInt(hour, 10),
    })
    return this
}

let createTimeOutEvent = function(dateTime){
    let [date, hour] = dateTime.split(' ')

    this.timeOutEvents.push({
        type: 'TimeOut',
        date,
        hour: parseInt(hour, 10),
    })
    return this
}

let hoursWorkedOnDate = function(workTime){
    let timeInEvent = this.timeInEvents.find(function(e){
        return e.date === workTime
    })

    let timeOutEvent = this.timeOutEvents.find(function(e){
        return e.date === workTime
    })

    return (timeOutEvent.hour - timeInEvent.hour) / 100 
}

let wagesEarnedOnDate = function(dateTime){
    let workedDates = hoursWorkedOnDate.call(this, dateTime)
    * this.payPerHour
    return parseFloat(workedDates.toString())
}

let WagesFor = function(){
    let workedDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let pay = workedDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return pay    
}


let findEmployeeByFirstName = function(employees, firstName){
    return employees.find(function(src){
        return src.firstName === firstName
    })
}

let calculatePayroll = function(arrOfEmployee){
    return arrOfEmployee.reduce(function(memo, pay){
        return memo + allWagesFor.call(pay)
    }, 0)
}