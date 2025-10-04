import type { Context } from "hono"
import type { Mock } from "vitest"
import { Hono } from "hono"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { fail, send } from "../context"

describe("Context Utilities", () => {
  let mockContext: Context
  let mockJson: Mock

  beforeEach(() => {
    vi.clearAllMocks()

    mockJson = vi.fn().mockReturnValue("mocked response")
    mockContext = { json: mockJson } as unknown as Context
  })

  describe("send function", () => {
    it("should return a function that calls ctx.json with data and meta", () => {
      // Arrange
      const sendFn = send(mockContext)
      const testData = { id: 1, name: "Test" }
      const testMeta = { count: 5, page: 1 }
      const result = sendFn(testData, testMeta)

      expect(mockJson).toHaveBeenCalledWith({
        data: testData,
        meta: testMeta,
      })
      expect(result).toBe("mocked response")
    })

    it("should work with default empty meta object", () => {
      const sendFn = send(mockContext)
      const testData = { id: 1, name: "Test" }
      const result = sendFn(testData)

      expect(mockJson).toHaveBeenCalledWith({
        data: testData,
        meta: {},
      })
      expect(result).toBe("mocked response")
    })

    it("should work with primitive data types", () => {
      const sendFn = send(mockContext)
      const testData = "simple string"
      const result = sendFn(testData)

      expect(mockJson).toHaveBeenCalledWith({
        data: testData,
        meta: {},
      })
      expect(result).toBe("mocked response")
    })

    it("should work with array data", () => {
      const sendFn = send(mockContext)
      const testData = [1, 2, 3, 4, 5]
      const testMeta = { total: 5 }
      const result = sendFn(testData, testMeta)

      expect(mockJson).toHaveBeenCalledWith({
        data: testData,
        meta: testMeta,
      })
      expect(result).toBe("mocked response")
    })

    it("should work with null and undefined data", () => {
      const sendFn = send(mockContext)
      const result1 = sendFn(null)
      const result2 = sendFn(undefined)

      expect(mockJson).toHaveBeenCalledWith({
        data: null,
        meta: {},
      })
      expect(mockJson).toHaveBeenCalledWith({
        data: undefined,
        meta: {},
      })
      expect(result1).toBe("mocked response")
      expect(result2).toBe("mocked response")
    })

    it("should work with complex nested objects", () => {
      const sendFn = send(mockContext)
      const testData = {
        user: {
          id: 1,
          profile: {
            name: "John Doe",
            settings: { theme: "dark", notifications: true },
          },
        },
        permissions: ["read", "write"],
      }
      const testMeta = { version: "1.0.0", timestamp: 1234567890 }
      const result = sendFn(testData, testMeta)

      expect(mockJson).toHaveBeenCalledWith({
        data: testData,
        meta: testMeta,
      })
      expect(result).toBe("mocked response")
    })
  })

  describe("fail function", () => {
    it("should return a function that calls ctx.json with error response", () => {
      const failFn = fail(mockContext)
      const errorName = "UNAUTHORIZED"
      const result = failFn(errorName)

      // Assert
      expect(mockJson).toHaveBeenCalledWith(
        { success: false, error: { name: errorName, message: "Unauthorized" } },
        401,
      )
      expect(result).toBe("mocked response")
    })

    it("should use custom message when provided", () => {
      const failFn = fail(mockContext)
      const errorName = "NOT_FOUND"
      const customMessage = "User not found in database"
      const result = failFn(errorName, customMessage)

      expect(mockJson).toHaveBeenCalledWith(
        { success: false, error: { name: errorName, message: customMessage } },
        404,
      )
      expect(result).toBe("mocked response")
    })

    it("should handle all error types correctly", () => {
      const failFn = fail(mockContext)
      const errorTypes = [
        {
          name: "SOMETHING_WENT_WRONG",
          code: 500,
          message: "Something went wrong",
        },
        { name: "CONFLICT", code: 409, message: "Conflict" },
        { name: "UNAUTHORIZED", code: 401, message: "Unauthorized" },
        { name: "FORBIDDEN", code: 403, message: "Forbidden" },
        { name: "NOT_FOUND", code: 404, message: "Not found" },
      ] as const

      errorTypes.forEach(({ name, code, message }) => {
        const result = failFn(name, message)

        expect(mockJson).toHaveBeenCalledWith(
          { success: false, error: { name, message } },
          code,
        )
        expect(result).toBe("mocked response")
      })
    })

    it("should work with custom messages for all error types", () => {
      const failFn = fail(mockContext)
      const errorTypes = [
        { name: "SOMETHING_WENT_WRONG", code: 500 },
        { name: "CONFLICT", code: 409 },
        { name: "UNAUTHORIZED", code: 401 },
        { name: "FORBIDDEN", code: 403 },
        { name: "NOT_FOUND", code: 404 },
      ] as const

      errorTypes.forEach(({ name, code }) => {
        const customMessage = `Custom message for ${name}`
        const result = failFn(name, customMessage)

        expect(mockJson).toHaveBeenCalledWith(
          { success: false, error: { name, message: customMessage } },
          code,
        )
        expect(result).toBe("mocked response")
      })
    })

    it("should handle empty custom message", () => {
      const failFn = fail(mockContext)
      const errorName = "UNAUTHORIZED"
      const emptyMessage = ""
      const result = failFn(errorName, emptyMessage)

      expect(mockJson).toHaveBeenCalledWith(
        { success: false, error: { name: errorName, message: emptyMessage } },
        401,
      )
      expect(result).toBe("mocked response")
    })

    it("should handle undefined custom message", () => {
      const failFn = fail(mockContext)
      const errorName = "NOT_FOUND"
      const result = failFn(errorName, undefined)

      expect(mockJson).toHaveBeenCalledWith(
        { success: false, error: { name: errorName, message: "Not found" } },
        404,
      )
      expect(result).toBe("mocked response")
    })
  })

  describe("Integration with Hono Context", () => {
    it("should work with real Hono context in a route", async () => {
      const app = new Hono()

      app.get("/test-send", (c) => {
        const sendFn = send(c)
        return sendFn({ message: "Hello World" }, { timestamp: Date.now() })
      })

      app.get("/test-fail", (c) => {
        const failFn = fail(c)
        return failFn("NOT_FOUND", "Resource not found")
      })

      const sendRes = await app.request("/test-send")
      const failRes = await app.request("/test-fail")
      const sendData: unknown = await sendRes.json()
      const failData: unknown = await failRes.json()

      expect(sendRes.status).toBe(200)
      expect(sendData).toEqual({
        data: { message: "Hello World" },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        meta: { timestamp: expect.any(Number) },
      })

      expect(failRes.status).toBe(404)
      expect(failData).toEqual({
        success: false,
        error: {
          name: "NOT_FOUND",
          message: "Resource not found",
        },
      })
    })

    it("should work with different HTTP status codes", async () => {
      const app = new Hono()

      app.get("/unauthorized", (c) => {
        const failFn = fail(c)
        return failFn("UNAUTHORIZED")
      })

      app.get("/forbidden", (c) => {
        const failFn = fail(c)
        return failFn("FORBIDDEN")
      })

      app.get("/server-error", (c) => {
        const failFn = fail(c)
        return failFn("SOMETHING_WENT_WRONG")
      })

      const unauthorizedRes = await app.request("/unauthorized")
      const forbiddenRes = await app.request("/forbidden")
      const serverErrorRes = await app.request("/server-error")

      expect(unauthorizedRes.status).toBe(401)
      expect(forbiddenRes.status).toBe(403)
      expect(serverErrorRes.status).toBe(500)
    })
  })
})
