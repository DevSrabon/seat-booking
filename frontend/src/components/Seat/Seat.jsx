import { useQuery } from "react-query";
const Seat = () => {
	const {
		data = [], refetch
	} = useQuery({
		queryKey: ["seat"],
		queryFn: async () => {
			const res = await fetch(`${process.env.REACT_APP_API}/seat`);
			const data = await res.json();
			return data;
		},
	});
	const handleClick = async (id,status) => { 

		await fetch(`${process.env.REACT_APP_API}/process/${id}`, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({status})
		})
			.then((res) => res.json())
			.then(() => refetch());
		 setTimeout(() => {
			
			 fetch(`${process.env.REACT_APP_API}/booked/${id}`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ status }),
				})
					.then((res) => res.json())
					.then(() => refetch());
		},1000)
	}
	
	return (
		<div>
			<div className="grid grid-cols-4   w-56 mx-auto mt-56">
				{data?.map((item) => (
					<div className="w-10 h-10" key={item._id}>
						<div
							onClick={() => handleClick(item._id,item.status)}
							className={`${
								item?.status === "process" ? "bg-[yellow]" : "bg-[green]"
							} ${
								item?.status === "booked" ? "bg-[red]" : "bg-[green]"
							} h-6 w-5 rounded-tl-2xl rounded-tr-2xl  relative`}>
							<div className="h-[10px] w-[19.5px] skew-x-12 left-[1.5px]  bg-neutral-400 absolute -bottom-[10px]"></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Seat;
