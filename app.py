from flask import Flask, request, jsonify
from datetime import datetime, timedelta
import calendar

app = Flask(__name__)

tasks = []
activities = []

def distribute_tasks():
    # Ordenar tareas por fecha de entrega
    sorted_tasks = sorted(tasks, key=lambda x: x['deadline'])
    
    # Calcular tiempo total disponible por semana
    total_weekly_time = 168 - sum(activity['time'] for activity in activities)
    
    schedule = {}
    current_date = datetime.now().date()
    
    for task in sorted_tasks:
        task_time_left = task['time']
        while task_time_left > 0 and current_date <= task['deadline'].date():
            if current_date not in schedule:
                schedule[current_date] = []
            
            # Distribuir tiempo para la tarea en este día
            time_for_task = min(task_time_left, total_weekly_time / 7)
            schedule[current_date].append({
                'name': task['name'],
                'time': time_for_task
            })
            
            task_time_left -= time_for_task
            current_date += timedelta(days=1)
    
    return schedule

@app.route('/add_task', methods=['POST'])
def add_task():
    task_data = request.json
    task = {
        'name': task_data['name'],
        'time': float(task_data['time']),
        'deadline': datetime.strptime(task_data['deadline'], '%Y-%m-%d')
    }
    tasks.append(task)
    return jsonify({'message': 'Task added successfully'}), 201

@app.route('/add_activity', methods=['POST'])
def add_activity():
    activity_data = request.json
    activity = {
        'name': activity_data['name'],
        'time': float(activity_data['time'])
    }
    activities.append(activity)
    return jsonify({'message': 'Activity added successfully'}), 201

@app.route('/get_schedule', methods=['GET'])
def get_schedule():
    schedule = distribute_tasks()
    return jsonify(schedule)

if __name__ == '__main__':
    app.run(debug=True)
