<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Create New Task</h2>
      <div class="task-form">
        <label>
          Title:
          <input v-model="newTask.title" type="text" placeholder="Enter title"/>
        </label>
        <label>
          Description:
          <textarea v-model="newTask.description" placeholder="Enter description"></textarea>
        </label>
        <label>
          Status:
          <select v-model="newTask.status_id">
            <option :value="1">Draft</option>
            <option :value="2">In Progress</option>
            <option :value="3">Completed</option>
            <option :value="4">On Hold</option>
            <option :value="5">Deleted</option>
          </select>
        </label>
        <label>
          Priority:
          <select v-model="newTask.priority_id">
            <option :value="1">Low</option>
            <option :value="2">Medium</option>
            <option :value="3">High</option>
            <option :value="4">Urgent</option>
          </select>
        </label>
        <label>
          Due Date:
          <input v-model="newTask.due_date" type="date"/>
        </label>
      </div>
      <div class="modal-actions">
        <button class="save-button" @click="addNewTask">Save</button>
        <button class="cancel-button" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import {createTask, getTasks} from "@/services/taskService";
import Cookies from "js-cookie";

export default {
  props: {
    showCreateModal: {
      required: true,
      type: Boolean,
    },
    fetchTasks: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      newTask: {
        title: "",
        description: "",
        priority_id: 1,
        status_id: 1,
      },
    };
  },
  methods: {
    async addNewTask() {
      try {
        this.newTask.assigned_user_id = parseInt(Cookies.get('assignedUserId'));
        await createTask(this.newTask);
        await this.fetchTasks();
        this.tasks = await getTasks();
        this.$emit('close');
      } catch (err) {
        console.error("Error creating task:", err);
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
}

.task-form label {
  display: block;
  margin-bottom: 10px;
}

.task-form input,
.task-form textarea,
.task-form select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-button,
.cancel-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #ff4d4d;
}

.cancel-button:hover {
  background-color: #cc0000;
}
</style>
