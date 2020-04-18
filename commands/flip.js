module.exports = {
    name: 'flip',
    description: 'Flip a coin!',
    execute(message){
        //Create a random between numbers 0 and 1 only
        var random = Math.floor(Math.random() * 2);
        //nummber = 0
        if (random === 0){
             message.channel.send('Kopf');
        //number = 1
        }else{
            message.channel.send('Zahl');
        }
    }
}