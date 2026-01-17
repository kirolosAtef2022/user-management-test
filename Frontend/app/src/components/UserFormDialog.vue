<script setup>
import { ref, computed, watch } from "vue";
import { createUser, updateUser } from "@/services/users.api";
import { userRules as rules } from "@/validation/user.rules";
import { normalizeUserForm } from "@/utils/normalizers/user.normalizer";
import { LOCATIONS } from "@/constants/locations";

import ErrorSnackbar from "@/components/ErrorSnackbar.vue";
import SuccessSnackbar from "@/components/SuccessSnackbar.vue";

/* ============================================================
 * PROPS & EMITS
 * ============================================================ */
const props = defineProps({
  modelValue: Boolean,
  user: Object,
});

const emit = defineEmits(["update:modelValue", "saved"]);

/* ============================================================
 * DIALOG STATE (v-model proxy)
 * ============================================================ */
const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const isEdit = computed(() => Boolean(props.user));
const loading = ref(false);
const isFormValid = ref(false);

/* ============================================================
 * FEEDBACK STATE (snackbars)
 * ============================================================ */
const errorMessage = ref("");
const showError = ref(false);

const successMessage = ref("");
const showSuccess = ref(false);

/* ============================================================
 * FORM STATE
 * ============================================================ */
const emptyForm = () => ({
  firstName: "",
  lastName: "",
  email: "",
  ip: "",
  location: null,
  active: true,
});

const form = ref(emptyForm());

/**
 * Sync form when editing / creating
 */
watch(
  () => props.user,
  (user) => {
    form.value = user ? { ...user } : emptyForm();
  },
  { immediate: true }
);

/* ============================================================
 * HELPERS
 * ============================================================ */
function showSuccessToast(message) {
  successMessage.value = message;
  showSuccess.value = true;
}

function showErrorToast(message) {
  errorMessage.value = message;
  showError.value = true;
}

/* ============================================================
 * SUBMIT HANDLER
 * ============================================================ */
async function submit() {
  loading.value = true;

  try {
    const payload = normalizeUserForm(form.value);

    if (isEdit.value) {
      await updateUser(form.value._id, payload);
      showSuccessToast("User updated successfully");
    } else {
      await createUser(payload);
      showSuccessToast("User created successfully");
    }

    emit("saved");
    form.value = emptyForm();
    dialog.value = false;
  } catch (err) {
    showErrorToast(err.message || "Something went wrong");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>
        {{ isEdit ? "Edit User" : "Create User" }}
      </v-card-title>

      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field
            v-model="form.firstName"
            label="First Name"
            :rules="[rules.required, rules.min2, rules.alphaOnly]"
            hint="First Name must be one word"
            persistent-hint
            autocomplete="off"
            required
            class="mb-3"
          />

          <v-text-field
            v-model="form.lastName"
            label="Last Name"
            :rules="[rules.required, rules.min2, rules.alphaOnly]"
            hint="Last Name must be one word"
            persistent-hint
            autocomplete="off"
            required
            class="mb-3"
          />

          <v-text-field
            v-model="form.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            autocomplete="off"
            required
          />

          <v-text-field
            v-model="form.ip"
            label="IP Address (IPv4)"
            inputmode="decimal"
            :rules="[rules.required, rules.ip]"
            hint="e.g. 192.168.1.1 (0–255)"
            persistent-hint
            autocomplete="off"
            required
            class="mb-5"
          />

          <v-select
            v-model="form.location"
            :items="LOCATIONS"
            label="Location"
            :rules="[rules.required]"
            placeholder="Select location"
            persistent-placeholder
            variant="outlined"
            density="compact"
            color="primary"
            :menu-props="{ maxHeight: 250 }"
          />

          <v-switch
            v-if="!isEdit"
            v-model="form.active"
            label="Active"
            color="success"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">Cancel</v-btn>

        <v-btn
          color="primary"
          :loading="loading"
          :disabled="!isFormValid"
          @click="submit"
        >
          {{ isEdit ? "Update" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <ErrorSnackbar v-model="showError" :message="errorMessage" />
  <SuccessSnackbar v-model="showSuccess" :message="successMessage" />
</template>
