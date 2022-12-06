import categories from "./categories";

const SelectCategory = (props: any) => {
  const optionElements = categories.map((category) => (
    <option key={category.value} value={category.value}>
      {category.name}
    </option>
  ));

  return (
    <select
      name="category"
      id="category"
      value={props.category}
      onChange={props.handleChange}
      className="w-48 h-8 sm:w-auto sm:h-10 pl-2 mb-3 shadow-[0_0px_5px_0px_rgba(0,0,0,0.5)]"
    >
      {optionElements}
    </select>
  );
};

export default SelectCategory;
