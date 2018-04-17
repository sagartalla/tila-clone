import { Checkbox } from "react-bootstrap";

const CheckboxFacet = ({ filter }) => {
  return (
    <li>
      <div>{filter.name}</div>
      <ul>
        {
          filter.children.map((childFitler) => {
            return (
              <Checkbox key={childFitler.id}>
                <li>
                  {childFitler.name}&nbsp;({childFitler.count})
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