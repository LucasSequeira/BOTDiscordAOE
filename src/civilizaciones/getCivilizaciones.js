const axios = require('axios');
const cheerio = require('cheerio');

exports.getCivilizaciones = async () => {
    const pageContent = await axios.get('https://ageofempires.fandom.com/es/wiki/Civilizaciones_de_Age_of_Empires_II#Resumen');
    const $ = cheerio.load(pageContent.data);

    const nombres = $('#mw-content-text h3').map((_, el) => {
        el = $(el);
        const span = el.find('span');
        const nombreCivi = span.find('a').html();

        return nombreCivi
    }).get()

    const info = $('#mw-content-text div.tabber').map((_, el) => {
        el = $(el);
        const div = el.find('div.tabbertab').attr('title','Resumen');
        const ul = div.find('ul');
        const li = ul.find('li').each(function(i, elem) {

            let especialidad;

            if (i == 1) {
                console.log(elem.children[2].data)
            }

            return {especialidad}
          });;
        //const li = ul.find('li');
        

        return li
    }).get()


    
    return "s";
}
