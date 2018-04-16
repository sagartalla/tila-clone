const LinkFacet = ({ filter }) => {
  console.log(filter);
  return (
    <li>
      <div>{filter.name}</div>
      <ul>
        {
          filter.children.map((category) => {
            return (<li key={category.id}>
              <a>{category.name}</a>
              <ul>
                {
                  category.children.map((subcategory) => {
                    return (
                      <li key={subcategory.id}>
                        <a>{subcategory.name}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </li>);
          })
        }
      </ul>
    </li>
  );
};

export default LinkFacet;