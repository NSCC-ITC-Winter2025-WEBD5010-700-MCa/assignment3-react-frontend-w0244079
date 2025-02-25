import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom"

function RobotsTable({ robots }) {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const deleteRobotMutation = useMutation({
        mutationFn: async (robotId) => {
            const response = await fetch(`http://localhost:5000/robots/${robotId}`, {
                method: 'DELETE'
            })
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['robotsData'])
        },
        onError: (error) => {
            alert('Unable to delete')
        }
    })

    const handleDelete = (robotId) => {
        if(window.confirm(`Are you sure you wish to delete record ${robotId}`)){
            deleteRobotMutation.mutate(robotId)
        }
    }


    return (
        <>
        <p><Link to="/admin/robots/create">Add New Robot</Link></p>
        <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
 <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                robots.map(robot => {
                return (<tr key={robot._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{ robot._id }</td>
                            <td className="border border-gray-300 px-4 py-2">{ robot.name }</td>
                            <td className="border border-gray-300 px-4 py-2">{ robot.image }</td>
                            <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                                <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
                                <button onClick={ () => navigate(`/admin/robots/${robot._id}/edit`) } className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
                                <button onClick={ () => { handleDelete(robot._id) } } className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
                            </td>
                        </tr>)
                })
            }
            </tbody>
        </table>
    </>

    );
}

export default RobotsTable;