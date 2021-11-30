module.exports = {
    name: 'reset',
    description: 'Resets all the roles or/and channel settings!',
    execute(message, args, personChannelMap, personRoleMap, roleChannelMap, channelSendMap){
        //Import Text Tools and Config
       const {config} = require("../config");
       
        for(const [key, value] of personChannelMap){
            const specific_channelID = value
            const specific_channel = message.guild.channels.resolve(specific_channelID);
            specific_channel
            .updateOverwrite(message.guild.members.resolve(key), {
                   VIEW_CHANNEL: false
            });
        }
        for(const [key, value] of personRoleMap){
            if(personRoleMap.get(key) != "Dorfbewohner"){
                const specific_channelID = roleChannelMap.get(value);
                const specific_channel = message.guild.channels.resolve(specific_channelID);
                if(channelSendMap.get(specific_channelID) === "true"){
                   specific_channel
                   .updateOverwrite(message.guild.members.resolve(key), {
                          SEND_MESSAGES: false,
                          VIEW_CHANNEL: false
                   });
                }else{
                   specific_channel
                   .updateOverwrite(message.guild.members.resolve(key), {
                          VIEW_CHANNEL: false
                   });
                } 
            }   
        }
        //Clear these hashmaps
        for(const [key] of personRoleMap){
            personRoleMap.delete(key);
        }
        for(const [key] of personChannelMap){
            personChannelMap.delete(key);
        }

        //Check if everything must be cleared?
        if(args[1] != null && args[1] === "all"){

            for(const [key] of channelSendMap){
                   channelSendMap.delete(key);
            }
            for(const [key] of roleChannelMap){
                   roleChannelMap.delete(key);
            }

            message.channel.send(config.reset.permissions + " " + config.reset.setup);
        }else{
            message.channel.send(config.reset.permissions);
        }
    }
}