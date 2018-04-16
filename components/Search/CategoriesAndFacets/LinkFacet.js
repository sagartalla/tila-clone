import { Link } from '../../../routes';
const LinkFacet = ({ filter }) => {
  return (
    <li>
      <div>{filter.name}</div>
      <ul>
        {
          filter.children.map((category) => {
            return (<li key={category.id}>
              <Link route={`/${category.canonicalId}`}>{category.name}</Link>
              <ul>
                {
                  category.children.map((subcategory) => {
                    return (
                      <li key={subcategory.id}>
                        <Link route={`/${category.canonicalId}/${subcategory.canonicalId}`}>{subcategory.name}</Link>
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