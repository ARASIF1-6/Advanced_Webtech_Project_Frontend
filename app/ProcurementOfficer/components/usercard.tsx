export default function UserCard(props: any) {

    return (<>
 <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* <img
        src={`http://localhost:8000/admin/getimage/${props.data.filename}`}
        alt={`${props.data.name} Logo`}
        className="w-full h-48 object-cover"
      /> */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">ID: {props.data.id}</h2>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Name:</span> {props.data.name}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Contact Person:</span> {props.data.contactPerson}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Address:</span> {props.data.address}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Phone Number:</span> {props.data.phoneNumber}
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200">
            Delete
          </button>
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition duration-200">
            Update
          </button>
        </div>
      </div>
    </div>

    </>);

}