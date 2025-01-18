import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import Page from "@/app/frontend-test-example/page"

test("Page", () => {
  render(<Page />)
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined()
})
