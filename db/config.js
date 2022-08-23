const mongoose= require('mongoose');


const dbConnection=async()=>{
    console.log('Conneting to database...');
    try {
        await mongoose.connect(process.env.BD_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            
        });
        console.log('Connected to database successfully!')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error connecting to database');
    }

}

module.exports={
    dbConnection
}