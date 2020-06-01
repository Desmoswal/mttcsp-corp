const Job = require("../models/job")

const {ipcMain} = require('electron')

const fs = require('fs')
const Path = require('path');

const google = require('./googleservice')

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
    completionDate: arg.completionDate,
    reviewBy: element.reviewBy
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
        completionDate: element.completionDate,
        reviewBy: element.reviewBy
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

ipcMain.on('async-job-get-by-employee', (event, arg)=> {
  const jobList = [];
  Job.find({employeeId: arg.employeeId}).then(result => {
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
        completionDate: element.completionDate,
        reviewBy: element.reviewBy
      }
      jobList.push(job);
    });
    event.reply('async-job-get-by-employee-reply', jobList);
  }).catch(error => {
    event.reply('async-job-get-by-employee-reply', error.message)
  })
})

ipcMain.on('async-job-get-available', (event, arg) => {
  const jobList = [];
  Job.find({status: "CREATED"}).then(result => {
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
        completionDate: element.completionDate,
        reviewBy: element.reviewBy
      }
      jobList.push(job);
    });
    event.reply('async-job-get-available-reply', jobList);
  }).catch(error => {
    event.reply('async-job-get-available-reply', error.message)
  })
})

ipcMain.on('async-job-get-employee-history', (event, arg) => {
  const jobList = [];
  Job.find({status: "DONE", employeeId: arg.employeeId}).then(result => {
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
        completionDate: element.completionDate,
        reviewBy: element.reviewBy
      }
      jobList.push(job);
    });
    console.log(jobList)
    event.reply('async-job-get-employee-history-reply', jobList);
  }).catch(error => {
    event.reply('async-job-get-employee-history-reply', error.message)
  })
})

ipcMain.on('async-job-get-review', (event, arg) => {
  console.log('Getting reviews')
  const jobList =[];
  Job.find({status: "REVIEW"}).then(result => {
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
        completionDate: element.completionDate,
        reviewBy: element.reviewBy
      }
      console.log(job)
      jobList.push(job);
    });
    event.reply('async-job-get-review-reply', jobList);
  }).catch(error => {
    event.reply('async-job-get-review-reply', error.message);
  })
})

ipcMain.on('async-job-create-directory', (event, arg)=> {
  const jobId = arg.jobId;
  var dir = './workspace/' + jobId;

  try {
    if(!fs.existsSync('./workspace')){
      fs.mkdirSync('./workspace')
    }
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      event.reply('async-job-create-directory', error.message)
    }
  } catch (error) {
    event.reply('async-job-create-directory', error.message)
  }
})

ipcMain.on('async-job-delete-files', (event,arg)=> {
  const dir = './workspace/'+arg.jobId
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file, index) => {
      const curPath = Path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    setTimeout(()=> {
      fs.rmdirSync(dir);
    }, 3000)
    event.reply('async-job-delete-files-reply', 'Files deleted')
  }
})

ipcMain.on('async-job-get-files', (event,arg)=> {
  google.listFiles(arg.jobFolder).then(files => {
    files.forEach(file => {
      google.downloadFile(file.name).then(
        console.log("done downloading")
        ).catch(err => {
          event.reply('async-job-get-files-reply', err.message)
          return;
        })
    })
    event.reply('async-job-get-files-reply', 'Files downloaded successfully')
  }).catch(err => {
    event.reply('async-job-get-files-reply', err.message)
  })

})


ipcMain.on('async-job-upload-file', (event,arg)=> {
  const path = './workspace/' + arg.folder + '/' /*+ arg.file*/

  if(fs.existsSync(path)){
    fs.readdirSync(path).forEach(file => {
      if(!file.startsWith('original')){
        fs.readFile(path + file, function(err, data) {
          console.log(file)
          if (err) throw err;
          console.log(data);
          google.uploadFile(data, arg.folder, file)
        });
      }
    })
  }
  event.reply('async-job-upload-file-reply', 'File uploaded successfully')
})
