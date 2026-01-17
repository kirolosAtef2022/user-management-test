/**
 * Frontend validation rules for User forms
 *
 * Notes:
 * - UX-level validation only
 * - NOT a security boundary
 * - Backend DTO validation is authoritative
 */

export const userRules = {
  required: (v) => !!v || "This field is required",

  min2: (v) => (v && v.trim().length >= 2) || "Minimum 2 characters",

  // alphaSpaces: (v) =>
  //   /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(v.trim()) ||
  //   "Only letters and spaces are allowed",
  alphaOnly: (v) =>
    /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(v.trim()) || "Only letters are allowed",

  email: (v) => /.+@.+\..+/.test(v) || "Invalid email address",

  ip: (v) =>
    /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(
      v
    ) || "Enter a valid IPv4 address (e.g. 192.168.1.1) (0-255) each.",
};
