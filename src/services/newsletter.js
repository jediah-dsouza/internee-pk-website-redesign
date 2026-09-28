/**
 * Integration boundary for the newsletter endpoint.
 * Replace the local delay with a real POST when the backend contract exists.
 */
export function subscribeToNewsletter(email) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve({ ok: true, email }), 700)
  })
}
