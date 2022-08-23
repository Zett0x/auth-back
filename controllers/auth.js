const {response}=require('express');
const User = require('../models/User');
const bcrypt=require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');




const createUser= async (req,res=response)=>{

    
    const {email,name,password}=req.body;

    

    try {

        //Verificar si no existe un correo igual
        const user=await User.findOne({email});

        if(user){
            return res.status(400).json({
                ok:false,
                msg:'User already exists'
            })
        }

        //crear el usuario con el modelo
        const dbUser= new User(req.body);
        const salt=await bcrypt.genSalt();
        dbUser.password=bcrypt.hashSync(password,salt);


        //GENERATE JWT

        const token = await generateJWT(dbUser.id,name);


        await dbUser.save();


        //Encriptaremos la contraseña

        return res.status(201).json({
            ok:true,
            uid:dbUser.id,
            name,
            token

        })


    


    //Generar respuesta exitosa
        
    } catch (error) {
        console.log(error)

        return res.json({
            ok:false,
            msg: 'Please contact with the administrator'
        })
        
    }



    

    

}


const loginUser= async(req,res=response)=>{

    

    const {email,password}=req.body;

    try {


        const userDB= await User.findOne({email});

        if(!userDB){
            return res.status(400).json({
                ok:false,
                msg:'Invalid credentials'
            })
        }

        const validPassword = bcrypt.compareSync(password, userDB.password);

        if(!userDB || !validPassword ){
            return res.status(400).json({
                ok:false,
                msg:'Invalid credentials'
            })
        }

        const token = await generateJWT(userDB.id,userDB.name);

        return res.status(200).json({
            ok:true,
            msg:'Login succesfully',
            uid:userDB.id,
            name:userDB.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Contact with the administrator'
        })
        
    }
    

}


const renewToken= async (req,res=response)=>{

    const {uid,name}=req;

    const newToken =await generateJWT(uid,name);
    

    

    return res.json({
        ok:true,
        msg:'Renew token',
        uid,
        name,
        newToken
        
    })

}


module.exports={
    createUser,
    loginUser,
    renewToken
}