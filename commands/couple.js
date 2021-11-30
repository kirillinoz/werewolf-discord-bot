module.exports = {
    name: 'couple',
    description: 'Pairs two players!',
    execute(message, args, personChannelMap, personRoleMap){

        //Import Text Tools and Config
       const {config} = require("../config");

        if(!args[1] || !args[2] || !args[3]){
            message.channel.send(config.error.couple_1);
            return;
        }
        if(personRoleMap.get(args[2]) == null || personRoleMap.get(args[3]) == null){
            message.channel.send(config.error.couple_2);
            return;
        }
        if(!message.guild.channels.resolve(args[1])){
            message.channel.send(config.error.couple_3);
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
     
        message.channel.send(config.couple.player_1 + message.guild.members.resolve(playerID1).displayName + config.couple.player_2 + message.guild.members.resolve(playerID2).displayName + config.couple.end);
        message.guild.channels.resolve(channelID).send("<@" + playerID1 + "> & <@" + playerID2 + ">, " + config.couple.notification);
    }
}