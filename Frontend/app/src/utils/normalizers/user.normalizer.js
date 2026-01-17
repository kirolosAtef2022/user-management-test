/* ============================================================
 * USER INPUT NORMALIZATION
 * ============================================================
 * Purpose:
 * - Normalize user-entered data before sending to backend
 * - Keep UI state untouched
 * - Guarantee clean DTO payloads
 * ============================================================ */

/**
 * Capitalize first letter after trimming.
 */
export function capitalizeFirstLetter(value) {
  if (!value) return value;

  const trimmed = value.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/**
 * Normalize Create / Update User form data.
 * IMPORTANT:
 * - Does NOT mutate the original object
 * - Returns a new DTO-ready object
 */
export function normalizeUserForm(form) {
  return {
    firstName: capitalizeFirstLetter(form.firstName),
    lastName: capitalizeFirstLetter(form.lastName),
    email: form.email.trim(),
    ip: form.ip.trim(),
    location: form.location,
    active: form.active,
  };
}
