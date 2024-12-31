<template>
  <div class="tasks-page">
    <div class="sidebar">
      <!-- Top Section: Tabs and Create Button -->
      <div class="sidebar-top">
        <button
            class="sidebar-tab"
            :class="{ active: activeTab === 'myTasks' }"
            @click="setActiveTab('myTasks')"
        >
          My Tasks
        </button>
        <button
            class="sidebar-tab"
            :class="{ active: activeTab === 'allTasks' }"
            @click="setActiveTab('allTasks')"
        >
          All Tasks
        </button>
        <button class="create-button" @click="showCreateModal = true">
          Create New Task
        </button>
        <button class="export-button" @click="exportToCSV">Export to CSV</button>
      </div>
      <!-- Bottom Section: Logout -->
      <div class="sidebar-bottom">
        <button class="logout-button" @click="logout">Logout</button>
      </div>
    </div>
    <div class="tasks-content">
      <h1 class="page-title">{{ activeTab === 'myTasks' ? 'My Tasks' : 'All Tasks' }}</h1>
      <div class="header-actions">
        <PowerSearch @search="handleSearch"/>
      </div>
      <TaskCreationModal
          v-if="showCreateModal"
          :showCreateModal="showCreateModal"
          @close="showCreateModal = false"
          :fetchTasks="fetchTasks"
      />
      <div class="tasks-container">
        <div
            class="task-box"
            v-for="task in filteredTasks"
            :key="task.task_id"
        >
          <TaskComponent :task="task" :users="users" :fetchTasks="fetchTasks"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import TaskComponent from "@/components/TaskComponent.vue";
import PowerSearch from "@/components/PowerSearch.vue";
import TaskCreationModal from "@/components/TaskCreationModal.vue";
import {getTasks} from "@/services/taskService";
import {getUsers} from "@/services/userService";

export default {
  components: {
    TaskComponent,
    PowerSearch,
    TaskCreationModal,
  },
  data() {
    return {
      activeTab: "myTasks",
      tasks: [],
      users: [],
      myTasks: [],
      allTasks: [],
      searchQuery: "",
      selectedFilter: "all",
      showCreateModal: false,
      userId: null,
    };
  },
  computed: {
    filteredTasks() {
      const tasksToFilter =
          this.activeTab === "myTasks" ? this.myTasks : this.allTasks;
      if (!this.searchQuery) return tasksToFilter;
      const query = this.searchQuery.toLowerCase();
      switch (this.selectedFilter) {
        case 'all':
          return tasksToFilter.filter((task) => {
            return (
                String(task.task_id).includes(query) ||
                String(task.assigned_user_id).includes(query) ||
                task.title.toLowerCase().includes(query) ||
                String(task.status_id).toLowerCase().includes(query) ||
                String(task.priority_id).toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query) ||
                task.create_date.includes(query) ||
                task.due_date.includes(query)
            );
          });
        case 'task_id':
          return tasksToFilter.filter((task) => String(task.task_id).includes(query));
        case 'owner':
          return tasksToFilter.filter((task) => {
            const assignedUser = this.users.find(
                (user) => user.user_id === task.assigned_user_id
            );
            if (!assignedUser) return false;
            return (
                assignedUser.first_name.toLowerCase().includes(query) ||
                assignedUser.last_name.toLowerCase().includes(query)
            );
          });
        case 'title':
          return tasksToFilter.filter((task) => task.title.toLowerCase().includes(query));
        case 'status':
          return tasksToFilter.filter((task) => String(task.status_id).includes(query));
        case 'priority':
          return tasksToFilter.filter((task) => String(task.priority_id).includes(query));
        case 'description':
          return tasksToFilter.filter((task) => task.description.toLowerCase().includes(query));
        case 'create_date':
          return tasksToFilter.filter((task) => task.create_date.includes(query));
        case 'due_date':
          return tasksToFilter.filter((task) => task.due_date.includes(query));
        default:
          return tasksToFilter;
      }
    },
  },
  async created() {
    this.userId = parseInt(Cookies.get("assignedUserId"));
    this.allTasks = await getTasks();
    this.myTasks = this.allTasks.filter(
        (task) => task.assigned_user_id === this.userId
    );
    this.users = await getUsers();
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    logout() {
      Cookies.remove("authToken");
      this.$router.push("/signin");
    },
    handleSearch(searchData) {
      this.searchQuery = searchData.query;
      this.selectedFilter = searchData.filter;
    },
    async fetchTasks() {
      this.allTasks = await getTasks();
      this.myTasks = this.allTasks.filter(
          (task) => task.assigned_user_id === this.userId
      );
    },
    exportToCSV() {
      const tasksToExport = this.filteredTasks;
      const csvContent = [
        ["Task ID", "Title", "Assigned User ID", "Status", "Priority", "Description", "Create Date", "Due Date"],
        ...tasksToExport.map(task => [
          task.task_id,
          task.title,
          task.assigned_user_id,
          task.status_id,
          task.priority_id,
          task.description,
          task.create_date,
          task.due_date,
        ]),
      ]
          .map(row => row.join(","))
          .join("\n");
      const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${this.activeTab}-tasks.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
.tasks-page {
  display: flex;
  font-family: "Poppins", sans-serif;
  height: 100vh;
  margin: 0;
}

.sidebar {
  width: 250px;
  background: #f4f6f9;
  height: 100%;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.sidebar-top {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-right: 5%;

}

.sidebar-tab,
.create-button {
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar-tab.active {
  background-color: #007bff;
  color: white;
}

.sidebar-tab:hover {
  background-color: #0056b3;
  color: white;
}

.create-button {
  background-color: #b8b8b8;
  color: white;
  font-weight: bold;
}

.create-button:hover {
  background-color: #3c585e;
}

.sidebar-bottom {
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6e8eb;
  border-top: 1px solid #d1d5db;
  margin-bottom: 20px;
}

.logout-button {
  width: 100%;
  padding: 10px 15px;
  background-color: #ff4d4d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background-color: #cc0000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

}

.tasks-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;
  background-color: #f4f6f9;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-actions {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
}

.export-button {
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-button:hover {
  background-color: #218838;
}
</style>
