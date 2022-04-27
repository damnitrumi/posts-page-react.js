import "./styles.css";

import P from "prop-types";

export const TextInput = ({ searchValue, onChange }) => {
  return (
    <input
      type="search"
      className="text-input"
      placeholder="Type your search"
      onChange={onChange}
      value={searchValue}
    />
  );
};

TextInput.propTypes = {
  onChange: P.func.isRequired,
  searchValue: P.string.isRequired,
};
