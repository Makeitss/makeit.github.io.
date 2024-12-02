let tasks = [];
let activities = [];
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Event listeners for form submissions
document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('task-name').value;
    const time = parseFloat(document.getElementById('task-time').value);
    const date = document.getElementById('task-deadline').value;
    if (name && time > 0 && date) {
        tasks.push({ name, estimatedTime: time, date: new Date(date) });
        updateTaskList();
        updateCalendar();
        this.reset();
    }
});

document.getElementById('activity-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('activity-name').value;
    const time = parseFloat(document.getElementById('activity-time').value);
    if (name && time > 0) {
        activities.push({ name, weeklyTime: time });
        updateTaskList();
        this.reset();
    }
});

// Task and activity management functions
function calculateAvailableTime() {
    const totalWeeklyHours = 168; // 24 hours * 7 days
    const usedTime = activities.reduce((sum, activity) => sum + activity.weeklyTime, 0);
    return totalWeeklyHours - usedTime;
}

function distributeTime() {
    const availableTime = calculateAvailableTime();
    const totalEstimatedTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
    
    if (totalEstimatedTime > availableTime) {
        return tasks.map(task => ({
            ...task,
            allocatedTime: (task.estimatedTime / totalEstimatedTime) * availableTime
        }));
    } else {
        return tasks.map(task => ({ ...task, allocatedTime: task.estimatedTime }));
    }
}

function updateTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    const distributedTasks = distributeTime();
    
    distributedTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${task.name}</span>
            <span>${task.allocatedTime.toFixed(2)} horas</span>
            <span>${task.date.toLocaleDateString()}</span>
        `;
        taskList.appendChild(taskItem);
    });

    document.getElementById('available-time').textContent = `Tiempo disponible semanal: ${calculateAvailableTime().toFixed(2)} horas`;
}

// Calendar functions
function updateCalendar() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    document.querySelector('.current-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
    
    let date = 1;
    let tbody = document.querySelector('.calendar tbody');
    tbody.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                cell.classList.add('prev-month');
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                let cell = document.createElement('td');
                cell.classList.add('next-month');
                row.appendChild(cell);
            } else {
                let cell = document.createElement('td');
                cell.textContent = date;
                if (date === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
                    cell.classList.add('current-day');
                }
                if (hasTaskOnDate(currentYear, currentMonth, date)) {
                    cell.classList.add('has-task');
                }
                row.appendChild(cell);
                date++;
            }
        }
        tbody.appendChild(row);
    }
}

function hasTaskOnDate(year, month, day) {
    return tasks.some(task => {
        const taskDate = new Date(task.date);
        return taskDate.getFullYear() === year &&
               taskDate.getMonth() === month &&
               taskDate.getDate() === day;
    });
}

document.querySelector('.month-nav.prev').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

document.querySelector('.month-nav.next').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

// Initialize calendar
document.addEventListener('DOMContentLoaded', function() {
    updateCalendar();
});