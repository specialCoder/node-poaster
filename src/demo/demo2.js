<div className="myClassName">
    {
        names.map(({ id, name }) => {
            return {
                label: name,
                value: id
            }
        })
    }
    {
        show && <p>{ product }</p>
    }
</div>