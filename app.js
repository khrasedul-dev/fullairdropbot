const {
    Telegraf,
    Composer,
    Stage,
    WizardScene,
    session
} = require('micro-bot')
const mongoose = require('mongoose')


const settingsModel = require('./model/settingsModel')
const userModel = require('./model/userModel')
const withdrawlModel = require('./model/withdrawModel')
const claimModel = require('./model/claimModel')

const startMenu = require('./modules/startMenu')
const userWizard = require('./modules/userWizard')

const bot = new Composer()
// const bot = new Telegraf('5122442804:AAEsQwUFc97XA_47onoEsS8QBMufFnkE_Js')

mongoose.connect('mongodb+srv://rasedul20:rasedul20@cluster0.ax9se.mongodb.net/airdropBot?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((e) => {
    console.log(e)
}).then((d) => console.log('Database connected')).catch((e) => console.log(e))


// mongoose.connect('mongodb://localhost:27017/telegramProject', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).catch((e) => {
//     console.log(e)
// }).then((d) => console.log('Database connected')).catch((e) => console.log(e))



const settingsId = '6211fe05c190a6ada709821e'


bot.use(session())




bot.start(ctx => {

    const userQuery = {
        userId: ctx.from.id
    }
    const data = userModel.find(userQuery)
    data.then((data) => {

        const hasUser = data.length

        if (hasUser > 0) {

            startMenu(ctx, data)

        } else {

            const query = {
                id: settingsId
            }

            const data2 = settingsModel.find(query)

            data2.then((data) => {

                const status = parseInt(data[0].airdrop_status)

                if (status > 0) {

                    const referrId = ctx.startPayload
                    if (referrId) {
                        const data3 = userModel.find({
                            userId: referrId
                        })
                        data3.then((data) => {
                            const userdata = new userModel({
                                referr_id: referrId,
                                userId: ctx.from.id,
                                referr_by: data[0].name
                            })

                            const data4 = userdata.save()
                            data4.then((data) => {
                                const data5 = settingsModel.find({
                                    id: settingsId
                                })

                                data5.then((data) => {

                                    const join_bonus = data[0].join_bounus
                                    const referral_bounus = data[0].referral_bounus
                                    const coin_name = data[0].coin_name

                                    ctx.telegram.sendMessage(ctx.chat.id, `Hello sir ${ctx.from.first_name} ! I am your friendly AMDG Airdrop BOT 🤖
                                    👍 Please do the required tasks to be eligible to get 100 AMDG Token. But if you can refer more and you can earn up to 30 AMDG Token
                                    ✅ For Joining - Get ${join_bonus} ${coin_name}
                                    ✅ Per Referral -  ${referral_bounus} ${coin_name}
                                    ✅ Claim Your Daily Rewards - Get 10 AMDG
                                    📑 By Participating you are agreeing to the AMDG (Airdrop) Terms and Conditions. Please see pinned post for more information.
                                    Click " 🤑 Join Airdrop 🤑 " to start `, {
                                        reply_markup: {
                                            keyboard: [
                                                [{
                                                    text: "💻 Join Airdrop"
                                                }]
                                            ],
                                            resize_keyboard: true
                                        },
                                        parse_mode: "HTML"
                                    })

                                }).catch((e) => console.log(' Settings : error to add refer bounous'))

                            }).catch((e) => console.log(' User :  error to add refer bounous'))

                        })

                    } else {

                        const data8 = settingsModel.find({
                            id: settingsId
                        })

                        data8.then((data) => {

                            const join_bonus = data[0].join_bounus
                            const referral_bounus = data[0].referral_bounus
                            const coin_name = data[0].coin_name

                            ctx.telegram.sendMessage(ctx.chat.id, `Hello sir ${ctx.from.first_name} ! I am your friendly AMDG Airdrop BOT 🤖
                            👍 Please do the required tasks to be eligible to get 100 AMDG Token. But if you can refer more and you can earn up to 30 AMDG Token
                            ✅ For Joining - Get ${join_bonus} ${coin_name}
                            ✅ Per Referral -  ${referral_bounus} ${coin_name}
                            ✅ Claim Your Daily Rewards - Get 10 AMDG
                            📑 By Participating you are agreeing to the AMDG (Airdrop) Terms and Conditions. Please see pinned post for more information.
                            Click " 🤑 Join Airdrop 🤑 " to start`, {
                                reply_markup: {
                                    keyboard: [
                                        [{
                                            text: "💻 Join Airdrop"
                                        }]
                                    ],
                                    resize_keyboard: true
                                },
                                parse_mode: "HTML"
                            })

                        })

                    }

                } else {

                    ctx.telegram.sendMessage(ctx.chat.id, `Hello ${ctx.from.first_name} \nWellcome to our AirdropBot \n\nThe airdrop has been close.\n \nFor more update Join our <a href="https://t.me/amdg_global">Telegram group</a> . \nWe will come back soon. \n\nStay with us \nThank you`, {
                        parse_mode: "HTML"

                    }).catch((e) => console.log(e))
                }

            }).catch((e) => console.log("Setting : error on airdrop close"))

        }

    })

})


