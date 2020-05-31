module.exports = {
    name: 'match',
    description: 'Match a role to a channel!',
    execute(message, args, roleChannelMap, channelSendMap, channelShowMap, config){
        //Check for the arguments
        if(!args[1] || !args[2] || !args[3]){
            message.channel.send(config.error.match_1)
            return;
        }
        const channelID = message.channel.id;
        const role = args[1];
        const send = args[2];
        const show = args[3];
        if(args[2] != "true" && args[2] != "false"){
            message.channel.send(config.error.match_2);
            return;
        }
        if(args[3] != "true" && args[3] != "false"){
            message.channel.send(config.error.match_3);
            return;
        }
        roleChannelMap.set(role, channelID);
        channelSendMap.set(channelID, send);
        channelShowMap.set(channelID, show);
        message.channel.send(config.match.assignement + role + config.match.messaging + send + config.match.visibility + show + config.match.end);
    }

}