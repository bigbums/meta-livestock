import { Link } from "react-router-dom"

const Breeding = () => {
  return (
    <div>
        <h1 className="text-4xl">Breeding Management</h1>
        <div className="mt-4">
            <Link
            to="/breeding-programs-list"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
            Breeding Program
            </Link>
      </div>

        <div className="mt-10">
            <Link
            to="/breeding-group-list"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
            Breeding Group
            </Link>
      </div>

    </div>
  )
}

export default Breeding