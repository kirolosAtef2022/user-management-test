import { ref } from "vue";
import {
  getUsers,
  toggleUserBlock,
  toggleUserUnblock,
} from "@/services/users.api";

/**
 * useUsers composable
 * -------------------
 * Holds state + business logic related to users
 * No template, no Vuetify, no direct UI code
 */
export function useUsers() {
  // ===== STATE =====
  const users = ref([]);
  const loading = ref(false);

  const dialogOpen = ref(false);
  const selectedUser = ref(null);

  // ===== LOAD USERS =====
  async function loadUsers() {
    loading.value = true;
    const { data } = await getUsers();
    users.value = [...data]; // keep reactivity
    loading.value = false;
  }

  // ===== BLOCK / UNBLOCK =====
  async function toggleStatusBlock(user) {
    // optimistic UI update
    user.active = false;
    await toggleUserBlock(user._id);
  }

  async function toggleStatusUnblock(user) {
    // optimistic UI update
    user.active = true;
    await toggleUserUnblock(user._id);
  }

  // ===== CREATE / EDIT =====
  function openCreate() {
    selectedUser.value = null;
    dialogOpen.value = true;
  }

  function openEdit(user) {
    selectedUser.value = user;
    dialogOpen.value = true;
  }

  function onSaved() {
    dialogOpen.value = false;
    loadUsers();
  }

  return {
    // state
    users,
    loading,
    dialogOpen,
    selectedUser,

    // actions
    loadUsers,
    toggleStatusBlock,
    toggleStatusUnblock,
    openCreate,
    openEdit,
    onSaved,
  };
}
