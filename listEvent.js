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
