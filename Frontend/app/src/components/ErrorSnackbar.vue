<script setup>
/**
 * Reusable error snackbar component
 *
 * Responsibilities:
 * - Display error messages
 * - Control visibility via v-model
 *
 * This component is UI-only.
 * It does NOT know where the error comes from.
 */

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <v-snackbar
    :model-value="modelValue"
    color="error"
    timeout="4000"
    location="bottom left"
    @update:model-value="emit('update:modelValue', $event)"
  >
    {{ message }}
  </v-snackbar>
</template>
