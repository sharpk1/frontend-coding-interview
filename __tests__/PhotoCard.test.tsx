import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { PhotoCard } from "@/components/PhotoCard";
import { LikesProvider } from "@/contexts/LikesContext";
import type { PexelsPhoto } from "@/types/pexels";

const mockPhoto: PexelsPhoto = {
  id: 123,
  width: 4000,
  height: 3000,
  url: "https://www.pexels.com/photo/123",
  photographer: "Jane Doe",
  photographer_url: "https://www.pexels.com/@janedoe",
  photographer_id: 456,
  avg_color: "#374824",
  src: {
    original: "https://images.pexels.com/photos/123/original.jpg",
    large2x: "https://images.pexels.com/photos/123/large2x.jpg",
    large: "https://images.pexels.com/photos/123/large.jpg",
    medium: "https://images.pexels.com/photos/123/medium.jpg",
    small: "https://images.pexels.com/photos/123/small.jpg",
    portrait: "https://images.pexels.com/photos/123/portrait.jpg",
    landscape: "https://images.pexels.com/photos/123/landscape.jpg",
    tiny: "https://images.pexels.com/photos/123/tiny.jpg",
  },
  liked: false,
  alt: "Gold Hour Raindrops",
};

function renderWithProvider(ui: React.ReactElement) {
  return render(<LikesProvider>{ui}</LikesProvider>);
}

describe("PhotoCard", () => {
  it("renders photographer name", () => {
    renderWithProvider(<PhotoCard photo={mockPhoto} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders photo alt text", () => {
    renderWithProvider(<PhotoCard photo={mockPhoto} />);
    expect(screen.getByText("Gold Hour Raindrops")).toBeInTheDocument();
  });

  it("renders average color hex code", () => {
    renderWithProvider(<PhotoCard photo={mockPhoto} />);
    expect(screen.getByText("#374824")).toBeInTheDocument();
  });

  it("renders portfolio link", () => {
    renderWithProvider(<PhotoCard photo={mockPhoto} />);
    const link = screen.getByText("Portfolio");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute(
      "href",
      "https://www.pexels.com/@janedoe",
    );
  });

  it("toggles like on click", async () => {
    const user = userEvent.setup();
    renderWithProvider(<PhotoCard photo={mockPhoto} />);

    const likeButton = screen.getByLabelText("Like photo");
    expect(likeButton).toBeInTheDocument();

    await user.click(likeButton);
    expect(screen.getByLabelText("Unlike photo")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Unlike photo"));
    expect(screen.getByLabelText("Like photo")).toBeInTheDocument();
  });

  it("renders the photo thumbnail", () => {
    renderWithProvider(<PhotoCard photo={mockPhoto} />);
    const img = screen.getByAltText("Gold Hour Raindrops");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockPhoto.src.medium);
  });
});
