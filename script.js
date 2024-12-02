let tasks = [];
let activities = [];
var actual = new Date();

// Event listeners for form submissions
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
        `;
        taskList.appendChild(taskItem);
    });

    document.getElementById('available-time').textContent = `Tiempo disponible semanal: ${calculateAvailableTime().toFixed(2)} horas`;
}

// Calendar functions
function mostrarCalendario(year, month) {
    var now = new Date(year, month - 1, 1);
    var last = new Date(year, month, 0);
    var primerDiaSemana = (now.getDay() == 0) ? 7 : now.getDay();
    var ultimoDiaMes = last.getDate();
    var dia = 0;
    var resultado = "<tr bgcolor='silver'>";
    var diaActual = 0;
    var last_cell = primerDiaSemana + ultimoDiaMes;

    for (var i = 1; i <= 42; i++) {
        if (i == primerDiaSemana) {
            dia = 1;
        }
        if (i < primerDiaSemana || i >= last_cell) {
            resultado += "<td>&nbsp;</td>";
        } else {
            if (dia == actual.getDate() && month == actual.getMonth() + 1 && year == actual.getFullYear())
                resultado += "<td class='hoy'>" + dia + "</td>";
            else
                resultado += "<td>" + dia + "</td>";
            dia++;
        }
        if (i % 7 == 0) {
            if (dia > ultimoDiaMes)
                break;
            resultado += "</tr><tr>\n";
        }
    }
    resultado += "</tr>";

    var meses = Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

    var nextMonth = month + 1;
    var nextYear = year;
    if (month + 1 > 12) {
        nextMonth = 1;
        nextYear = year + 1;
    }

    var prevMonth = month - 1;
    var prevYear = year;
    if (month - 1 < 1) {
        prevMonth = 12;
        prevYear = year - 1;
    }

    var caption = document.getElementById("calendar").getElementsByTagName("caption")[0];
    caption.innerHTML = `
        <div>${meses[month - 1]} / ${year}</div>
        <div>
            <a onclick='mostrarCalendario(${prevYear},${prevMonth})'>&lt;</a>
            <a onclick='mostrarCalendario(${nextYear},${nextMonth})'>&gt;</a>
        </div>
    `;
    
    document.getElementById("calendar").getElementsByTagName("tbody")[0].innerHTML = resultado;
}

// Initialize calendar
document.addEventListener('DOMContentLoaded', function() {
    var currentDate = new Date();
    mostrarCalendario(currentDate.getFullYear(), currentDate.getMonth() + 1);
});
