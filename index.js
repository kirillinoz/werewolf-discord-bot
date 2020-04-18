//Dependecy
const Discord = require('discord.js');
//New Bot
const bot = new Discord.Client();
//Token
const token = 'Njk4ODEwNTEwNjY1MDU2MzM4.XpLTfA.2uPKSQrMqulqOOQ6i4oNriYAv_4'
//Command Prefix
const prefix = 'wvd.';
//
const fs = require('fs');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
       const command = require(`./commands/${file}`);

       bot.commands.set(command.name, command);
}

//Maps
let personRoleMap = new Map();
let roleChannelMap = new Map();
let channelSendMap = new Map();
let channelShowMap = new Map();
let personChannelMap = new Map();

//Start bot
bot.on('ready', () =>{
       //Bot is online
       console.log('This bot is online!');
})

//Commands
bot.on('message', message => {
       //Get all the arguments behind the prefix
       let args = message.content.substring(prefix.length).split(" ");

       //Check for the first argument
       switch(args[0]){
              //Flip the coin
              case 'flip':
                     //Check for admin
                     if (!message.member.hasPermission("ADMINISTRATOR")){
                            message.channel.send("You don't have permission to use this command!");
                            return;
                     }
                     bot.commands.get('flip').execute(message);
              break;

              //Match the channel to the role
              case 'match':
                     //Check for admin
                     if (!message.member.hasPermission("ADMINISTRATOR")){
                            message.channel.send("You don't have permission to use this command!");
                            return;
                     }
                     bot.commands.get('match').execute(message, args, roleChannelMap, channelSendMap, channelShowMap);
              break;
              
              //Assign roles
              case 'assign':
                     //Check for admin
                     if (!message.member.hasPermission("ADMINISTRATOR")){
                            message.channel.send("You don't have permission to use this command!");
                            return;
                     }
                     bot.commands.get('assign').execute(message, args, roleChannelMap, channelSendMap, personChannelMap, personRoleMap, Discord, channelShowMap);
              break;
              
              //Create a couple
              case 'couple':
                     //Check for admin
                     if (!message.member.hasPermission("ADMINISTRATOR")){
                            message.channel.send("You don't have permission to use this command!");
                            return;
                     }
                     bot.commands.get('couple').execute(message, args, personChannelMap, personRoleMap);
              break;
              
              //Reset all the maps and channel permissions
              case 'reset':
                     //Check for admin
                     if (!message.member.hasPermission("ADMINISTRATOR")){
                            message.channel.send("You don't have permission to use this command!");
                            return;
                     }
                     bot.commands.get('reset').execute(message, args, personChannelMap, personRoleMap, roleChannelMap, channelSendMap);
              break;

       }
})

//Bot login
bot.login(token);