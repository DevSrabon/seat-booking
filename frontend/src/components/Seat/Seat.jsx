import { useQuery } from "react-query";
import { TbArmchair } from "react-icons/tb";

const Seat = () => {
	const { data = [], refetch } = useQuery({
		queryKey: ["seat"],
		queryFn: async () => {
			const res = await fetch(`https://seat-booking.vercel.app/seat`);
			const data = await res.json();
			return data;
		},
	});

	const handleClick = async (id, status) => {
		await fetch(`https://seat-booking.vercel.app/process/${id}`, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ status }),
		})
			.then((res) => res.json())
			.then(() => refetch());
		setTimeout(() => {
			fetch(`https://seat-booking.vercel.app/booked/${id}`, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ status }),
			})
				.then((res) => res.json())
				.then(() => refetch());
		}, 1000);
	};
	return (
		<div>
			<div className="grid grid-cols-5  w-56 mx-auto mt-10">
				{data?.map((item) => (
					<div key={item._id}>
						<TbArmchair
							onClick={() => handleClick(item._id, item.status)}
							size={54}
							className={`${item.status === "process" && "fill-yellow-400"} ${
								item.status === "booked" && "fill-[red]"
							} fill-[green] ${
								item.status === "empty" && "focus-within:fill-blue-400"
							} `}
							color={item.status !== "empty" ? "#730916" : "black"}
							cursor={item.status !== "booked" && "pointer"}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Seat;
