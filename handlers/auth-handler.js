 
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

async function loginUser(model) {
    const user = await User.findOne({ email: model.email });

    if (!user) {
        return { error: "User not found" };
    }

    const isMatched = await bcrypt.compare(model.password, user.password);

    if (!isMatched) {
        return { error: "Invalid credentials" };
    }

  user.lastLogin = user.currentLogin || null; 
  user.currentLogin = new Date();    
  await user.save();

    const token = jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            phone: user.phone,
            address: user.address,
            lastLogin: user.lastLogin,
            currentLogin: user.currentLogin,
        },
        "secrete",
        {
            expiresIn: "1h", 
        }
    );

    return { token, user };
}
 
  module.exports =  { resgisterUser, loginUser };