//#region require

const dicordjs = require("discord.js")
const serverjson = require("../../jsonbase/server.json")
const corejs = require("../engine/core.js")
//const eng_level = require("../engine/level.ts")
const leveljson = require("../../jsonbase/level.json")

//#endregion

module.exports = {
    process: function(client,msg) {
        if(serverjson.settings.levels == false) {
            return false
        }
        let dex = corejs.findIndexJSONKey(msg.member.id,serverjson.accounts)
        if(dex == -1) {
            return false
        }

        let mval = corejs.cleanCommand(msg.content)
        if(corejs.isadmin(msg.member.id) == true) {
            if(mval.startsWith("levelmultiplier ")) {
                setLevelMultiplier(msg)
                return true
            } else if(mval == "levelmultiplier") {
                msg.delete()
                msg.reply(`Level multiplier: ${leveljson.settings.levelMultiplier}`)
                return true
            } else if(mval.startsWith("exppermsg ")) {
                setexppermsg(msg)
                return true
            } else if(mval == "exppermsg") {
                msg.delete()
                msg.reply(`Experience per message: ${leveljson.settings.expPerMsg}`)
                return true
            } else if(mval.startsWith("maxlevel ")) {
                setmaxlevel(msg)
                return true
            } else if(mval == "maxlevel") {
                msg.delete()
                msg.reply(`Maximum level: ${leveljson.settings.maxLevel}`)
                return true
            }
        }
        return false
    }
}

function setLevelMultiplier(msg) {
    msg.delete()
    let content = msg.content.substring(16).trimLeft()
    if(isNaN(content)) {
        msg.reply("Please enter only number")
        return
    }
    if(content < 1) {
        msg.reply("It can be set to at least 1!")
        return
    }

    leveljson.settings.levelMultiplier = parseInt(content)
    corejs.saveJSON("./jsonbase/level.json",leveljson)
    msg.reply("Level multiplier updated successfully!")
}

function setexppermsg(msg) {
    msg.delete()
    let content = msg.content.substring(10).trimLeft()
    if(isNaN(content)) {
        msg.reply("Please enter only number")
        return
    }
    if(content < 1) {
        msg.reply("It can be set to at least 1!")
        return
    }

    leveljson.settings.expPerMsg = parseInt(content)
    corejs.saveJSON("./jsonbase/level.json",leveljson)
    msg.reply("Experience per message amount updated successfully!")
}

function setmaxlevel(msg) {
    msg.delete()
    let content = msg.content.substring(9).trimLeft()
    if(isNaN(content)) {
        msg.reply("Please enter only number")
        return
    }
    if(content < 1) {
        msg.reply("It can be set to at least 1!")
        return
    }

    leveljson.settings.maxLevel = parseInt(content)
    corejs.saveJSON("./jsonbase/level.json",leveljson)
    msg.reply("Maximum level updated successfully!")
}