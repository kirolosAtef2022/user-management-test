<script setup>
import { useRouter } from "vue-router";

import { ref, computed, onMounted } from "vue";
import { useUsers } from "@/composables/useUsers";

import UserHeader from "@/components/UserHeader.vue";
import UserTable from "@/components/UserTable.vue";
import UserFormDialog from "@/components/UserFormDialog.vue";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";

/* ============================================================
 * COMPOSABLE (data + business logic)
 * ============================================================ */
// Redirect to /users
const router = useRouter();
router.replace("/users");
const {
  users,
  loading,
  dialogOpen,
  selectedUser,
  loadUsers,
  toggleStatusBlock,
  toggleStatusUnblock,
  openCreate,
  openEdit,
  onSaved,
} = useUsers();

/* ============================================================
 * SEARCH STATE (UI-only)
 * ============================================================ */
const search = ref("");

/**
 * Normalize text for case-insensitive search
 */
function normalize(value) {
  return value?.toString().trim().toLowerCase() || "";
}

/**
 * Computed users list based on search input
 */
const filteredUsers = computed(() => {
  if (!search.value) return users.value;

  const q = normalize(search.value);

  return users.value.filter((user) =>
    [
      user.firstName,
      user.lastName,
      `${user.firstName} ${user.lastName}`,
      user.email,
      user.location,
      user.ip,
      user.active ? "active" : "blocked",
    ].some((field) => normalize(field).includes(q))
  );
});

// snackbar state (local)
// handles error display for block/unblock and load users
const showError = ref(false);
const errorMessage = ref("");

function showErrorToast(msg) {
  errorMessage.value = msg;
  showError.value = true;
}

async function onBlock(user) {
  try {
    await toggleStatusBlock(user);
  } catch (err) {
    showErrorToast(err.message || "Failed to block user");
  }
}

async function onUnblock(user) {
  try {
    await toggleStatusUnblock(user);
  } catch (err) {
    showErrorToast(err.message || "Failed to unblock user");
  }
}
//////////////////////////////////////////////////////////////////
/* ============================================================
 * LIFECYCLE
 * ============================================================ */
onMounted(async () => {
  try {
    await loadUsers();
  } catch (err) {
    showErrorToast(err.message || "Failed to load users");
  }
});
</script>

<template>
  <v-container fluid>
    <v-card>
      <!-- Header: create + search -->
      <UserHeader @create="openCreate" @search="search = $event" />

      <!-- Table -->
      <UserTable
        :users="filteredUsers"
        :loading="loading"
        @block="onBlock"
        @unblock="onUnblock"
        @edit="openEdit"
      />
    </v-card>

    <!-- Create / Edit dialog -->
    <UserFormDialog
      v-model="dialogOpen"
      :user="selectedUser"
      @saved="onSaved"
    />
  </v-container>
  <ErrorSnackbar v-model="showError" :message="errorMessage" />
</template>
