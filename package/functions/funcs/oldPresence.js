const presenceOptions = require("../../util/presenceOptions") 

module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return d.error(err)
    
    const option = Object.keys(presenceOptions).find(opt => opt === inside.inside) 
    
    if (!option) return d.error(`❌ Invalid option in \`$oldPresence${inside}\``) 
    
    const executor = presenceOptions[option].split(";")[1] 
    
    return {
        code: code.replaceLast(`$oldPresence${inside}`, d.data.presence ? eval(`d.data.presence${executor}`) : "")
    }
}
