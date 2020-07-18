const Discord = require('discord.js');
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

// Create an event listener for messages
client.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === ':miavatar') {
        // Send the user's avatar URL
        message.reply(message.author.displayAvatarURL());
    }
});

// Obtener nomber de todas las civilizaciones
client.on('message', msg => {
    if (msg.content.trim().toUpperCase().search(':CIVI') === 0) {
        msg.delete();
        const civiUser = msg.content.trim().toUpperCase().split(':CIVI ');

        if (civiUser.length > 1) {

            if (civiUser[1].trim() !== '') {
                
                const civi = civilizaciones.filter(civi => (civi.Nombre.toUpperCase() === civiUser[1].toUpperCase().trim()) )
                
                if (civi.length === 0) {
                    msg.channel.send(`*No se encontro civilizacion* **${civiUser[1]}** \n*Para ver todas las civilizaciones escribri* **:civi**`);
                } else {
                    msg.channel.send(`**${civi[0].Nombre}** :${civi[0].emoji}:\nEspecialidad: *${civi[0].Especialidad}*\nBonificacion:\n- *${civi[0].CiviBonus.join(`*\n- *`)}*\nTeam bonus: *${civi[0].TeamBonus}*`)
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