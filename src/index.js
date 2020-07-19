require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs')

const client = new Discord.Client();

// Obtengo los comandos
const {cmd_help,cmd_civi_notfound,cmd_civi_success,cmd_civi_list} = require("./comandos")

// Obtengo las civilizaciones
const jsonString = fs.readFileSync('src/civilizaciones/civilizacion.json','utf-8')
const civilizaciones = JSON.parse(jsonString)

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: 'AGE 24/7' }, status: 'dnd'})
  client.user.setUsername('Eishbot')
  //await client.user.setAvatar('./src/img/monje.png')
});

// Obtener nomber de todas las civilizaciones
client.on('message', msg => {
    // Comandos /help
    if (msg.content.toUpperCase() === '/HELP') {
        msg.delete();
        msg.channel.send(cmd_help);
        return;
    }
    // Comandos /civi || /civi NOMBRE
    if (msg.content.trim().toUpperCase().search('/CIVI') === 0) {
        msg.delete();
        const civiUser = msg.content.trim().toUpperCase().split('/CIVI ');
        // Comando /civi
        if (civiUser.length === 1) {
            msg.channel.send(cmd_civi_list(civilizaciones));
            return;
        }
        const civi = civilizaciones.filter(civi => (civi.Nombre.toUpperCase() === civiUser[1].toUpperCase().trim()) )  
        // Civilizacion no encontrada
        if (civi.length === 0) {
            msg.channel.send(cmd_civi_notfound(civiUser[1]));
            return;
        } 
        // Comdando /civi NOMBBRE
        msg.channel.send(cmd_civi_success(civi[0]))
        msg.channel.send(`--------------------`);
        return;
    } 
});

client.login(process.env.TOKEN);