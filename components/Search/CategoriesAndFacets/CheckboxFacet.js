const CheckboxFacet = ({ filter }) => {
  console.log(filter);
  return (
    <li>
      <div>{filter.name}</div>
      <ul>
        {
          filter.children.map((childFitler) => {
            return (<li key={childFitler.id}>
              {childFitler.name}
            </li>);
          })
        }
      </ul>
    </li>
  );
};

export default CheckboxFacet;