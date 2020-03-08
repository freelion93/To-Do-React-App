from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init DB
db = SQLAlchemy(app)
# Init marshmallow
ma = Marshmallow(app)


# Task Class-Model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(), unique=True)
    important = db.Column(db.Boolean)
    done = db.Column(db.Boolean)

    def __init__(self, label, important, done):
        self.label = label
        self.important = important
        self.done = done

# Product Schema


class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'label', 'important', 'done')


# Init Schema
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

# Get all tasks
@app.route('/allTasks', methods=['GET'])
def get_tasks():
    all_tasks = Task.query.all()
    result = tasks_schema.dump(all_tasks)
    return jsonify(result)

# Create Task
@app.route('/newTask', methods=['POST'])
def add_task():
    label = request.json['label']
    important = request.json['important']
    done = request.json['done']

    new_task = Task(label, important, done)

    db.session.add(new_task)
    db.session.commit()

    return task_schema.jsonify(new_task)

# Delete task
@app.route('/deleteTask/<id>', methods=['DELETE'])
def delete_product(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()

    return task_schema.jsonify(task)

# Updating task
@app.route('/updateTask/<id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)

    label = request.json['label']
    important = request.json['important']
    done = request.json['done']

    task.label = label
    task.important = important
    task.done = done

    db.session.commit()

    return task_schema.jsonify(task)


# Run Server
if(__name__ == '__main__'):
    app.run(debug=True)
