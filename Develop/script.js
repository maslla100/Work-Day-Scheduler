$(function () {
    // Display the current date in the header
    function displayCurrentDate() {
        $('#currentDay').text(dayjs().format('dddd, MMMM D'));
    }

    // Apply the past, present, or future class to each time block
    function updateBlockClasses() {
        const currentHour = dayjs().hour(); // Get current hour in 24-hour format
        $('.time-block').each(function () {
            const blockHour = parseInt($(this).attr('id').replace('hour-', ''));
            $(this).removeClass('past present future');
            if (blockHour < currentHour) {
                $(this).addClass('past');
            } else if (blockHour === currentHour) {
                $(this).addClass('present');
            } else {
                $(this).addClass('future');
            }
        });
    }

    // Get user input from localStorage and set values of corresponding textareas
    function loadSavedEvents() {
        $('.time-block').each(function () {
            const id = $(this).attr('id');
            const savedText = localStorage.getItem(id) || '';
            $(this).find('.description').val(savedText);
        });
    }

    // Generate time blocks for business hours (9 AM to 5 PM)
    function generateTimeBlocks() {
        const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
        workHours.forEach(hour => {
            const formattedHour = hour <= 12 ? `${hour}AM` : `${hour - 12}PM`;
            $('#timeBlockContainer').append(`
                <div id="hour-${hour}" class="row time-block">
                    <div class="col-2 col-md-1 hour text-center py-3">${formattedHour}</div>
                    <textarea class="col-8 col-md-10 description" rows="3"></textarea>
                    <button class="btn saveBtn col-2 col-md-1">
                        <i class="fas fa-save"></i>
                    </button>
                </div>
            `);
        });
    }

    // Save button click event listener
    $('#timeBlockContainer').on('click', '.saveBtn', function () {
        const timeBlock = $(this).closest('.time-block');
        const id = timeBlock.attr('id');
        const text = timeBlock.find('.description').val();
        localStorage.setItem(id, text);
    });

    // Initialize the scheduler
    function initializeScheduler() {
        displayCurrentDate();
        generateTimeBlocks();
        loadSavedEvents();
        updateBlockClasses();
    }

    initializeScheduler();
});
