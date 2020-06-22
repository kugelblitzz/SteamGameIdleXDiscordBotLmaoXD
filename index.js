const Discord = require('discord.js');
const bot = new Discord.Client();
const Token = require('./config/config').Token;
const senpai = require('./config/config').Id;
var spawn = require("child_process").spawn,child;

var rawmsg;

bot.on('ready', () =>
{
    console.info(`Logged in as ${bot.user.tag}!`);
    setBotPresence(`Nothing`)
});

bot.on('message', msg =>
{
    rawmsg = msg.content.toLowerCase();

    if(msg.author.bot)
        return;

    if(msg.author.id === senpai && msg.content.startsWith('!idle'))
    {   
        try
        {
            child.stdin.end();
            rawmsg = rawmsg.split('!idle')
            setBotPresence(rawmsg[1])
            StartGameIdle(rawmsg[1])
            msg.channel.send(`IDLING ${rawmsg[1]}`)
        }
        catch
        {
            rawmsg = rawmsg.split('!idle')
            setBotPresence(rawmsg[1])
            StartGameIdle(rawmsg[1])
            msg.channel.send(`IDLING ${rawmsg[1]}`)
        }
        
    }
    if(msg.author.id === senpai && msg.content.startsWith('!dk'))
    {   
        try
        {
            child.stdin.end();
            setBotPresence("Desktop Kanojo")
            StartGameIdle('1284820')
            msg.channel.send(`IDLING Desktop Kanojo`)
        }
        catch
        {
            setBotPresence("Desktop Kanojo")
            StartGameIdle('1284820')
            msg.channel.send(`IDLING Desktop Kanojo`)
        }
    }
    if(msg.author.id === senpai && msg.content.startsWith('!end'))
    {   
        try
        {
            setBotPresence("Nothing")
            child.stdin.end();
            msg.channel.send(`Process Ended!`)
        }
        catch
        {
            setBotPresence("Nothing")
            msg.channel.send(`No Process to End!`)
        }
        
    }
});

bot.login(Token);


function setBotPresence(sauce)
{
    bot.user.setPresence(
    {
        activity: { name: `SimpleIdler : Helping Kugel Senpai Idle ${sauce}` }, status: 'Online'
    })
    .then(console.log).catch(console.error);
}

async function StartGameIdle(gemID)
{
    child = spawn("powershell.exe",[`./SimpleIdler/SimpleIdler.exe ${gemID} TRUE`]);
    child.stdout.on("data",async function(data){
        console.log(data);
    });
    child.stderr.on("data",async function(data){
        console.log(data);
    });
    child.on("exit",async function(){
        console.log("Task Complete");
    });
    //child.stdin.end();
}