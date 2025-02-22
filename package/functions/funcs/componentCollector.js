module.exports = async d =>{ 
    const code = d.command.code 
    const inside = d.unpack() 
    const err = d.inside(inside) 
    if (err) return d.error(err) 
//----------------------------------------//
    let [messageID,filter,time,customIDs,cmds,errorMsg={}, endcommand="", awaitData={}] = inside.splits 
 time = require('ms')(time) 
if(!time) return d.error(`${d.func}:Invalid Time provided in ${inside}`) 
errorMsg = JSON.parse(errorMsg)
awaitData = JSON.parse(awaitData)
cmds = cmds.split(",") 
 cmds.forEach(x=>{
if(d.client.cmd.awaited.find(y=>y.name === x)){}
     else{d.error(`${d.func}:Could not find awaitedCommand ${x}`)} 
     })
 customIDs = customIDs.split(",") 
//---------------------------------------//

const button = new d.client.interactionManager.ComponentCollector(messageID,filter,time,customIDs,cmds,errorMsg.split(","),d.client)
const endcmd = d.client.cmd.awaited.find(x=>x.name === endcommand);

//---------------------------------------//
 d.client.interactionManager.on("messageComponentInteraction",async data=>{ 
     console.log("buttonclick event working")
button.start(data.message.id,data.author.id,data.customId,data)
 }
     )
 button.on("ItemFound",async data =>{
     const cmd =d.client.cmd.awaited.find(x=>x.name === cmds[customIDs.indexOf(data.customId)])
     if(!cmd) return ;
     await d.interpreter (d.client,
                        {
         author:data.author,
         message:data.message,
         channel:data.channel,
         guild:data.guild,
         member:data.member,
         client:d.client
     },
                        [],
                        cmd,
                        undefined,
                        undefined,
                        undefined,
                        {
         interaction:data,
         awaitData:awaitData 
     }
     )
 })
 if(endcommand!== ""){
     button.once("CustomCollectorOff",async data =>{await d.interpreter (d.client,
                        {
         
     },
                        [],
                        endcmd,
                        undefined,
                        undefined,
                        undefined,
                        {
         interaction :data[data.length-1] ,
         endData:data,
         awaitData:awaitData 
     }
     )})
 }
    return {
        code: code.replaceLast(`$componentCollector${inside}`,"")
    }
    
}
