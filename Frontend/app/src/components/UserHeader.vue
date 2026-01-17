<script setup>
import { ref, watch } from "vue";
const emit = defineEmits(["create", "search"]);
const search = ref("");
watch(search, (val) => {
  emit("search", val);
});
</script>

<template>
  <v-card-title class="d-flex justify-space-between align-center gap-4">
    <span class="text-h6">Users</span>
    <v-text-field
      v-model="search"
      label="search users"
      density="compact"
      hide-details
      clearable
      style="max-width: 250px"
    />

    <v-btn color="primary" @click="$emit('create')"> + Create User </v-btn>
  </v-card-title>
</template>
