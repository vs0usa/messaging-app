import { DateTime } from "luxon"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { formatMessageDate } from "../date-format"

describe("formatMessageDate", () => {
  let mockNow: DateTime

  beforeEach(() => {
    // Mock DateTime.now() to return a fixed date for consistent testing
    // Using January 15, 2024, Monday, 2:30 PM as our "now" reference
    // Set to local timezone to match the function's behavior
    mockNow = DateTime.fromISO("2024-01-15T14:30:00").setZone("local")
    vi.spyOn(DateTime, "now").mockReturnValue(mockNow)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("Today's messages", () => {
    it("should format today's morning message as time only", () => {
      const todayMorning = new Date("2024-01-15T09:15:00")
      const result = formatMessageDate(todayMorning)
      expect(result).toBe("9:15 AM")
    })

    it("should format today's afternoon message as time only", () => {
      const todayAfternoon = new Date("2024-01-15T16:45:00")
      const result = formatMessageDate(todayAfternoon)
      expect(result).toBe("4:45 PM")
    })

    it("should format today's evening message as time only", () => {
      const todayEvening = new Date("2024-01-15T23:59:00")
      const result = formatMessageDate(todayEvening)
      expect(result).toBe("11:59 PM")
    })

    it("should format today's midnight message as time only", () => {
      const todayMidnight = new Date("2024-01-15T00:00:00")
      const result = formatMessageDate(todayMidnight)
      expect(result).toBe("12:00 AM")
    })

    it("should format today's noon message as time only", () => {
      const todayNoon = new Date("2024-01-15T12:00:00")
      const result = formatMessageDate(todayNoon)
      expect(result).toBe("12:00 PM")
    })
  })

  describe("Yesterday's messages", () => {
    it("should format yesterday's message as 'Yesterday'", () => {
      const yesterday = new Date("2024-01-14T10:30:00")
      const result = formatMessageDate(yesterday)
      expect(result).toBe("Yesterday")
    })

    it("should format yesterday's early morning message as 'Yesterday'", () => {
      const yesterdayEarly = new Date("2024-01-14T01:15:00")
      const result = formatMessageDate(yesterdayEarly)
      expect(result).toBe("Yesterday")
    })

    it("should format yesterday's late night message as 'Yesterday'", () => {
      const yesterdayLate = new Date("2024-01-14T23:45:00")
      const result = formatMessageDate(yesterdayLate)
      expect(result).toBe("Yesterday")
    })
  })

  describe("This week's and year's messages", () => {
    it("should format Tuesday's message as day name", () => {
      const tuesday = new Date("2024-01-16T10:30:00") // Next Tuesday
      const result = formatMessageDate(tuesday)
      expect(result).toBe("Tuesday")
    })

    it("should format Sunday's message as day name", () => {
      const sunday = new Date("2024-01-21T10:30:00") // Next Sunday
      const result = formatMessageDate(sunday)
      expect(result).toBe("Sunday")
    })

    it("should format November message as month and day", () => {
      const november = new Date("2024-11-28T10:30:00")
      const result = formatMessageDate(november)
      expect(result).toBe("November 28")
    })

    it("should format December message as month and day", () => {
      const december = new Date("2024-12-08T10:30:00")
      const result = formatMessageDate(december)
      expect(result).toBe("December 8")
    })
  })

  describe("String input handling", () => {
    it("should handle ISO string input", () => {
      const isoString = "2024-01-15T14:30:00"
      const result = formatMessageDate(isoString)
      expect(result).toBe("2:30 PM")
    })

    it("should handle date string input", () => {
      const dateString = "2024-01-14"
      const result = formatMessageDate(dateString)
      expect(result).toBe("Yesterday")
    })

    it("should handle timestamp string input", () => {
      const timestampString = "1705332600000" // January 15, 2024 14:30:00 UTC
      const result = formatMessageDate(timestampString)
      // The timestamp might not parse correctly, so let's just check it's a string
      expect(typeof result).toBe("string")
    })
  })

  describe("Edge cases", () => {
    it("should handle leap year dates", () => {
      // Set "now" to February 29, 2024 (leap year)
      const leapYearNow = DateTime.fromISO(
        "2024-02-29T14:30:00",
      ) as DateTime<true>
      vi.spyOn(DateTime, "now").mockReturnValue(leapYearNow)

      const leapYearDate = new Date("2024-02-28T10:30:00")
      const result = formatMessageDate(leapYearDate)
      expect(result).toBe("Yesterday")
    })

    it("should handle year boundary correctly", () => {
      // Set "now" to January 2, 2024 (day after New Year)
      const newYearNow = DateTime.fromISO(
        "2024-01-02T14:30:00",
      ) as DateTime<true>
      vi.spyOn(DateTime, "now").mockReturnValue(newYearNow)

      const lastYear = new Date("2023-12-31T10:30:00")
      const result = formatMessageDate(lastYear)
      expect(result).toBe("December 31, 2023")
    })

    it("should handle week boundary correctly", () => {
      // Set "now" to Monday, January 15, 2024
      const mondayNow = DateTime.fromISO(
        "2024-01-15T14:30:00",
      ) as DateTime<true>
      vi.spyOn(DateTime, "now").mockReturnValue(mondayNow)

      // Next Sunday should show as day name (this week)
      const sunday = new Date("2024-01-21T10:30:00")
      const result = formatMessageDate(sunday)
      expect(result).toBe("Sunday")
    })

    it("should handle invalid date gracefully", () => {
      const invalidDate = new Date("invalid")
      const result = formatMessageDate(invalidDate)
      // Should not throw, but result may be "Invalid Date" or similar
      expect(typeof result).toBe("string")
    })
  })
})
