const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sajc8ea.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
		const collection = client.db("Seat").collection("Seat");

		app.put("/process/:id", async (req, res) => {
			const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const query = req.body
            if (query.status === "booked") return;
			const options = { upsert: true };
			const updateDoc = {
				$set: {
					status: "process",
				},
			};
			const result = await collection.updateOne(filter, updateDoc, options);
			res.send(result);
		});
		app.put("/booked/:id", async (req, res) => {
			const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            
			 const query = req.body;
				if (query.status === "booked") return;
			const options = { upsert: true };
			const updateDoc = {
				$set: {
					status: "booked",
				},
			};
			const result = await collection.updateOne(filter, updateDoc, options);
			res.send(result);
		});

		app.get("/seat", async (req, res) => {
			const seats = await collection.find().toArray();
			res.json(seats);
		});
	} finally {
	}
}
run();

app.listen(port, () => {
	console.log(`Local server running on ${port}`);
});
