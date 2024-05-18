
export default function Sidebar(){
    return (<>
    <aside className="w-64 h-screen bg-gray-100 shadow-md sticky top-0 left-0 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 p-4"><a href="/dashboard" >DashBoard</a></h2>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <a href="/purchaseorders" className="block p-3 text-gray-700 hover:bg-gray-200">Purchase Orders</a>
          </li>
          <li>
            <a href="/suppliers" className="block p-3 text-gray-700 hover:bg-gray-200">Suppliers</a>
          </li>
          <li>
            <a href="/inventory" className="block p-3 text-gray-700 hover:bg-gray-200">Inventory</a>
          </li>
        </ul>
      </nav>
    </aside>
    
    </>);
}
