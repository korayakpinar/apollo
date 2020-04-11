//#region require

const serverjson = require("../../jsonbase/server.json")
const fs = require("fs")

//#endregion

module.exports = {
    process: function(msg) {
        mval = msg.content.substring(1).toLowerCase()
        if(mval == "admins") {
            admins(msg.channel)
        } else if(mval.startsWith("setadmin ")) {
            setadmin(msg,mval)
        } else if(mval.startsWith("removeadmin ")) {
            removeadmin(msg,mval)
        } else if(mval.startsWith("isadmin ")) {
            cache = mval.substring(11)
            cache = cache.substring(0,cache.length-1)
            msg.channel.send("<@!" + cache + "> is " + (isadmin(cache) ? "admin!" : "not admin!"))
        } else if (mval.startsWith("write ")) {
            msg.delete()
            cache = mval.substring(6)
            msg.channel.send(cache)
        } else {
            msg.channel.send("Hmm, this command is not defined!");
        }
    }
}

function isadmin(id) {
    return serverjson.admins.indexOf(id) != -1
}

function setadmin(msg,mval) {
    msg.delete()
    cache = mval.substring(12)
    cache = cache.substring(0,cache.length-1)
    if(isadmin(cache) == true) {
        msg.channel.send("<@!" + cache + "> already is admin!")
        return
    }
    serverjson.admins.push(cache)
    jsonval = JSON.stringify(serverjson)
    fs.writeFile("./jsonbase/server.json",jsonval,(err) => { })
    msg.channel.send("<@!" + cache + "> setted admin!")
}

function removeadmin(msg,mval) {
    msg.delete()
    cache = mval.substring(12)
    cache = cache.substring(3,cache.length-1)
    if(isadmin(cache) == false) {
        msg.channel.send("<@!" + cache + "> already is not admin!")
        return
    }
    delete serverjson.admins.pop(cache)
    jsonval = JSON.stringify(serverjson)
    fs.writeFile("./jsonbase/server.json",jsonval,(err) => { })
    msg.channel.send("<@!" + cache + "> removed from admins!")
}

function admins(channel) {
    let val = ""
    all = serverjson.admins.forEach((key) => {
        val += "<@!" + key + ">\n"
    })
    channel.send(val)
}