const loadData = async () => {
    try {
        const response = await fetch('./data/sportData.json.json');
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const loadedData = await response.json();
        const data = loadedData.data;
        console.log(data)
    }

    catch (error) {
        console.log("Failed to fetch data: ", error)
    }
}

loadData();



//write function with param to get the date based on a month 1-12 -> gets you the number of days if statement for february based on the year,
//second param is year based on month - year populate the table with the corresponding dates 
//another function focusing on first/last date of the month and the weekday 1-7

function daysInMonth(month, year){
    return new Date(year, month + 1, 0).getDate(); //returns 0-indexed months 
}

function currentMonthDays() {
let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

console.log("Number of days in " + (month + 1) + " of year " + year +
    " is " + daysInMonth(month, year));
}

currentMonthDays()

function daysInAnyMonth(month, year){
switch(month) {
    case 1: //January
    case 3: //March 
    case 5: //May
    case 7: //July
    case 8: //August
    case 10: //October
    case 12: //December 
        return 31;
    case 4: //April
    case 6: //June
    case 9: //September
    case 11: //November
        return 30;
    case 2: //February
        return (year % 4 === 0 && (year % 100 
    !== 0 || year % 400 === 0)) ? 29 : 28;
        default: 
            return -1; //Invalid month
}
}

let month = 2;
let year = 2018;
console.log("Number of days in " + month + "th month of the year "
    + year + " is " + daysInAnyMonth(month, year));