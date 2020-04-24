const Language = require('../models/language')

const {ipcMain} = require('electron')

ipcMain.on('async-language-create', (event,arg) => {
  const language = new Language({
    name: arg.name,
    short: arg.short
  })

  language.save().then(result =>{
    console.log("New language saved: " + result);
    event.reply('async-language-create-reply', result)
  }).catch(error => {
    console.log(error.message)
    event.reply('async-language-create-reply', error.message)
  })
})

ipcMain.on('async-language-update', (event,arg) => {
  console.log('backend' + JSON.stringify(arg))
  Language.updateOne({_id: arg._id}, arg).then(result => {
    if(result.n > 0){
      event.reply('async-language-update-reply', 'Update successful')
  } else {
      event.reply('async-language-update-reply', 'Could not update language')
  }
  }).catch(error => {
  event.reply('async-language-update-reply', error.message)
  })
})

ipcMain.on('async-language-remove', (event,arg) => {
  Language.remove({name: arg}).then(result => {
    if(result.n > 0){
      event.reply('async-language-remove-reply', result)
    } else {
      event.reply('async-language-remove-reply', 'Could not remove language')
    }
  }).catch(error => {
    event.reply('async-language-remove-reply', "Error: " + error.message)
  });
})

ipcMain.on('async-langauge-get-all', (event, arg) => {
  Language.find().then(result => {
    const languageList = [];
    result.forEach(element => {
      const language = {
        _id: element._id.toString(),
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
