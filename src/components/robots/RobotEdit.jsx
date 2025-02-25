import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import RobotForm from './RobotForm';

function RobotEdit(){
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {data} = useQuery({
        queryKey: ['robots', id],
        queryFn: async () => {
            console.log('test')
            const response = await fetch(`http://localhost:5000/api/robots/${id}`);
            return response.json()
        }
    })

    const editRobotMutation = useMutation({
      mutationFn: async (data) => {
        const response = await fetch(`http://localhost:5000/api/robots/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })

        return response.json()
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['robotsData'])
        navigate('/admin/robots')
      }
    })

    const processData = (data) => {
      editRobotMutation.mutate(data);
    }

    return (
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Robot - Id: {data?._id}</h2>
        <RobotForm onDataCollected={processData} initialData={data} />
      </div>
    )
}

export default RobotEdit