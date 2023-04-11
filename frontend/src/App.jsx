
import { TbArmchair } from 'react-icons/tb';
import Seat from './components/Seat/Seat'

function App() {  
  return (
		<div>
			<div className="w-96 h-32 skew-x-3 mx-auto border-8 mt-5 bg-white">
      </div>
			<Seat />
      <div className="w-56 mx-auto mt-10 border-2 p-2 border-[gray] rounded-tl-lg">
				<div className="flex items-center">
					<TbArmchair
						size={30}
						className={`fill-[green]`}
						color="black"
        />
        <span className='font-semibold'>Available</span>
				</div>
				<div className="flex items-center">
					<TbArmchair
						size={30}
						className={`fill-yellow-400`}
						color="#730916"
        />
        <span className='font-semibold'>Processing</span>
				</div>
				<div className="flex items-center">
					<TbArmchair
						size={30}
						className={`fill-[red]`}
						color="#730916"
        />
        <span className='font-semibold'>Booked</span>
				</div>

      </div>
		</div>
	);
}

export default App
