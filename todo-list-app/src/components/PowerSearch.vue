<template>
  <div class="powersearch-container">
    <span class="filter-label">Filter by:</span>
    <select v-model="selectedFilter" class="filter-selector" @change="handleFilterChange">
      <option value="all">All</option>
      <option value="task_id">Task ID</option>
      <option value="owner">Owner</option>
      <option value="title">Title</option>
      <option value="status">Status</option>
      <option value="priority">Priority</option>
      <option value="description">Description</option>
      <option value="create_date">Create Date</option>
      <option value="due_date">Due Date</option>
    </select>
    <input
        v-model="searchQuery"
        type="text"
        placeholder="Search tasks..."
        @input="handleSearch"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedFilter: 'all',
    };
  },
  methods: {
    handleSearch() {
      // Emit the search query and filter to the parent component
      this.$emit('search', {
        query: this.searchQuery,
        filter: this.selectedFilter,
      });
    },
    handleFilterChange() {
      // Perform search when filter changes
      this.handleSearch();
    },
  },
};
</script>

<style scoped>
.powersearch-container {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  justify-content: center;
}

input[type="text"] {
  width: 40%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.filter-selector {
  margin-left: 10px;
  margin-right: 10px;
}

select {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>