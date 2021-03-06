//#region require

const serverjson = require("../../jsonbase/server.json")
const corejs = require("./core.js")

//#endregion

module.exports = {
    process: function(msg) {
        if(serverjson.settings.inviteLinkProtection) {
            if(corejs.isInviteLink(msg.content)) {
                msg.delete()
                msg.reply(corejs.generateEmbedWarnMsg(msg,"Warning",
                    "Ups, you've got invite link protection, please follow the rules!"))
                return true
            }
        } else if(serverjson.settings.bannedWordProtection && !corejs.isnsfwch(msg.channel.id)) {
            for(let key of serverjson.values.bannedWords) {
                if(msg.content.toLowerCase().includes(key)) {
                    msg.delete()
                    msg.reply(corejs.generateEmbedWarnMsg(msg,"Warning",
                        "Ups, you've got banned word protection, please follow the rules!"))
                    return true
                }
            }
        }

        return false
    }
}
