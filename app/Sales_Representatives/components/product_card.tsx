export default function ProductCard(props: any) {

    return (<>
 
        <div className="card bg-base-100 shadow-xl">
            {/* <figure><img src={'http://localhost:3001/seller/getimage/' + props.data.filename} width={400} /></figure> */}
            <div className="card-body">
                <h2 className="card-title">ID: {props.data.name}</h2>
                Name:  {props.data.productName}<br />
                Quantity:  {props.data.productQuantity}<br />
                Price:  {props.data.productPrice}<br />
                {/* <div className="card-actions justify-end">
                <button className="btn btn-error">Delete</button>
                    <button className="btn btn-warning">Update</button>
                </div> */}
            </div>
        </div>
                
    </>);

}