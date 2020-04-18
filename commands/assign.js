module.exports = {
    name: 'assign',
    description: 'Assigns randomly roles to members in the voice chat!',
    execute(message, args, roleChannelMap, channelSendMap, personChannelMap, personRoleMap, Discord, channelShowMap){

        //Arrays
        const roles = [];
        
        //Variables
        const voiceChannel = message.member.voice.channel;

        //Check that there is at least one argument
        if(!args[1]){
               message.channel.send("You need to mention the roles!");
               return;
        }

        //Check that the sender is in a voice channel
        if(!voiceChannel){
               message.channel.send("You must be in a channel to use this command!");
               return;
        }

        //Clear these maps
        for(const [key] of personRoleMap){
               personRoleMap.delete(key);
        }
        for(const [key] of personChannelMap){
               personChannelMap.delete(key);
        }

        //Create an array with all the roles mentioned
        //Loop through all the arguments appart from args[0]
        for(let i = 1; i < args.length; i++){
               //Split the argument into role and amount
               let roleArgs = args[i].split("=");
               //Check if one of the roles has no channel assigned
               if(!roleChannelMap.has(roleArgs[0])){
                     message.channel.send("The role **" + roleArgs[0] + "** has yet no channel assigned!");
                     return;
               }
               //If there is no amount mentioned
               if(!roleArgs[1]){
                      //Add the role only one time
                      roles.push(roleArgs[0]);
               }else{
                      //Add the role multiple (amount) times
                      for(var e = 0; e < roleArgs[1]; e++){
                             roles.push(roleArgs[0]);
                      }
               }
        }

        //Check if there are roles missing
        if(voiceChannel.members.size - 1 > roles.length){
               message.channel.send("Less roles than members (not counting you) in the voice chat!");
               roles.length = 0;
               return;
        //Check if there are too many roles
        }else if(voiceChannel.members.size - 1 < roles.length){
               message.channel.send("More roles than members (not counting you) in the voice chat!");
               roles.length = 0;
               return;
        }
        //Shuffle roles
        newRoles = shuffle(roles);

        //Create a HashMap with each person and a role
        i=0;
        for(const [memberID, member] of voiceChannel.members){
               if(!(member.id === message.member.id)){
                      personRoleMap.set(member.id, newRoles[i]);
                      message.channel.send('Name: ' + member.displayName + ', ID: ' + member + ', Rolle: ' + personRoleMap.get(member.id));
                      i++;
               }
        }

        //Clear arrays
        roles.length = 0;
        newRoles.length = 0;

        //Get every member their channel permissions
        for(const [memberID, member] of voiceChannel.members){
               if(!(member.id === message.member.id)){
                      
                     const specific_channelID = roleChannelMap.get(personRoleMap.get(member.id));
                     const specific_channel = message.guild.channels.resolve(specific_channelID);
                     if(channelSendMap.get(specific_channelID) === "true"){
                            specific_channel
                            .updateOverwrite(message.guild.members.resolve(member.id), {
                                   VIEW_CHANNEL: true,
                                   SEND_MESSAGES: true
                            });
                     }else{
                            specific_channel
                            .updateOverwrite(message.guild.members.resolve(member.id), {
                                   VIEW_CHANNEL: true
                            });
                     }                             
                      
               }
        }

              for(const [role, channelID] of roleChannelMap){
                     let players = [];
                     if(channelShowMap.get(channelID) === "true"){
                            for (let [player, Role] of personRoleMap){
                                   if(Role === role){
                                       players.push(message.guild.members.resolve(player).displayName);
                                   }
                               }
                               const playersS = players.join(", ");
                               const embed = new Discord.MessageEmbed()
                                  .setColor('#ffffff')
                                  .setTitle('WVD: Neue Runde!')
                                  .setThumbnail("https://cdn.discordapp.com/app-icons/698810510665056338/ddc2d2eb03a0c659a3bd59d78f3d8c5c.png?size=256")
                                  .setAuthor("WVD Helper")
                                  .setFooter("Bot made by Inkuantum",  "https://cdn.discordapp.com/avatars/410110198108127233/7347a719a31010ec630c1da701afeed6.png?size=128")
                                  .addFields(
                                         {name: "Rolle:", value: role},
                                         {name: "Spieler mit dieser Rolle:", value: playersS}
                                  );
                                  message.guild.channels.resolve(channelID).send(embed);
                     }
              }
       
       }
}

//Shuffle algorithm
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}