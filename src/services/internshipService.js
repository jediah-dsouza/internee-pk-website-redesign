import { internships } from '../data/content'

/**
 * Local async source for the homepage. Replace this function with a fetch call
 * when a real internships API contract exists; the UI already handles all states.
 */
export function loadInternships({ delay = 450, data = internships, shouldFail = false } = {}) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) reject(new Error('Internships could not be loaded.'))
      else resolve(data)
    }, delay)
  })
}
