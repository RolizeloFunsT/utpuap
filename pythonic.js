const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login(process.env.token);
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);

//UPTİME

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//OYNUYOR KISMI

client.on("ready", () => {
  console.log("Bot Aktif");
  let playing = client.voice.connections.size;

  client.user.setStatus('online') 
   client.user.setActivity(`BeeCode`);
  client.user.setPresence({
    activity: {
      name: "BeeCode",
      type: "WATCHING",
      url: "Code My Life"
    }
  });
});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

//embed hazırlıkları

const help = new discord.MessageEmbed()
.setFooter("BeeCode")
.setColor("RED")
.setDescription(`Selamlar, botunu uptime etmeye hazırmısın? \n artık kolay bir şekilde botunu 7/24 aktif edebilirsin! \n\n <a:hdclappartyKopya:796077824083099749> Uptime almak için \`!ekle [glitch linki]\` yazabilirsin \n<a:kraltaKopya:796077831616069722> Uptime ettiğin botlarımı görmek istiyorsun \`!göster\` `)
.setImage('https://cdn.discordapp.com/attachments/581567798715613194/796064308655947846/beecode.gif')







client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
             return message.channel.send(new discord.MessageEmbed().setFooter("BeeCode - uptime").setColor("RED").setDescription("<a:YanpSnennleGifKopya:796077798255099965> Zaten Eklenmiş!"));
        message.channel.send(new discord.MessageEmbed().setFooter("BeeCode - uptime").setColor("RED").setDescription("<a:evetKopya:796077825122631769> Başarılı!"));
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(new discord.MessageEmbed().setFooter("BeeCode - uptime").setColor("RED").setDescription("Lütfen Bir Link Giriniz"));
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!göster") {
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("BeeCode - uptime").setColor("RED").setDescription(`${db.get("linkler").length} Proje Aktif Tutuluyor!`));
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!yardım") {
    var link = spl[1];
    message.channel.send(help);
  }
});
