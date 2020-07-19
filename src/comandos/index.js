
// Comando /help
exports.cmd_help = `Comandos del BOT
**/help**                       *-- Comandos disponibles para interactuar con el Bot.*
**/civi**                         *-- Visualizar el nombre de todas las civilizaciones.*
**/civi [Nombre]**     *-- Visualizar el detalle de una civilizacion.*
        [Nombre]       Ej: *Britanos*`;

// Civilizacion no encontrada
exports.cmd_civi_notfound = (civilizacion) => {
    return `*No se encontro civilizacion* **${civilizacion}** \n*Para ver todas las civilizaciones escribri* **:civi**`;
}

// Comando /civi
exports.cmd_civi_list = (civilizaciones) => {
    return civilizaciones.map(civi => (`**${civi.Nombre}** :${civi.emoji}: *${civi.Especialidad.join(` - `)}*`));
}

// Comando /civi NOMBRE
exports.cmd_civi_success = (civilizacion) => {
    const tecnologia = civilizacion.TecnologiaUnica.map(t => {
        return `${t.Nombre}: ${t.Detalle}`
    })

    return `**${civilizacion.Nombre}** :${civilizacion.emoji}:
Especialidad:
    - *${civilizacion.Especialidad.join(`*\n    - *`)}*
Unidad unica: *${civilizacion.UnidadUnica.Nombre}*
    - *${civilizacion.UnidadUnica.Detalle}*
Tecnologias unicas:
    - *${tecnologia.join(`*\n    - *`)}*
Bonificacion:
    - *${civilizacion.CiviBonus.join(`*\n    - *`)}*
Team bonus:
    - *${civilizacion.TeamBonus.join(`*\n    - *`)}*`
}