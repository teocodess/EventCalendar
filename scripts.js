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

// function daysInMonth(month, year){
//     return new Date(year, month + 1, 0).getDate(); //returns 0-indexed months 
// }

// function currentMonthDays() {
// let date = new Date();
// let month = date.getMonth();
// let year = date.getFullYear();

// console.log("Number of days in " + (month + 1) + " of year " + year +
//     " is " + daysInMonth(month, year));
// }

// currentMonthDays()

let yearDropdown = document.getElementById('year_dropdown');
let monthDropdown = document.getElementById('month_dropdown');


(() => {
let yearStart = 1980;
let yearCurrent = (new Date).getFullYear(); 
let yearOption = '';

for(let i = yearCurrent; i >= yearStart; i--){
    let selected = (i === yearCurrent ? 'selected="selected"' : '')
    yearOption += `<option value="${i}" ${selected}>${i}</option>`;
}

yearDropdown.innerHTML = yearOption;
})();

(() => {
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthCurrent = (new Date).getMonth(); 
let monthValue = '';
let monthOption = `<option value=" ">Select Month</option>`; //first value

for(let i = 0; i < months.length; i++){
    monthValue = (i + 1);
    let selected = (i === monthCurrent ? 'selected' : '');
    monthOption += `<option value="${monthValue}" ${selected}>${months[i]}</option>`
}

monthDropdown.innerHTML = monthOption;
})();

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


    // function displayDays () {
    //     let selectedMonth = parseInt(monthDropdown.value);
    //     let selectedYear = parseInt(yearDropdown.value);
    //     let dateDisplay = document.getElementById('date_display');

    //     if ( selectedMonth && selectedYear ){
    //         let days = daysInAnyMonth(selectedMonth, selectedYear);
    //         dateDisplay.innerHTML = `Number of days in ${monthDropdown.options[monthDropdown.selectedIndex].text} ${selectedYear}: ${days}`;
    //     }  
    //     console.log("Number of days in " + selectedMonth + "th month of the year "
    //         + selectedYear + " is " + daysInAnyMonth(selectedMonth, selectedYear)); 
    // }

    function populateCalendar(month, year){
        const dateDisplay = document.getElementById('date_display');

        //clear existing dates for new month selection
        dateDisplay.innerHTML = `
         <div class="text-center">Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
        `;

        //calculates first day and num of days in current month
        const firstDay = new Date(year, month - 1, 1).getDay();
        const daysInMonth = daysInAnyMonth(month, year);

        //calculates prev month's days to fill up empty cells at calendar start
        const prevMonthDays = daysInAnyMonth(month - 1, year);
        const startingEmptyCells = (firstDay + 6) % 7; //adjust first day to start at mon as start
    
        for(let i = startingEmptyCells; i>0; i--){
            const cell = document.createElement("div");
            cell.classList.add("text-gray-400");
            cell.textContent = prevMonthDays - i + 1;
            dateDisplay.appendChild(cell);
        }

        //add current month dates
        for (let day = 1; day <= daysInMonth; day++){
            const cell = document.createElement("div");
            cell.textContent = day;
            cell.classList.add("current-month");
            dateDisplay.appendChild(cell);
        }

        //fill remaining space with next month's starting dates
        const totalCells = startingEmptyCells + daysInMonth;
        const nextMonthDays = 7 - (totalCells % 7);
        for(let i = 1; i<= nextMonthDays && nextMonthDays <7; i++){
            const cell = document.createElement("div");
            cell.classList.add("text-gray-400");
            cell.textContent = i;
            dateDisplay.appendChild(cell);
        }
    }

    monthDropdown.addEventListener('change', () => populateCalendar(parseInt(monthDropdown.value), parseInt(yearDropdown.value)));
    yearDropdown.addEventListener('change', () => populateCalendar(parseInt(monthDropdown.value), parseInt(yearDropdown.value)));
    
  
    window.onload = () => {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        monthDropdown.value = currentMonth;
        yearDropdown.value = currentYear;
        populateCalendar(currentMonth, currentYear);
    }