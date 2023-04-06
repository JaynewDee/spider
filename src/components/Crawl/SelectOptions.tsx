const SelectOptions = () =>
  ["Reddit", "Hackers", "Dev"].map((opt) => (
    <option key={opt} value={opt.toLowerCase()}>
      {opt}
    </option>
  ));

export default SelectOptions;
