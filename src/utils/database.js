// import mongoose from 'mongoose';

// let isConnected = false; // track the connection

// export const connectToDB = async () => {
//   mongoose.set('strictQuery', true);

//   if(isConnected) {
//     console.log('MongoDB is already connected');
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI).then(() => {
//       console.log('Connected to MongoDB');
//     }).catch((err) => {
//       console.log(err);
//     });

//     isConnected = true;

//     console.log('MongoDB connected')
//   } catch (error) {
//     console.log(error);
//   }
// }


import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "prompt-studio",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}