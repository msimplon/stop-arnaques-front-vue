// je me suis appuyer sur i18n pour externaliser les libellés. 
// avantages : externaliser les libellés au lieu de le mettre en dur. 
// cela permet de facilier la maintenance quand le vocabulaire change ca va impacter les libellés 

import { createI18n } from 'vue-i18n'
import frMessages from "./fr.js"
import enMessages from "./en.js"

// nous allons appelé cette fonction avec un object d'option et dans cet object on définit 
// les paramètres régionnaux et les messages dans un object avec sa clé et valeur 

const shortDatetimeFormat = {
    year: 'numeric', month: '2-digit', day: '2-digit'
}
const longDatetimeFormat = {
    year: 'numeric', month: 'long', day: 'numeric'
}

const datetimeFormats = {
    'en': {
        short: shortDatetimeFormat,
        long: longDatetimeFormat
    },
    'fr': {
        short: shortDatetimeFormat,
        long: longDatetimeFormat
    }
}
const i18n = createI18n({
    locale: "fr",
    messages: {
        en: enMessages,
        fr: frMessages,
    },
    datetimeFormats,

});

export default i18n;