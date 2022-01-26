const Discord = require("discord.js")

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] })

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  if (msg.content.startsWith("+")){
    spl = msg.content.split(" ");
    cmd = spl[0];
    args = spl.filter(function(value,index,arr){return index>0;});

    args.forEach(function(i){
      console.log(i);
    });

    if(cmd === "+mv"){
      msg.channel.messages.fetch(args[0]).then(
        msg1 => client.channels.fetch(process.env.CHANNEL)
          .then(channel => {
            channel.send(msg1.content); 
            msg1.delete()
          })
      );
    }

    if(cmd === "+mv-all-link-before"){

      msg.channel.messages.fetch({ limit: 100 , before: args[0]}).then(messages => {
        messages.filter(el => el.content.startsWith("http")).forEach(message =>
        
        {
          msg.channel.send("+mv "+message.id).then(
            sent => sent.delete()
          )
        })
      });
    }

    if(cmd === "+del-bot-before"){

      msg.channel.messages.fetch({ limit: 100 , before: args[0]}).then(messages => {
        messages.filter(el => el.author.bot).forEach(message => 
        message.delete()
        /*
        {
          msg.channel.send("+mv "+message.id).then(
            sent => sent.delete()
          )
        }*/)
      });
    }
  }
})

client.login(process.env.TOKEN)