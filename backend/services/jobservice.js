const Job = require("../models/job")

const {ipcMain} = require('electron')

ipcMain.on('async-job-create', (event, arg) => {
  /*console.log(arg)
  console.log("------------------------")
  console.log("event: ")
  console.log(event)
  console.log("------------------------")*/
  const job = new Job({
    firstName: arg.firstName,
    clientId: arg.clientId,
    folder: arg.folder,
    price: arg.price,
    sourceLang: arg.sourceLang,
    reqLang: arg.reqLang,
    status: arg.status,
    employeeId: arg.employeeId,
    creationDate: arg.creationDate,
    startDate: arg.startDate,
    completionDate: arg.completionDate
  });

  job.save().then(result => {
    console.log("New job saved: " + result);
    event.reply('async-job-create-reply', result)
  }).catch(err => {
    console.log(err.message)
    event.reply('async-job-create-reply', err.message)
  })
})

ipcMain.on('async-job-update', (event, arg) => {
  console.log(arg)

  Job.update({_id: arg._id}, arg).then(result => {
      console.log(result)
      if(result.n > 0){
          event.reply('async-job-update-reply', 'Update successful')
      } else {
          event.reply('async-job-update-reply', 'Could not update job')
      }
  }).catch(error => {
      event.reply('async-job-update-reply', error.message)

  })
})

ipcMain.on('async-job-remove', (event,arg) => {
  console.log(arg)
  Job.remove({_id: arg.id}).then(result => {
    console.log(result);
    if(result.n > 0){
      event.reply('async-job-remove-reply', result)
    } else {
      event.reply('async-job-remove-reply', 'Could not remove job')
    }
  }).catch(error => {
    event.reply('async-job-remove-reply', "Error: " + error.message)
  });
})

ipcMain.on('async-job-get-all', (event, arg) => {
  Job.find().then(result => {
    const jobList = [];
    result.forEach(element => {
      const job = {
        _id: element._id.toString(),
        clientId: element.clientId,
        folder: element.folder,
        price: element.price,
        sourceLang: element.sourceLang,
        reqLang: element.reqLang,
        status: element.status,
        employeeId: element.employeeId,
        creationDate: element.creationDate,
        startDate: element.startDate,
        completionDate: element.completionDate
      }
      jobList.push(job);
      console.log(job)
    });
    event.reply('async-job-get-all-reply', jobList);
  }).catch(error => {
    event.reply('async-job-get-all-reply', error.message);
  })
})

ipcMain.on('async-job-get-by-id', (event, arg) => {
  Job.find(arg._id).then(result => {
    //console.log(result)
    event.reply('async-job-get-by-id-reply', result);
  }).catch(error => {
    event.reply('async-job-get-by-id-reply', error.message);
  })
})