const wScene = new WizardScene('w-s',

(ctx) => {

    ctx.telegram.sendMessage(ctx.chat.id, `"Wallet Address: \nKindly enter your AM-Wallet Address"`, {
        reply_markup: {
            remove_keyboard: true
        },
        parse_mode: "HTML"
    }).catch((e) => console.log(e))

    return ctx.wizard.next()

},

(ctx)=>{
    const data = userModel.find({
        userId: ctx.from.id
    })
    
    
    
    data.then((data) => {
    
        const user_data = data[0]
    
        const user_balance = parseFloat(user_data.balance)
    
        if (user_balance > 0) {
    
            const withdrawData = new withdrawlModel({
                userId: ctx.from.id,
                name: user_data.name,
                withdrawl_balance: user_data.balance,
                wallet: ctx.update.message.text
            })
    
            const data2 = withdrawData.save()
    
            data2.then((data) => {
    
                const data3 = userModel.updateOne({
                    userId: ctx.from.id
                }, {
                    balance: 0
                })
    
                data3.then((data) => {
    
                    ctx.telegram.sendMessage(ctx.chat.id, `Your withdraw request has been sucessfully submited \nBack (Back to start menu)`, {
                        reply_markup: {
                            keyboard: [
                                [{
                                    text: "Back"
                                }]
                            ],
                            resize_keyboard: true
                        }
                    }).catch((e) => console.log(e))
    
                }).catch((e) => console.log('Balance Update: Something is wrong'))
    
            }).catch((e) => console.log('Balance : Something is wrong'))
    
        } else {
    
            ctx.telegram.sendMessage(ctx.chat.id, `Sorry, you have not enough balance.`, {
                reply_markup: {
                    keyboard: [
                        [{
                            text: "Back"
                        }]
                    ],
                    resize_keyboard: true
                }
            }).catch((e) => console.log(e))
        }
    
    }).catch((e) => console.log('Withdrawl request: Something is wrong'))
    
    return ctx.scene.leave()
}



)

const stage = new Stage([userWizard,wScene])

bot.use(stage.middleware())


bot.hears(["💻 Join Airdrop"], Stage.enter('user-wizard'))


bot.hears("Withdraw", ctx => {

    const userQuery = {
        userId: ctx.from.id
    }
    const data = userModel.find(userQuery)

    data.then((data) => {

        const hasUser = data.length

        if (hasUser > 0) {
            ctx.telegram.sendMessage(ctx.chat.id, `If you want to withdraw your balance then tap on withdraw request 

            Account information: 
            UserId: ${data[0].userId}
            Name: ${data[0].name} 
            Balance: ${data[0].balance} 
            Your referral: ${data[0].referralCount}
            `, {
                reply_markup: {
                    keyboard: [
                        [{
                            text: "Withdraw Request"
                        }, {
                            text: "Back"
                        }]
                    ],
                    resize_keyboard: true
                }
            }).catch((e) => console.log(e))
        }

    }).catch((e) => console.log('Withdrawl : Something is wrong'))

})



