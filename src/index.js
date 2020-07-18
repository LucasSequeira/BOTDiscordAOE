const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

const fs = require('fs')

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
    // Comandos de ayuda para ejecutar
    if (msg.content.toUpperCase() === '/HELP') {
        msg.channel.send(`**/help**\t\t\t\t\t\t*-- Comandos disponibles para interactuar con el Bot.*\n**/civi**\t\t\t\t\t\t   *-- Visualizar el nombre de todas las civilizaciones.*\n**/civi [Nombre] **\t*-- Visualizar el detalle de una civilizacion.*\n\t\t  [Nombre] Ej: *Britanos*\n`);
    }

    if (msg.content.trim().toUpperCase().search('/CIVI') === 0) {
        msg.delete();
        const civiUser = msg.content.trim().toUpperCase().split('/CIVI ');

        if (civiUser.length > 1) {

            if (civiUser[1].trim() !== '') {
                
                const civi = civilizaciones.filter(civi => (civi.Nombre.toUpperCase() === civiUser[1].toUpperCase().trim()) )
                
                if (civi.length === 0) {
                    msg.channel.send(`*No se encontro civilizacion* **${civiUser[1]}** \n*Para ver todas las civilizaciones escribri* **:civi**`);
                } else {
                    msg.channel.send(`**${civi[0].Nombre}** :${civi[0].emoji}:\nEspecialidad: *${civi[0].Especialidad}*\nBonificacion:\n\b- *${civi[0].CiviBonus.join(`*\n- *`)}*\nTeam bonus: *${civi[0].TeamBonus}*`)
                }
            } else {
                msg.channel.send(`*Para ver todas las civilizaciones escribri* **:civi**`);
            }

        } else {
            const text = civilizaciones.map(civi => (`**${civi.Nombre}** :${civi.emoji}: *${civi.Especialidad}*`));
            msg.channel.send(text.toString().replace(',','\n'));
        }
        msg.channel.send(`--------------------`);
    } 
  });

client.login(process.env.TOKEN);