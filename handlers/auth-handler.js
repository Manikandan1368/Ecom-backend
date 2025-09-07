 
const User = require('../db/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function resgisterUser(model){
    console.log('model: ', model);
    const hashPassword = await bcrypt.hash(model.password,10);
    let user = new User({
        name: model.name,
        email: model.email,
        password: hashPassword,
        phone: Number(model.phone),
        address: model.address
    });
    await user.save();
  }

  async function loginUser(model){
    const user = await User.findOne({email:model.email});
    const isMatched = await bcrypt.compare(model.password, user.password)
    if(!user){
        return null;
    }
    if(isMatched){
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        },"secrete",
        {
            expiresIn: "1hr",
        }
    );
    return { token, user };
    }else{
        return null;
    }
  }
 
  module.exports =  { resgisterUser, loginUser };