const {Router}=require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { checkJWT } = require('../middlewares/check-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router=Router();


router.post('/new',[
    check('name','El nombre es obligatorio').notEmpty(),
    check('email','No es un email válido').isEmail(),
    check('password','La contraseña debe de tener mínimo 6 caracteres').isLength(6),
    validarCampos
],createUser);

router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({
        min:6
    }),
    validarCampos,
    
],loginUser);


router.get('/renew',[checkJWT],renewToken);



module.exports=router;