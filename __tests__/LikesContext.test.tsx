import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { LikesProvider, useLikes } from "@/contexts/LikesContext";

function TestComponent() {
  const { isLiked, toggleLike } = useLikes();
  return (
    <div>
      <p data-testid="liked-1">{isLiked(1) ? "liked" : "not-liked"}</p>
      <p data-testid="liked-2">{isLiked(2) ? "liked" : "not-liked"}</p>
      <button onClick={() => toggleLike(1)}>Toggle 1</button>
      <button onClick={() => toggleLike(2)}>Toggle 2</button>
    </div>
  );
}

describe("LikesContext", () => {
  it("starts with no liked photos", () => {
    render(
      <LikesProvider>
        <TestComponent />
      </LikesProvider>,
    );
    expect(screen.getByTestId("liked-1")).toHaveTextContent("not-liked");
    expect(screen.getByTestId("liked-2")).toHaveTextContent("not-liked");
  });

  it("toggles a like on", async () => {
    const user = userEvent.setup();
    render(
      <LikesProvider>
        <TestComponent />
      </LikesProvider>,
    );

    await user.click(screen.getByText("Toggle 1"));
    expect(screen.getByTestId("liked-1")).toHaveTextContent("liked");
    expect(screen.getByTestId("liked-2")).toHaveTextContent("not-liked");
  });

  it("toggles a like off", async () => {
    const user = userEvent.setup();
    render(
      <LikesProvider>
        <TestComponent />
      </LikesProvider>,
    );

    await user.click(screen.getByText("Toggle 1"));
    expect(screen.getByTestId("liked-1")).toHaveTextContent("liked");

    await user.click(screen.getByText("Toggle 1"));
    expect(screen.getByTestId("liked-1")).toHaveTextContent("not-liked");
  });

  it("supports multiple likes independently", async () => {
    const user = userEvent.setup();
    render(
      <LikesProvider>
        <TestComponent />
      </LikesProvider>,
    );

    await user.click(screen.getByText("Toggle 1"));
    await user.click(screen.getByText("Toggle 2"));

    expect(screen.getByTestId("liked-1")).toHaveTextContent("liked");
    expect(screen.getByTestId("liked-2")).toHaveTextContent("liked");
  });
});
