const GenericFitlerItem = ({filter}) => {
    return (
        <div>
            <div>{filter.name}</div>
            <ul>
                {
                    filter.children.map((childFitler) => {
                        return  (<div key={childFitler.id}>{childFitler.name}</div>);
                    })
                }
            </ul>
        </div>
    );
};

export default GenericFitlerItem;