bot.hears('Withdraw Request',Stage.enter('w-s'))


bot.hears("My account", ctx => {

    const userQuery = {
        userId: ctx.from.id
    }

    const data = userModel.find(userQuery)

    data.then((data) => {

        const hasUser = data.length
        if (hasUser > 0) {
            ctx.telegram.sendMessage(ctx.chat.id, `Hello ${ctx.from.first_name} 

            Account information: 
            UserId: ${data[0].userId}
            Name: ${data[0].name}
            Balance: ${data[0].balance}
            Your referral:  ${data[0].referralCount} 
            
            Referral link: ${data[0].ref_link}
                                    `, {
                reply_markup: {
                    keyboard: [
                        [{
                            text: "Back"
                        }]
                    ],
                    resize_keyboard: true
                }
            }).catch((e) => console.log(e))
        }
    }).catch((e) => console.log("My account: Something is wrong"))

})

bot.hears("Back", ctx => {

    const userQuery = {
        userId: ctx.from.id
    }
    const data = userModel.find(userQuery)

    data.then((data) => {
        const hasUser = data.length
        if (hasUser > 0) {
            ctx.telegram.sendMessage(ctx.chat.id, `Hello ${ctx.from.first_name} \n\nAccount information: \nUserId: ${data[0].userId} \nName: ${data[0].name}`, {
                reply_markup: {
                    keyboard: [
                        [{text: "Claim Daily Rewards"},{text: "Withdraw"}],
                        [{text: "My account"},{text: "Help"}]
                    ],
                    resize_keyboard: true
                }
            }).catch((e) => console.log(e))
        } else {
            ctx.telegram.sendMessage(ctx.chat.id, `Hello ${ctx.from.first_name} \n\nWe are very sorry we could not find you our database \nPlease join our airdrop first \n\nThank you using ${ctx.botInfo.username}`).catch((e) => console.log(e))
        }
    }).catch((e) => console.log("Back : Something is wrong"))

})


bot.hears('Help', ctx => {
    ctx.telegram.sendMessage(ctx.chat.id, `Join with our <a href="https://t.me/amdg_global">Telegram group</a> \nJoin our <a href="https://t.me/AMDGCommunityID">Telegram community</a> . Contact with us in Telegram`, {
        reply_markup: {
            keyboard: [
                [{
                    text: "Back"
                }]
            ],
            resize_keyboard: true
        },
        parse_mode: "HTML"
    }).catch((e) => console.log(e))
})


bot.hears('Claim Daily Rewards',ctx=>{

    const presentTime = Date.now()
    const t = 86400000

    settingsModel.find({id: settingsId}).then((data)=>{

        const reward = parseFloat(data[0].daily_reward)

        userModel.find({userId: ctx.from.id}).then((data)=>{

            const user_balance = parseFloat(data[0].balance)

            claimModel.find({userId: ctx.from.id}).then((data)=>{
                if (data.length > 0) {
                    if (presentTime > data[0].time) {
                        const updateTime = presentTime+t
                        claimModel.updateOne({userId: ctx.from.id},{time: updateTime}).then((data)=>{
                            ctx.reply('Congratulations, your daily rewards has been successfully claimed. You can claim again tomorrow, after 24 hours from now')
                        }).then((data)=>{
                            userModel.updateOne({userId: ctx.from.id},{balance: user_balance+reward}).catch((e)=>console.log(e))
                        }).catch((e)=>console.log(e))
                    }else{
                        ctx.reply('You are not eligable to claim')
                    }
                } else {
        
                    const timeData = new claimModel({
                        userId: ctx.from.id,
                        time: presentTime + t
                    })
                    timeData.save().then((data)=>{
                        userModel.updateOne({userId: ctx.from.id},{balance: user_balance+reward}).then((data)=>ctx.reply('Congratulations, your daily rewards has been successfully claimed. You can claim again tomorrow, after 24 hours from now')).catch((e)=>console.log(e))
                    }).catch((e)=>console.log(e))
                }
            }).catch((e)=>console.log(e))

        })

    }).catch((e)=>console.log(e))

})



// bot.launch()

module.exports = bot
