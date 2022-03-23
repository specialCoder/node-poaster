<div className="classname">
        <p>{props.foo}</p>
        <p>
        {
            props.names.length > 0 ? props.names.length : null
        }
        </p>
        {
            props.names.map((item) => {
                // const { label, value} = item;
                // return <p>{ label }</p>
                return <p>{`${item.label}-${item.value}`}</p>
            })
            // <p>
            //     {/* {item.label}-{item.value} */}
            //     {/* {`${item.label}`} */}
            //     {item.label}
            // </p>)
        }
        <p>{`${props.bar}`}</p>
        {
            props.show && <p>show</p>
        }
        <pp>ppp</pp>
</div>

/**
 * names.map({ label }) 不支持解构
 * <p>{`${item.label}`}</p> 不支持这种形式的模版字符串
 */