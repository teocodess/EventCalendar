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

function getQueryParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


//-----------------------------
function loadEventsForMonth() {
    const listEvent = document.getElementById('eventList');
   if (listEvent) {
    listEvent.innerHTML = ''; // Clear any existing list content

    const selectedMonth = parseInt(monthDropdown.value);
    const selectedYear = parseInt(yearDropdown.value);

    if(isNaN(selectedMonth) || isNaN(selectedYear)) {
        return; //exits if the month of year are not properly selected
    }

    // const queryDate = getQueryParam('date');
    // const events = JSON.parse(localStorage.getItem('events')) || [];
    // const eventsForDate = events.filter(event => event.date === queryDate);


    const events = JSON.parse(localStorage.getItem('events')) || [];
    const eventsForDate = events.filter(event => {
       const [year, month] = event.date.split('-').map(Number);
       return year === selectedYear && month === selectedMonth;
    });

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
        listItem.classList.add('p-4', 'border-b', 'border-gray-300', 'bg-gray-200', 'rounded-lg',
                'flex', 'flex-col', 'gap-1', 'mt-4');

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

if(yearDropdown && monthDropdown) {
    monthDropdown.addEventListener('change', loadEventsForMonth);
    yearDropdown.addEventListener('change', loadEventsForMonth);
}

// Call loadEventsToList when the page loads in listEvent.html
if (window.location.pathname.includes('listEvent.html')) {
    window.onload = loadEventsForMonth;
}
