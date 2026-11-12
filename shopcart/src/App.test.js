import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { prepareFacebookLogin, signInWithFacebook } from "./facebookLogin";

jest.mock("./facebookLogin", () => ({
  prepareFacebookLogin: jest.fn(),
  signInWithFacebook: jest.fn()
}));

beforeEach(() => {
  window.history.replaceState({}, "", "/");
  jest.clearAllMocks();
  prepareFacebookLogin.mockResolvedValue({});
});

function openCheckout() {
  fireEvent.click(screen.getByRole("button", { name: "Increase Unisex Cologne quantity" }));
  fireEvent.click(screen.getByRole("link", { name: /1 items/ }));
  fireEvent.click(screen.getByRole("link", { name: "Check Out" }));
}

test("an empty cart shows its dynamic quantity, Continue Shop, and no checkout", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("link", { name: /0 items/ }));
  expect(screen.getByText("There are 0 items in your cart.")).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "Check Out" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("link", { name: "Continue Shop" }));
  expect(screen.getByRole("button", { name: "Increase Unisex Cologne quantity" })).toBeInTheDocument();
});

test("checkout opens Sign In and retains the cart after the classroom form", () => {
  render(<App />);
  openCheckout();
  expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Declan" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "student@example.com" } });
  fireEvent.click(screen.getByRole("button", { name: "Login", exact: true }));
  expect(screen.getByRole("heading", { name: "Check Out" })).toBeInTheDocument();
  expect(screen.getByText("Welcome Back Declan!")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link", { name: "Back to Cart" }));
  expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
});

test("Facebook success changes Sign In to Check Out", async () => {
  signInWithFacebook.mockResolvedValue({ name: "OAuth Student", provider: "Facebook" });
  render(<App />);
  openCheckout();
  await waitFor(() => expect(screen.getByRole("button", { name: "Login with Facebook" })).toBeEnabled());
  fireEvent.click(screen.getByRole("button", { name: "Login with Facebook" }));
  expect(await screen.findByText("Welcome Back OAuth Student!")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Check Out" })).toBeInTheDocument();
});

test("Facebook cancellation stays on Sign In and permits retry", async () => {
  signInWithFacebook.mockRejectedValue(new Error("Sign-in cancelled."));
  render(<App />);
  openCheckout();
  await waitFor(() => expect(screen.getByRole("button", { name: "Login with Facebook" })).toBeEnabled());
  fireEvent.click(screen.getByRole("button", { name: "Login with Facebook" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Sign-in cancelled.");
  expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Login with Facebook" })).toBeEnabled();
});

test("a direct checkout URL with an empty cart returns to the cart", () => {
  window.history.replaceState({}, "", "/checkout");
  render(<App />);
  expect(screen.getByText("There are 0 items in your cart.")).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Sign In" })).not.toBeInTheDocument();
});
