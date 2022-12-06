import difficulties from "./difficulties";
import { ChangeEvent } from "react";

interface SelectCategoryProps {
  difficulty: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = (props) => {
  const optionElements = difficulties.map((difficulty) => (
    <option key={difficulty} value={difficulty}>
      {difficulty}
    </option>
  ));

  return (
    <select
      name="difficulty"
      id="difficulty"
      value={props.difficulty}
      onChange={props.handleChange}
      className="h-10 pl-2 shadow-[0_0px_5px_0px_rgba(0,0,0,0.5)]"
    >
      {optionElements}
    </select>
  );
};

export default SelectCategory;
