<script setup>
defineProps({
  users: Array,
  loading: Boolean,
});

defineEmits(["block", "unblock", "edit"]);

const headers = [
  { title: "#", key: "index" },
  { title: "First Name", key: "firstName" },
  { title: "Last Name", key: "lastName" },
  { title: "Email", key: "email" },
  { title: "IPv4", key: "ip" },
  { title: "Location", key: "location" },
  { title: "Status", key: "active" },
  { title: "Last Login", key: "lastLogin" },
  { title: "Actions", key: "actions", sortable: false },
];

function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("sv-SE").replace("T", " ");
}
</script>

<template>
  <v-data-table
    class="text-caption"
    :headers="headers"
    :items="users"
    :loading="loading"
    item-key="_id"
  >
    <!-- Index -->
    <template #item.index="{ index }">
      {{ index + 1 }}
    </template>

    <!-- Status -->
    <template #item.active="{ item }">
      <v-chip size="x-small" :color="item.active ? 'success' : 'error'">
        {{ item.active ? "Active" : "Blocked" }}
      </v-chip>
    </template>

    <!-- Last Login -->
    <template #item.lastLogin="{ item }">
      {{ formatDateTime(item.lastLogin) }}
    </template>

    <!-- Actions -->
    <template #item.actions="{ item }">
      <v-btn
        size="x-small"
        color="primary"
        v-show="item.active"
        v-if="item.active === true"
        class="mr-1"
        min-width="50"
        @click="$emit('edit', item)"
      >
        Edit
      </v-btn>
      <v-btn
        size="x-small"
        min-width="50"
        color="error"
        @click="$emit('block', item)"
        v-if="item.active === true"
      >
        Block
      </v-btn>

      <v-btn
        size="x-small"
        color="success"
        min-width="106"
        @click="$emit('unblock', item)"
        v-if="item.active === false"
      >
        Unblock
      </v-btn>
    </template>
  </v-data-table>
</template>
