import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../../Components/Button";

describe("<Button />", () => {
  it('should render the button with the text "Load More"', () => {
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn} />);
    expect.assertions(1);

    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it("should fire the function when clicked", () => {
    const fn = jest.fn();

    render(<Button text="Load More" onClick={fn} />);

    const button = screen.getByRole("button", { name: /load more/i });

    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn} disabled={true} />);

    const button = screen.getByRole("button", { name: /load more/i });

    expect(button).toBeDisabled();
  });

  it("should be enabled when disabled is false", () => {
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn} disabled={false} />);

    const button = screen.getByRole("button", { name: /load more/i });

    expect(button).toBeEnabled();
  });
});
