import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function TestComponent() {
  const { isAuthenticated, username, signIn, signOut } = useAuth();
  return (
    <div>
      <p data-testid="auth-status">
        {isAuthenticated ? "authenticated" : "not-authenticated"}
      </p>
      <p data-testid="username">{username ?? "none"}</p>
      <button onClick={() => signIn("testuser", "password123")}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts as not authenticated", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "not-authenticated",
    );
    expect(screen.getByTestId("username")).toHaveTextContent("none");
  });

  it("signs in a user", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await user.click(screen.getByText("Sign In"));

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "authenticated",
    );
    expect(screen.getByTestId("username")).toHaveTextContent("testuser");
  });

  it("signs out a user", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await user.click(screen.getByText("Sign In"));
    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "authenticated",
    );

    await user.click(screen.getByText("Sign Out"));
    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "not-authenticated",
    );
    expect(screen.getByTestId("username")).toHaveTextContent("none");
  });

  it("rejects empty username", () => {
    let result: boolean | undefined;
    function TestSignIn() {
      const { signIn } = useAuth();
      return (
        <button
          onClick={() => {
            result = signIn("", "password");
          }}
        >
          Try Sign In
        </button>
      );
    }

    render(
      <AuthProvider>
        <TestSignIn />
      </AuthProvider>,
    );

    act(() => {
      screen.getByText("Try Sign In").click();
    });

    expect(result).toBe(false);
  });
});
