export function validateEmail(value) {
  if (!value.trim()) return 'Email address is required.'
  if (!/^\S+@\S+\.\S+$/.test(value)) return 'Enter a valid email address.'
  return ''
}
