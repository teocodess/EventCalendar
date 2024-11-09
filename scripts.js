//-----------------------loading JSON file and merging with localStorage--------------------------
const loadData = async () => {
    try {
        const response = await fetch('./data/sportData.json.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const loadedData = await response.json();
        const externalEvents = loadedData.data;

        // Retrieve existing events from localStorage and merge with new data
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = [...events, ...externalEvents.map(event => ({
            status: event.status,
            date: event.dateVenue,
            time: event.timeVenueUTC,
            team1: event.homeTeam?.name || "TBD",
            team2: event.awayTeam.name,
            league: event.originCompetitionName,
            result1: event.result ? event.result.homeGoals : null,
            result2: event.result ? event.result.awayGoals : null,
        }))];

        localStorage.setItem('events', JSON.stringify(events));
        console.log("Events after merging: ", events);
        
    } catch (error) {
        console.log("Failed to fetch data: ", error);
    }
};

loadData();

//NB: conditional rendering of elements only if they exist on page
//------------------------addEvent page event listener-----------------------------
let events = [];
localStorage.setItem('events', JSON.stringify(events));
// And to load them:
events = JSON.parse(localStorage.getItem('events')) || [];

let addEventForm = document.getElementById('add_event');
if (addEventForm) {
    addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const event = {
        status: document.getElementById('status').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        team1: document.getElementById('team1').value,
        team2: document.getElementById('team2').value,
        league: document.getElementById('league').value,
        result1: document.getElementById('result1').value,
        result2: document.getElementById('result2').value,
    };

    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    console.log("Event added: ", event);

    //Refreshing the event list and calendar after saving
    loadEventsToList();
    populateCalendar(parseInt(monthDropdown.value), parseInt(yearDropdown.value));
});
} 

function getQueryParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

//-----------------------------
function loadEventsToList() {
    const listEvent = document.getElementById('eventList');
   if (listEvent) {
    listEvent.innerHTML = ''; // Clear any existing list content

    // Retrieve events from localStorage
    // const events = JSON.parse(localStorage.getItem('events')) || [];

    const queryDate = getQueryParam('date');
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const eventsForDate = events.filter(event => event.date === queryDate);

    // Check if there are events to display
    if (eventsForDate.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No events available';
        emptyMessage.classList.add('text-gray-500');
        listEvent.appendChild(emptyMessage);
        return;
    }

    // Iterate over each event and display its details
    eventsForDate.forEach(event => {
        const listItem = document.createElement('li');
        listItem.classList.add('p-4', 'border-b', 'border-gray-300', 'bg-gray-200');

        listItem.innerHTML = `
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Status:</strong> ${event.status}</p>
            <p><strong>Teams:</strong> ${event.team1} vs ${event.team2}</p>
            <p><strong>League:</strong> ${event.league}</p>
            <p><strong>Result:</strong> ${event.result1} : ${event.result2}</p>
        `;
        listEvent.appendChild(listItem);
    });
}
}
// Call loadEventsToList when the page loads in listEvent.html
if (window.location.pathname.includes('listEvent.html')) {
    window.onload = loadEventsToList;
}

let yearDropdown = document.getElementById('year_dropdown');
let monthDropdown = document.getElementById('month_dropdown');

//change, not a good practice to have anonymous function
(() => {
let yearStart = 1980;
let yearCurrent = (new Date).getFullYear(); 
let yearOption = '';

for(let i = yearCurrent; i >= yearStart; i--){
    let selected = (i === yearCurrent ? 'selected="selected"' : '')
    yearOption += `<option value="${i}" ${selected}>${i}</option>`;
}
if (yearDropdown){
yearDropdown.innerHTML = yearOption;
}
})();

//same here 
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

if(monthDropdown){
    monthDropdown.innerHTML = monthOption;
}
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
       const events = JSON.parse(localStorage.getItem('events')) || [];
       
       if (dateDisplay) {
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
            cell.style.cursor = 'pointer';

            const eventDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const eventForDate = events.find(event => event.date === eventDate);
            if (eventForDate) {
                const eventInfo = document.createElement("div");
                eventInfo.classList.add("event-info");
                eventInfo.textContent = `${eventForDate.team1} vs ${eventForDate.team2} - ${eventForDate.status}`;
                cell.appendChild(eventInfo);
            }
            
            //event listener for clicking on cell
            cell.addEventListener('click', () => {
                window.location.href = `listEvent.html?date=${eventDate}`;
            })
            
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
    }

    
if (yearDropdown, monthDropdown){
    monthDropdown.addEventListener('change', () => populateCalendar(parseInt(monthDropdown.value), parseInt(yearDropdown.value)));
    yearDropdown.addEventListener('change', () => populateCalendar(parseInt(monthDropdown.value), parseInt(yearDropdown.value)));
}    
  
    window.onload = () => {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const dateDisplay = document.getElementById('date_display');
        if (dateDisplay) {
            const monthDropdown = document.getElementById('month_dropdown');
            const yearDropdown = document.getElementById('year_dropdown');
            monthDropdown.value = currentMonth;
            yearDropdown.value = currentYear;
            yearDropdown.value = currentYear;
              
            yearDropdown.value = currentYear;    
              
            populateCalendar(currentMonth, currentYear);
        } else if(window.location.pathname.includes('listEvent.html')) {
            loadEventsToList();
        }
    }