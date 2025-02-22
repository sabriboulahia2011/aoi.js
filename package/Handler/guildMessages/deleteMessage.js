const Interpreter = require("../../interpreter.js")
module.exports = async (dmsg,client) =>{
    const data = {}
    Object.assign(data,dmsg) 
let chan ;

if(!data.partial && client.user.id === data?.author.id) return ;
for(const cmd of client.cmd.messageDelete.allValues()){
    if(cmd.channel?.includes("$")){
    const id = await Interpreter(client,data,[],{command:"channelParser",code:cmd.channel}, client.db, true)
  let channel = client.channels.cache.get(id) 
  if(!channel) channel = dmsg.channel
  chan = channel 
}
    else{data.channel = cmd.channel}
    if(!data.guild) data.guild = dmsg.guild||dmsg.channel?.guild 
    await Interpreter(client,data,data?.content?.split(" "),cmd, client.db,false,dmsg.channel?.id,{},chan)

}
    
}