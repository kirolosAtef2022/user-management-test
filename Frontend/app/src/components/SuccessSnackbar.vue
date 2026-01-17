<script setup>
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
    color="success"
    timeout="3000"
    location="bottom right"
    @update:model-value="emit('update:modelValue', $event)"
  >
    {{ message }}
  </v-snackbar>
</template>
