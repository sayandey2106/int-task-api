import mongoose from "mongoose";

const Connections = async () => {
  const USER = process.env.DB_USERNAME;
  const PASSWORD = process.env.DB_PASSWORD;

  const URL = `mongodb+srv://${USER}:${PASSWORD}@namelessdb.nw6ojqx.mongodb.net/assignment`;

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
    });
    console.log(`Db is connected successfully`);
  } catch (error) {
    console.log(`Db could not be connected!`, error.message);
  }
};

export default Connections;
