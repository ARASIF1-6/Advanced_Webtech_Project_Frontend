"use client"

import Link from "next/link";

export default function TopBar(){

return(<>
       
       <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://www.flaticon.com/download/icon/10951881?icon_id=10951881&author=342&team=342&keyword=Material+management&pack=10951866&style=Color&style_id=131&format=png&color=%23000000&colored=2&size=512&selection=1&type=standard&token=03AFcWeA57Ex0ktYzbCAPShrk55fV9kBoVZFI5QcfYBzvDV5YpENvxS8Lkea1zlMUarBn5JVexVHiXJl2b7EZul4LKM-New2kmjdAeGSiA4tjS2aFMwaXKUro-h7q2lIhdkYkmRApUiGTPwAdwe9Bd8afnZfwCcwO4oqWh1TMHzP4NZWj8EYXmj2RHPGG0679R2GjTjF1N9W2PhBSnkOVFOJugHTEjVjONDwjVIjFgCR2HKHjROOL0PMJyHB7zu3iugm01Y2_1-VsKnE_K3PsCXDclrGIqZ_Ea0OlUsRtrIEGtdvR4LpsdSnfKh1jic7kWgU7Oa9hdjNKVEB6xUv0ZTyn1_J_KvPoa3rGisgXNyrPl1cLqVnmQfFl8uZQyGoCOPrX8xATBy2C6c2SsrQcfTklIuzz9m2L449j5ixP3H8n32stNBqxKFo9AghALdNf7RQW9kGLaVqQEfvJfdPySPXc8QPnl9qmWkj1UkgX669urCqMiZkQLa0hVQPZQcwWiH4vN-nqK9DvL9NK8N-ueQxJ3SP0JJjFJR2xPt596elBwvYEvmHIw2RtCQGr9ZXsc7dt1tObfVVq_fe4lC3ty1Gp7-RmMUFOFr8wiRkKC_npjWdKUoIeRDEQhBvxs6G3fpXOo-Ev0QdPkwvU56t5_Byp8PWRERBpdeoJc6VxLlV13LDhZdUcwdvrkH5Vy_Y3P23DoGWk1qaichgcqhvfHp1Qxx5Kkxh0YHIz6ENKwVohBzqeCZKXLyO0XW76ZBmrzGnESB8_Mulb1AJTTIPW1HUT5GjFhBZbudGMqN0cBhhM446uKeDhD41UkI4L9jHMMtDpR7AyTa0IHaifxU07-OJmUX0bKN7a_150EOR9n6LhbtMi67HvtEp-Vjn6HIgyARdFCsSrVK1WTSBVQ1i-bXlZUoJuAT4S6D83tnP0N49ovqWRsRrRh3tSGXE6gJwrwUlF0NnuZ4jxkhzBLjGDbaz_aeGCmmU1XxSwgOIBaLfpc44E136Xcwvf5VF4s899I6CCMWjsetYoMPgx8d30dySDGQIlv04sB2uxrFJEEIDJAklQmn1DSn4dx7LX8ajKBDCjpdAO6DdpsRxIzUG71ogJ-ZiirAHyDuwaWNKxdDrR7d64h9bxBRW871NxoPzv3uP-sB1d_hvgtcHCHWqVGbyV6fh0go7n5rX_ND7qcMi8svYqrTVsf4FM0Beyf7fV-dC_UG8HOcDhsBjm_wyT_DcuJnKHKnGkmivTvvT0PQpLU6lZVgciU6nbx0xWw95Xur3qsNKbVz1iHEKLmSGcjTOFn7b7fXuZdpVM1chVgNm193YDACf6UbPj3MSHg70gKq5todz4dAUcY3ZLcYeCzHX-ISoRC7tsezqk4vhoAVOzU3Q2zd5jXyXSgkQ0X9ZijvFHS2OBVENY1kb2h7TEI8tef0VVAb47DngpYrh2EuEnAIv5pxfjgpymzBnWgJ-Sz8TxiIDCOI-RUDRngdesFYtKExf_8cSE-KVZIEojigA5DOuEs6tjCWvd5AqyZi9IUY6KU9C9PQQ3pwvDMsJr8fFxgMLhzSvdnrlomD0g2lxypLU2x8wtYZNEFOi5JqS-ZR27q1NHfBOA1Zb9jMyIBbkNiQ7fBJVYj3o2KBKC5bDfPKF-42JZzVCT-Ve3pXFePYZGuNTqucityoyq6tA8wwgp8ExEHizGxRuAl0bq6-C4ZXIg0rhkF-OOz2LpZgKZ5hPyjlZt_q7BGtirjZg3FvxCF05-xUoJIHmZoa4E2e9sRkMGy580dhuky7XsEvR9nGDEgkKBuvyqhjjiS5yUvxK_9vwWgcRelpumGqm3UhPYhnHH1zXQTfGjzJyRM7_dSE3CRvn_GQk1LjytlnYNVgG-bRxKIQVD_7zMq7cna_SaW5vxpYPah0-dZuJpYaBxKQ6iJ5J1Zj8UV2G2Ebe2J__YEkEehHrk9FOSE50nrkN3Z3eyyzfUBJa4w0ldMmeJU0lpA7bEG75CO&search=inventory+management"
          alt="Inventory Management Logo"
          width={40} 
          height={40} 
        />
        <span className="ml-2 text-xl font-semibold text-gray-800">Inventory Management</span>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="text-gray-600 hover:text-blue-500 transition duration-200">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-blue-500 transition duration-200"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-gray-600 hover:text-blue-500 transition duration-200"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/logout"
            className="text-gray-600 hover:text-blue-500 transition duration-200"
          >
            Logout
          </Link>
        </li>
      </ul>
      {/* Add more content to the right side if needed */}
    </nav>

</>);


}