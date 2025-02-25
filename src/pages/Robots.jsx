import { useQuery } from '@tanstack/react-query';
import RobotsTable from '../components/robots/RobotsTable';
import { Outlet, useLocation } from 'react-router-dom';

const Robots = () => {
  //get the current location information
  const location = useLocation()

  console.log(location.pathname)

  const { isPending, error, data } = useQuery({
    queryKey: ['robotsData'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_ROBOTS_API_URL}`)
      return response.json() //returns a promise of our data
    },
    staleTime: Infinity
  })


  if (error) return <div>{`An error has occurred: + ${error.message}`}</div>

  return (
    <div>

      <h1 className="text-2xl font-bold">Robots</h1>

      { 
      location.pathname === '/admin/robots' ? 
          isPending ? <div>Loading...</div> : <RobotsTable robots={data} />
          : 
          <Outlet />
      }

    </div>
  );
};
export default Robots;
