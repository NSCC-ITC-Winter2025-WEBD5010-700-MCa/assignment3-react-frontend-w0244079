import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function RobotForm({ onDataCollected, initialData }) {
    const { register, handleSubmit, formState: { errors }, setValue} = useForm()

    useEffect(() => {
        if(initialData){
            // pre-populate the form if data present
            setValue('name', initialData.name)
            setValue('image', initialData.image)
        }
    }, [initialData])

    return (
        <form onSubmit={handleSubmit(onDataCollected)} className="space-y-4">
            <div>
            <input 
                {...register('name', { required: 'Name is required!' } )} 
                type="text" 
                placeholder="Name" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
            <input 
                {...register('image', { required: 'Image is required!' })} 
                type="text" 
                placeholder="Image" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
            </div>

            <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
            Submit Robot
            </button>
        </form>
    )
}

