import { Checkbox } from "react-bootstrap";

const CheckboxFacet = ({ filter }) => {
  console.log(filter);
  return (
    <li>
      <div>{filter.name}</div>
      <ul>
        {
          filter.children.map((childFitler) => {
            return (
            <Checkbox>
              <li key={childFitler.id}>
                {childFitler.name}
              </li>
            </Checkbox>
            );
          })
        }
      </ul>
    </li>
  );
};

export default CheckboxFacet;