import { DateTime } from "luxon"

/**
 * Formats a date for message timestamps with more detailed logic:
 * - If today: shows time (e.g., "2:30 PM")
 * - If yesterday: shows "Yesterday"
 * - If this week: shows day name (e.g., "Monday")
 * - If this year: shows month and day (e.g., "July 31")
 * - If different year: shows month, day, and year (e.g., "July 31, 2023")
 */
export function formatMessageDate(date: Date | string): string {
  const luxonDate = DateTime.fromJSDate(new Date(date))
  const now = DateTime.now()

  // Check if it's today
  if (luxonDate.hasSame(now, "day")) {
    return luxonDate.toFormat("h:mm a") // e.g., "2:30 PM"
  }

  // Check if it's yesterday
  const yesterday = now.minus({ days: 1 })
  if (luxonDate.hasSame(yesterday, "day")) {
    return "Yesterday"
  }

  // Check if it's this week
  if (luxonDate.hasSame(now, "week")) {
    return luxonDate.toFormat("cccc") // e.g., "Monday"
  }

  // Check if it's the same year
  if (luxonDate.hasSame(now, "year")) {
    return luxonDate.toFormat("MMMM d") // e.g., "July 31"
  }

  // Different year
  return luxonDate.toFormat("MMMM d, yyyy") // e.g., "July 31, 2023"
}
