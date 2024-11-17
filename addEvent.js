
let addEventForm = document.getElementById('event_form');
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
        localStorage.setItem('events', JSON.stringify(events));

        console.log("Event added: ", event);

        // Refresh the event list and calendar after saving
        loadEventsForMonth();

        // Refresh the calendar view
        const selectedMonth = parseInt(monthDropdown.value);
        const selectedYear = parseInt(yearDropdown.value);
        populateCalendar(selectedMonth, selectedYear);
    });
}

//write another function to get ALL events from the current month shown in the calendar, at the moment it only happens if I click on the specific event and the list loads
//but I want to also be able to get the events if I just click on list view and load all events for the respective month from the array based on the month/year dropdown seleciton
//find a way to add more data to the json file and fix the localStorage problem with showing multiple results
//later add a filter to get only "football, scheduled, etc."
//problem every time I reload the page, the json file gets reADDED to the localStorage so the events show many many times
//maybe it is better if the json file doesnt get added to the localStorage but just gets added to the page, maybe change that to avoid unnecessary load ups
//calendar view status legend 
//calendar - only dots -> json file status played but in events also dots to get displayed if it is played, scheduled (write a function)