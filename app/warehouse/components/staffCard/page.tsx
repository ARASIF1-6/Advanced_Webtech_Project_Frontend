

export default function StaffCard(props: any) {
    return (
        <>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure className=""><img src={'http://localhost:3008/warehouse/getimage/' + props.data.filename} alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title"> {props.data.Name}</h2>
                    ID: {props.data.warehouseId} <br />
                    Username: {props.data.username} <br />
                    Email: {props.data.email} <br />
                    Address: {props.data.address} <br />
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">delete</button>
                    </div>
                </div>
            </div>
        </>
    );
}