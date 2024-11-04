# Sports Event Calendar

## Overview
This project is a **sports event calendar** created for the Sportradar Coding Academy frontend coding exercise. The application allows users to view sports events on a calendar, check event details, and add new events. The app is built with a focus on responsive design, interactivity, and an easy-to-navigate interface.

## Features
### Task 1: Calendar View
- Displays the current month in a grid format.
- Highlights days with scheduled sports events with a visual marker.
- (Optional) Displays event names on days with scheduled events.

### Task 2: Event Detail Page
- Allows users to click on any event to view full details.
- Displays date, time, sport type, and teams/participants for each event.

### Task 3: Add Event Functionality
- Provides a form for users to input details for a new event.
- New events are dynamically added to the calendar without requiring a page refresh.

### Task 4: Responsiveness
- Adapts to mobile, tablet, and desktop screen sizes.
- Uses responsive design techniques to ensure usability on smaller screens.

### Task 5: Navigation
- Contains a simple navigation bar to switch between views (Calendar and Add Event).
- Accessible navigation from all pages.

## Additional (Optional) Features
- [Optional] Filters: Users can filter events based on criteria like sport type or date range.
- [Optional] Styling: Enhanced UI with CSS and animations for a smooth user experience.
- [Optional] Persistent Storage: Events stored using local storage for session persistence.
- [Optional] Testing: Includes basic tests to verify core functionality.

## Setup and Installation
1. **Clone the Repository**:
   ```bash
   git clone [repository_url]
2. **Open the Project**:

    navigate to the project folder [calendarApp] and open [index.html] in your browser.

3. **Dependencies**:

    This project is built with HTML, TailwindCSS, and JavaScript (no external libraries required).
    Ensure JavaScript is enabled in the browser to run the app correctly.

4. **Running the Application**:

- Load index.html in your web browser to view the calendar.
- Use the navigation buttons to switch between Calendar View and Add Event.
- Add Event allows users to add new events. These events will appear in the calendar and are         available during the session (they reset when the browser reloads).

## Assumptions and Decisions

    Assumption: Only one event per day is displayed on the calendar view.
    Design Choice: Used a grid layout for the calendar to ensure a clean and user-friendly experience.
    Data Handling: Events are stored temporarily for the session without persistent storage.
    Optional Features: Some optional features like filters, storage, and tests are added for enhanced functionality.

## Future Enhancements

    Persistent Storage: Implement local storage for saving events across sessions.
    Advanced Filtering: Allow users to filter events by specific criteria.
    Improved UI/UX: Add more animations and styling for a refined experience.

## Version Control

    Commit History: Regular commits made to track progress logically, reflecting each development stage.
    [GitHub Repository:](https://github.com/teocodess/EventCalendar)

## Author

    Created by Teodora Velikova for the Sportradar Coding Academy Coding Exercise.