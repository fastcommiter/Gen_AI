const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema(
    {
        token:{
            type:String,
            require:[true,"Token is required in blacklist"]
        }
    },
    {
        timestamps : true
    }
)

const tokenBlacklistModel = mongoose.model("blacklistTokens",blacklistTokenSchema)

module.exports = tokenBlacklistModel