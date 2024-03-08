const userModel = require('./user.mongo')

async function setUser(userCred) {
    try{
        const newUser = new userModel({
            email: userCred.email,
            password: userCred.password
        })

        return await newUser.save();
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    setUser
}