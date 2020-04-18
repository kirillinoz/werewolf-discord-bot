module.exports = {
    name: 'couple',
    description: 'Pairs two players!',
    execute(message, args, personChannelMap, personRoleMap){
        if(!args[1] || !args[2] || !args[3]){
            message.channel.send("One of the arguments is missing! (channel player player)");
            return;
        }
        if(personRoleMap.get(args[2]) == null || personRoleMap.get(args[3]) == null){
            message.channel.send("The player IDs you mentioned don't have a role in the game!");
            return;
        }
        if(!message.guild.channels.resolve(args[1])){
            message.channel.send("The channel ID you mentioned doesn't exist on your server!");
            return;
        }

        //Variables
        const channelID = args[1];
        const playerID1 = args[2];
        const playerID2 = args[3];

        personChannelMap.set(playerID1, channelID);
        personChannelMap.set(playerID2, channelID);

        for(const [key, value] of personChannelMap){
            const specific_channelID = value;
            const specific_channel = message.guild.channels.resolve(specific_channelID);
            specific_channel
            .updateOverwrite(message.guild.members.resolve(key), {
                   VIEW_CHANNEL: true
            });
        }
     
        message.channel.send("**" + message.guild.members.resolve(playerID1).displayName + "** and **" + message.guild.members.resolve(playerID2).displayName + "** are now paired!");
        message.guild.channels.resolve(channelID).send("<@" + playerID1 + "> und <@" + playerID2 + ">, ihr seid jetzt ein Pärchen! Ihr müsst euch gegenseitig beschützen!");
    }
}