
const Discord = require('discord.js')
const mysql = require('mysql')
const MessageHandler = require('./MessageHandler');
const SetupDB = require('./SetupDB');
const client = new Discord.Client()

var bot_secret_token = "NTc4NTI3NTMyNjU2MzYxNDcy.XN1DkA.ICSeoN_23ZsWFm-iRdF9rhEVg-s";

var dbConnect = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Sequre21'
});

dbConnect.connect((err) => { 
  console.log('Connected to the database.');
  SetupDB.Setup(dbConnect);
});


client.on('ready', () => {
    var generalChannel = client.channels.get("578526874230194198"); //general channel. Replace with bot speak
    generalChannel.send("Sign-Bot has joined the party.");
})

client.on('message', (receivedMessage) => {

    if (receivedMessage.author == client.user) { //prevent replying to own messages
        return
    }
    
    var message = receivedMessage.content;
    var channel = receivedMessage.channel;
    var response = "";
    //var response = MessageHandler.HandleMessage(message, dbConnect, client);
     response = MessageHandler.HandleMessage(message, dbConnect, client, channel);
    
    if((response != "") && (response != null))
    {
      receivedMessage.channel.send(response);
    }

})

client.login(bot_secret_token);




