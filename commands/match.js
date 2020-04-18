module.exports = {
    name: 'match',
    description: 'Match a role to a channel!',
    execute(message, args, roleChannelMap, channelSendMap, channelShowMap){
        //Check for the arguments
        if(!args[1] || !args[2] || !args[3]){
            message.channel.send("You need to mention the role, role messaging state (true/false) and can the role be shown in the channel (true/false)!")
            return;
        }
        const channelID = message.channel.id;
        const role = args[1];
        const send = args[2];
        const show = args[3];
        if(args[2] != "true" && args[2] != "false"){
            message.channel.send("The second argument must be a boolean (true/false)!");
            return;
        }
        if(args[3] != "true" && args[3] != "false"){
            message.channel.send("The second argument must be a boolean (true/false)!");
            return;
        }
        roleChannelMap.set(role, channelID);
        channelSendMap.set(channelID, send);
        channelShowMap.set(channelID, show);
        message.channel.send("This Channel is assigned to **" + role + "**, messaging state: **" + send + "**, visual state: **" + show + "**");
    }

}