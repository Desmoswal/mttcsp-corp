const Language = require('../models/language')

const {ipcMain} = require('electron')


ipcMain.on('async-langauge-get-all', (event, arg) => {
  Language.find().then(result => {
    const languageList = [];
    result.forEach(element => {
      const language = {
        name: element.name,
        short: element.short
      }
      languageList.push(language);
    });
    event.reply('async-langauge-get-all-reply', languageList);
  }).catch(error => {
    event.reply('async-langauge-get-all-reply', error.message);
  })
})
