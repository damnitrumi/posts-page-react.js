import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInput } from ".";

describe("TextInput", () => {
  it("should render TextInput and have a Search Value", () => {
    const fn = jest.fn();
    render(<TextInput onChange={fn} searchValue={"testando"} />);

    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input.value).toBe("testando");
  });

  it("should call handleIChange function on each key press ", () => {
    const fn = jest.fn();
    render(<TextInput onChange={fn} searchValue="um valor qualquer" />);

    const input = screen.getByPlaceholderText(/type your search/i);

    const value = "o valor";

    userEvent.type(input, value);

    expect(input.value).toBe("um valor qualquer");
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(<TextInput onChange={fn} searchValue="" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
