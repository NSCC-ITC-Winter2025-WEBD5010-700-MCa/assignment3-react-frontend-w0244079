import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import RobotForm from './RobotForm';

function RobotCreate() {

  const queryClient = useQueryClient()
  const navigate = useNavigate()



  const createRobotMutation = useMutation({
    mutationFn: async (data) => {
      console.log(data)
      const response = await fetch(`${import.meta.env.VITE_ROBOTS_API_URL}`, {
        method: 'POST',
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
    console.log(data)
    createRobotMutation.mutate(data)
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Robot</h2>
      <RobotForm onDataCollected={processData} />
    </div>
  )
}

export default RobotCreate