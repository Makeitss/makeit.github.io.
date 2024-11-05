let tasks = [];
let activities = [];

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('task-name').value;
    const time = parseFloat(document.getElementById('task-time').value);
    if (name && time > 0) {
        tasks.push({ name, estimatedTime: time });
        updateTaskList();
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
        `;
        taskList.appendChild(taskItem);
    });

    document.getElementById('available-time').textContent = `Tiempo disponible semanal: ${calculateAvailableTime().toFixed(2)} horas`;
}
