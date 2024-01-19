/* eslint-disable */

import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import SignInPage from "../app/page"

// Mock your components
jest.mock("../components", () => ({
  GoogleIcon: jest.fn(() => "MockedGoogleIcon"),
}))

// Mock your functions
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
}))

describe("SignInPage component", () => {
  test("renders sign-in page and triggers sign-in on button click", async () => {
    render(<SignInPage />)

    expect(screen.getByText("Sign in")).toBeInTheDocument()
    expect(screen.getByText(/user-friendly interface/i)).toBeInTheDocument()

    userEvent.click(screen.getByText(/sign in with google/i))

    await waitFor(() => {
      expect(screen.getByText(/Signing in.../i)).toBeInTheDocument()
    })

    expect(screen.getByText(/Signing in.../i)).toBeDisabled()
  })
})
