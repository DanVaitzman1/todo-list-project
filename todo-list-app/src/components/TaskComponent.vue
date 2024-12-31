<template>
  <div class="task-card" :class="{ expanded: isExpanded }">
    <!-- Expand/Close Icon -->
    <div class="icon-container">
      <i
          :class="isExpanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"
          class="toggle-icon"
          @click="toggleDetails"
      ></i>
    </div>
    <!-- Closed View -->
    <div v-if="!isExpanded" class="task-summary">
      <div class="task-columns">
        <div class="task-column">
          <strong>Task ID</strong> {{ task.task_id }}
        </div>
        <div class="task-column">
          <strong>Owner</strong> {{ getUserDetailsByID(task.assigned_user_id) }}
        </div>
        <div class="task-column">
          <strong>Title</strong> {{ task.title }}
        </div>
        <div class="task-column">
          <strong>Status</strong> {{ getStatusString(task.status_id) }}
        </div>
        <div class="task-column">
          <strong>Priority</strong> {{ getPriorityString(task.priority_id) }}
        </div>
      </div>
    </div>
    <!-- Open View -->
    <div v-else class="task-details">
      <div class="task-header">
        <p><strong>Task ID</strong> {{ editableTask.task_id }}</p>
        <p><strong>Date Created</strong> {{ editableTask.create_date }}</p>
        <p><strong>Last Updated</strong> {{ editableTask.update_date }}</p>
      </div>
      <!-- Editable Fields -->
      <p>
        <strong>Owner</strong>
        <select
            v-model="editableTask.assigned_user_id"
            class="editable-input"
            @blur="saveTask('assigned_user_id')"
        >
          <option
              v-for="(user) in this.users"
              :key="user.user_id"
              :value="user.user_id"
          >
            {{ user.first_name }} {{ user.last_name }} (ID: {{ user.user_id }})
          </option>
        </select>
      </p>
      <p>
        <strong>Title</strong>
        <input
            type="text"
            v-model="editableTask.title"
            class="editable-input"
            @blur="saveTask('title')"
        />
      </p>
      <p>
        <strong>Status</strong>
        <select
            v-model="editableTask.status_id"
            class="editable-input"
            @blur="saveTask('status_id')"
        >
          <option
              v-for="(status, id) in statusMap"
              :key="id"
              :value="id"
          >
            {{ status }}
          </option>
        </select>
      </p>
      <p>
        <strong>Priority</strong>
        <select
            v-model="editableTask.priority_id"
            class="editable-input"
            @blur="saveTask('priority_id')"
        >
          <option
              v-for="(priority, id) in priorityMap"
              :key="id"
              :value="id"
          >
            {{ priority }}
          </option>
        </select>
      </p>
      <p>
        <strong>Description</strong>
        <textarea
            v-model="editableTask.description"
            class="editable-textarea"
            @blur="saveTask('description')"
        ></textarea>
      </p>
      <p>
        <strong>Due Date</strong>
        <input
            type="date"
            v-model="editableTask.due_date"
            class="editable-input"
            @blur="saveTask('due_date')"
        />
      </p>
      <!-- Delete Button -->
      <div class="task-footer">
        <button class="delete-button" @click="deleteTask">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteTask, getTasks, updateTask} from "@/services/taskService";

export default {
  name: "TaskComponent",
  props: {
    task: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
    fetchTasks: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      isExpanded: false,
      editableTask: {
        ...this.task,
        create_date: this.task.create_date ? new Date(this.task.create_date).toISOString().split("T")[0] : "",
        due_date: this.task.due_date ? new Date(this.task.due_date).toISOString().split("T")[0] : "",
        update_date: this.task.update_date ? new Date(this.task.update_date).toISOString().split("T")[0] : "",
      },
      statusMap: {
        1: "Draft",
        2: "In Progress",
        3: "On Hold",
        4: "Completed",
        5: "Deleted"
      },
      priorityMap: {
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Urgent"
      },
    };
  },

  methods: {
    toggleDetails() {
      this.isExpanded = !this.isExpanded;
    },
    async saveTask() {
      try {
        await updateTask(this.task.task_id, this.editableTask);
        await this.fetchTasks();
        this.tasks = await getTasks();
      } catch (err) {
        console.error("Error update task:", err);
      }
    },
    async deleteTask() {
      try {
        await deleteTask(this.task.task_id);
        await this.fetchTasks();
        this.tasks = await getTasks();
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    },
    getStatusString(statusId) {
      return this.statusMap[statusId] || "Unknown Status";
    },
    getPriorityString(priorityId) {
      return this.priorityMap[priorityId] || "Unknown Status";
    },
    getUserDetailsByID(userId) {
      const user = this.users.find((user) => user.user_id === userId);
      return user ? `${user.first_name} ${user.last_name} (ID: ${user.user_id})` : "User not found";
    }
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.task-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 5px 15px;
  max-width: 1000px;
  width: 100%;
  height: auto;
  cursor: pointer;
  transition: height 0.3s ease-in-out, transform 0.2s ease-in-out;
  overflow: hidden;
  position: relative;
}

.task-card:hover {
  transform: scale(1.02);
}

.task-card.expanded {
  background-color: #e4e4e4;
  transition: all 0.3s ease-in-out;
}

.task-summary {
  display: flex;
  flex-direction: column;
}

.task-columns {
  display: grid;
  grid-template-columns: 10% 20% 30% 20% 20%;
}

.task-column {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #ff0000;
}

.task-details p {
  margin: 8px 8px;
}

.icon-container {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.toggle-icon {
  font-size: 20px;
  color: #333;
  transition: transform 0.3s ease-in-out;
}

.toggle-icon:hover {
  color: #007bff;
}

.editable-input,
.editable-textarea,
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 15px;
  background-color: #ffffff;
  transition: border-color 0.3s ease;
}

.task-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;
}

.task-header p {
  margin: 0;
}

</style>