const calendarBody = document.getElementById('calendarBody');
const monthYearDisplay = document.getElementById('monthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

let currentDate = new Date(); // Today's date
let selectedDate = new Date(); // Date used for generating calendar

function generateCalendar(date) 
{
    const year = date.getFullYear();
    const month = date.getMonth();

    // Set month and year display
    const monthNames = 
    [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

    // Get first and last days of the month
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Clear previous calendar
    calendarBody.innerHTML = '';

    let dateRow = '<tr>';

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) 
    {
        dateRow += '<td class="disabled"></td>';
    }

    // Add day numbers
    for (let day = 1; day <= lastDate; day++) 
    {
        if ((firstDay + day - 1) % 7 === 0 && day !== 1) 
        {
            dateRow += '</tr><tr>'; // Start a new row on each Sunday
        }

        // Check if this day is the current day to highlight it
        let classes = "";
        if (day === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
            classes = 'today';
        }
        dateRow += `<td class="${classes}">${day}</td>`;
    }

    dateRow += '</tr>';
    calendarBody.innerHTML = dateRow;
}

function changeMonth(delta) 
{
    selectedDate.setMonth(selectedDate.getMonth() + delta);
    generateCalendar(selectedDate);
}

// Event listeners for month change
prevMonthButton.addEventListener('click', () => changeMonth(-1));
nextMonthButton.addEventListener('click', () => changeMonth(1));

// Initialize calendar
generateCalendar(selectedDate);
