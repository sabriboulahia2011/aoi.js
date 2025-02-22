const Interpreter = require('../../interpreter.js')
module.exports = async (client)=>{
const cmds = client.cmd.loop.allValues()
let chan;
let data = {
client:client
}
for(const cmd of cmds){
    if(cmd.channel?.includes("$")){
        const id = (await Interpreter(client,data,[],{name:"ChannelParser",code:cmd.channel},client.db,true)).code 
        chan = client.channels.cache.get(id)
        data.channel = chan 
        data.guild = chan?.guild 
    }
    await Interpreter(client,data,[],cmd, client.db,false,chan?.id,{},chan)
}
}