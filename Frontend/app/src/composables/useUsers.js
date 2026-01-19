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
    try {
      const { data } = await getUsers();
      users.value = [...data]; // keep reactivity
    } finally {
      loading.value = false;
    }
  }

  // ===== BLOCK / UNBLOCK =====
  async function toggleStatusBlock(user) {
    const prev = user.active;
    user.active = false;

    try {
      await toggleUserBlock(user._id);
    } catch (err) {
      user.active = prev; // rollback
      throw err; // let component decide what to do
    }
  }

  async function toggleStatusUnblock(user) {
    const prev = user.active;
    user.active = true;

    try {
      await toggleUserUnblock(user._id);
    } catch (err) {
      user.active = prev;
      throw err;
    }
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

  async function onSaved() {
    dialogOpen.value = false;
    await loadUsers();
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
