const {
  Telegraf,
  Composer,
  Stage,
  WizardScene,
  session
} = require('micro-bot')
const mongoose = require('mongoose')

const settingsModel = require('../model/settingsModel')
const userModel = require('../model/userModel')

const startMenu = require('../modules/startMenu')

const bot = new Composer()


const settingsId = '6211fe05c190a6ada709821e'


bot.use(session())


const userWizard = new WizardScene('user-wizard',
    (ctx)=>{

        ctx.telegram.sendMessage(ctx.chat.id , "Are you sure to share your phone number with us?", {
            reply_markup: {
                keyboard: [
                    [{text: "I agree" , request_contact: true}]
                ]
            }
        })

        return ctx.wizard.next()
    },
  (ctx) => {

    ctx.session.user = {}

    ctx.session.user.phone = ctx.update.message.contact.phone_number

      ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 1:</b> \n\n Join our <a href="https://t.me/amdg_global">Telegram group</a> and Join our <a href="https://t.me/AMDGCommunityID">Telegram community</a> \n\nSubmit your telegram username ( Example: @amdgtoken )`, {
          reply_markup: {
              remove_keyboard: true
          },
          parse_mode: "HTML"
      }).catch((e) => console.log(e))

      return ctx.wizard.next()
  },

  (ctx) => {
    ctx.session.user.tl = ctx.update.message.text
      ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 2:</b> \n\nJoin our <a href="https://www.facebook.com/AssetsManagementDigitalGroup/">Facebook page</a> \n\nSubmit your facebook name ( Example: Bill Gates )`, {
          reply_markup: {
            remove_keyboard: true
          },
          parse_mode: "HTML"
      }).catch((e) => console.log(e))

      return ctx.wizard.next()

  },


  (ctx) => {

    ctx.session.user.fb = ctx.update.message.text

      ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 3:</b> \n\nFollow our <a href="https://twitter.com/amdgsolutions">Twitter</a> and Retweet a post  \n\nSubmit your twitter username ( Example: @amdgtoken )`, {
          reply_markup: {
            remove_keyboard: true
          },
          parse_mode: "HTML"
      }).catch((e) => console.log(e))

      return ctx.wizard.next()

  },
  (ctx) => {
    ctx.session.user.tw = ctx.update.message.text

      ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 4:</b> \n\nFollow our <a href="https://www.instagram.com/accounts/login/?next=/amdgsolutions/">Instagram</a> and submit your Instagram username ( Example: amdgtoken )`, {
          reply_markup: {
            remove_keyboard: true
          },
          parse_mode: "HTML"
      }).catch((e) => console.log(e))

      return ctx.wizard.next()

  },

  (ctx) => {
    ctx.session.user.in = ctx.update.message.text

      ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 5:</b>\n\nFollow on <a href="https://www.tiktok.com/@amdgsolutions">Tiktok</a> and Like, Comment in any post  \n\nSubmit your Tiktok username ( Example: @amdgtoken )`, {
          reply_markup: {
            remove_keyboard: true
          },
          parse_mode: "HTML"
      }).catch((e) => console.log(e))

      return ctx.wizard.next()

  },


  (ctx) => {
    ctx.session.user.tk = ctx.update.message.text

      ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 6:</b> \n\nSubscribe on <a href="https://www.youtube.com/channel/UCLwQjrb14p0VBgqw9raxmPA">Youtube</a> and Comment in any videos  \n\nSubmit your youtube name ( Example: Bill gates )`, {
          reply_markup: {
            remove_keyboard: true
          },
          parse_mode: "HTML"
      }).catch((e) => console.log(e))

      return ctx.wizard.next()

  },

  (ctx) => {
    ctx.session.user.yt = ctx.update.message.text

      ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 7:</b> \n\nPlease like in any post on our <a href="https://www.linkedin.com/company/assetmanagementdigitalgroup/">Linkedin</a> \n\nSubmit your Linkedin name ( Example: Bill gates )`, {
          reply_markup: {
            remove_keyboard: true
          },
          parse_mode: "HTML"
      }).catch((e) => console.log(e))

      return ctx.wizard.next()

  },

  (ctx) => {
    ctx.session.user.linke = ctx.update.message.text

      userModel.find({
          userId: ctx.from.id
      }).then((data)=>{

              const l = data.length

              if (l > 0) {


                  settingsModel.find({
                      id: settingsId
                  }).then((data)=>{

                          const join_bonus = data[0].join_bounus
                          const referral_bounus = parseFloat(data[0].referral_bounus)

                          const userInfoData = {
                              name: ctx.from.first_name,
                              wallet: ctx.update.message.text,
                              balance: join_bonus,
                              phone: ctx.session.user.phone,
                              ref_link: "https://t.me/" + ctx.botInfo.username + "?start=" + ctx.from.id,
                              referralCount: 0,
                              linkedin_name : ctx.session.user.linke,
                            youtube_name : ctx.session.user.yt,
                            tiktok_username : ctx.session.user.tk,
                            instagram_name : ctx.session.user.in,
                            twitter_username : ctx.session.user.tw,
                            facebook_name : ctx.session.user.fb,
                            telegram_username : ctx.session.user.tl,
                          }


                          userModel.updateOne({
                              userId: ctx.from.id
                          }, userInfoData).then((data)=>{

                                  userModel.find({
                                      userId: ctx.from.id
                                  }).then((data)=>{

                                          const r = p_user[0].referr_id

                                          userModel.find({
                                              userId: r
                                          }).then((data)=>{

                                              const b = parseFloat(d[0].balance)
                                              const ref_count = parseInt(d[0].referralCount) + 1

                                              const fpc = b + referral_bounus

                                              userModel.updateOne({
                                                  userId: r
                                              }, {
                                                  balance: b + referral_bounus,
                                                  referralCount: ref_count
                                              }).catch((e)=>console.log("Wizard Balance update error"))

                                          }).catch((e)=>console.log("Wizard referral users data find error"))

                                  }).catch((e)=>console.log("Wizard users data find error"))

                          }).catch((e)=>console.log("Wizard users data update error"))


                  })




              } else {


                  settingsModel.find({
                      id: settingsId
                  }).then((data)=>{

                          const join_bonus = data[0].join_bounus

                          const userData = new userModel({
                              userId: ctx.from.id,
                              name: ctx.from.first_name,
                              wallet: ctx.update.message.text,
                              balance: join_bonus,
                              phone: ctx.session.user.phone,
                              ref_link: "https://t.me/" + ctx.botInfo.username + "?start=" + ctx.from.id,
                              referralCount: 0,
                              linkedin_name : ctx.session.user.linke,
                            youtube_name : ctx.session.user.yt,
                            tiktok_username : ctx.session.user.tk,
                            instagram_name : ctx.session.user.in,
                            twitter_username : ctx.session.user.tw,
                            facebook_name : ctx.session.user.fb,
                            telegram_username : ctx.session.user.tl,
                          })


                          userData.save().catch((e)=>console.log(e))
        

                  }).catch((e)=>console.log("Error : Sign up without referral"))


              }

      })


      ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 8:</b> \n\nDownload AM-Wallet

      📱 AM-Wallet Android
      📱 AM-Wallet iOs
      
      Click " Submit " Button to continue!`, {
          reply_markup: {
            keyboard: [
                [{text: "☑️ Submit My Details ☑️"}]
            ]
          },
          parse_mode: "HTML"
      }).catch((e) => console.log(e))

      return ctx.wizard.next();
  },

  (ctx) => {

      ctx.telegram.sendMessage(ctx.chat.id, `Congratulation your account has been created  

      Go to home /start 
      
      Account Info: 
      User ID: ${ctx.from.id}
      Name: ${ctx.from.first_name} 
      
      Referrel link: 
      https://t.me/${ctx.botInfo.username}?start=${ctx.from.id} `, {

          reply_markup: {
              remove_keyboard: true
          },
          parse_mode: "HTML"

      }).catch((e) => console.log(e))


      return ctx.scene.leave()
  }
)



module.exports = userWizard