module.exports= async()=>{
    const Tweet = require('./models/Tweet');
    const User = require('./models/User');
    
    User.hasMany(Tweet,{as:'Tweets', foreignKey:'userId'});
    Tweet.belongsTo(User, {as:'user', foreignKey:'userId'})

    const errorHandler=(error)=>{
        console.log("error:", error)
    }

   const user = await User.create({
        username:'uspm_mht',
        passwd:'12345'
    }).catch(errorHandler);

    const tweet = await Tweet.create({
        content:'this is tweet',
        userId:user.id
    }).catch(errorHandler);

    const users = await User.findAll({
        where:{userId:'uspm_mht'}, 
        include:[{model:Tweet , as:'Tweets'}]
    }).catch(errorHandler);

    console.log('users=>', users)
}