const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    phone:{
        type: String
    },
    balance: {
        type: String
    },
    referr_id:{
        type: String
    },
    referr_by:{
        type: String
    },
    referralCount: {
        type: String
    },
    ref_link:{
        type: String
    },
    wallet: {
        type: String
    },
    telegram_username: {
        type: String
    },
    youtube_name: {
        type: String
    },
    tiktok_username: {
        type: String
    },
    instagram_name: {
        type: String
    },
    twitter_username: {
        type: String
    },
    facebook_name: {
        type: String
    },
    linkedin_name: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date
    }

},{versionKey: false})


module.exports = mongoose.model('user' , userSchema)