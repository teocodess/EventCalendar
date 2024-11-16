
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
        loadEventsToList();

        // Refresh the calendar view
        const selectedMonth = parseInt(monthDropdown.value);
        const selectedYear = parseInt(yearDropdown.value);
        populateCalendar(selectedMonth, selectedYear);
    });
}

//write another function to get ALL events from the current month shown in the calendar 