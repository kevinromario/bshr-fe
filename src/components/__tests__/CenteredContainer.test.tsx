import { render, screen } from "@testing-library/react";
import { CenteredContainer } from "../CenteredContainer";

describe("CenteredContainer", () => {
  it("should render children inside the container", () => {
    render(
      <CenteredContainer>
        <p>Content</p>
      </CenteredContainer>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should use default maxWidth xs when not provided", () => {
    const { container } = render(
      <CenteredContainer>
        <div>Default Width</div>
      </CenteredContainer>
    );

    const muiContainer = container.querySelector(".MuiContainer-root");
    expect(muiContainer).toHaveClass("MuiContainer-maxWidthXs");
  });

  it("should apply given maxWidth when provided", () => {
    const { container } = render(
      <CenteredContainer maxWidth="md">
        <div>Custom Width</div>
      </CenteredContainer>
    );

    const muiContainer = container.querySelector(".MuiContainer-root");
    expect(muiContainer).toHaveClass("MuiContainer-maxWidthMd");
  });

  it("should apply isCentered = false styles correctly", () => {
    const { container } = render(
      <CenteredContainer isCentered={false}>
        <div>Not Centered</div>
      </CenteredContainer>
    );

    const box = container.querySelector("div");
    const containerEl = container.querySelector(".MuiContainer-root");

    expect(containerEl).toHaveStyle("margin-top: 10px");

    expect(box).not.toHaveStyle("align-content: center");
  });
});
