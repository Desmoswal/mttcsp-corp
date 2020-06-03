const Employee = require("../models/employee")

const { ipcMain } = require('electron')

ipcMain.on('async-employee-create', (event, arg) => {
  const employee = new Employee({
    firstName: arg.firstName,
    lastName: arg.lastName,
    email: arg.email,
    password: arg.password,
    address: arg.address,
    city: arg.city,
    country: arg.country,
    zip: arg.zip,
    languages: arg.languages,
    profilePic: arg.profilePic,
    role: arg.role
  });

  employee.save().then(result => {
    console.log("New employee saved: " + result);
    event.reply('async-employee-create-reply', result)
  }).catch(err => {
    console.log(err.message)
    event.reply('async-employee-create-reply', err.message)
  })
})

ipcMain.on('async-employee-update', (event, arg) => {
  Employee.update({_id: arg._id}, arg).then(result => {
      console.log(result)
      if(result.n > 0){
          event.reply('async-employee-update-reply', 'Update successful')
      } else {
          event.reply('async-employee-update-reply', 'Could not update employee')
      }
  }).catch(error => {
      event.reply('async-employee-update-reply', error.message)

  })
})

ipcMain.on('async-employee-remove', (event,arg) => {
  Employee.remove({_id: arg.id}).then(result => {
    console.log(result);
    if(result.n > 0){
      event.reply('async-employee-remove-reply', result)
    } else {
      event.reply('async-employee-remove-reply', 'Could not remove employee')
    }
  }).catch(error => {
    event.reply('async-employee-remove-reply', "Error: " + error.message)
  });
})

ipcMain.on('async-employee-get-all', (event, arg) => {
  Employee.find().then(result => {
    const employeeList = [];
    result.forEach(element => {
      const employee = {
        _id: element._id.toString(),
        firstName: element.firstName,
        lastName: element.lastName,
        email: element.email,
        password: element.password,
        address: element.address,
        city: element.city,
        country: element.country,
        zip: element.zip,
        role: element.role,
        profilePic: element.profilePic,
        languages: element.languages
      }
      employeeList.push(employee);
    });
    event.reply('async-employee-get-all-reply', employeeList);
  }).catch(error => {
    event.reply('async-employee-get-all-reply', error.message);
  })
})

ipcMain.on('async-employee-get-by-id', (event, arg) => {
  console.log("ID" + arg.id)
  Employee.find({_id: arg.id}).then(result => {
    const employeeList = []
    result.forEach(element => {
      const employee = {
        _id: element._id.toString(),
        firstName: element.firstName,
        lastName: element.lastName,
        email: element.email,
        password: element.password,
        address: element.address,
        city: element.city,
        country: element.country,
        zip: element.zip,
        role: element.role,
        profilePic: element.profilePic,
        languages: element.languages
      }
      employeeList.push(employee)
    })
    console.log('employeelist')
    console.log(employeeList)
    event.reply('async-employee-get-by-id-reply', employeeList);
  }).catch(error => {
    event.reply('async-employee-get-by-id-reply', error.message);
  })
})
