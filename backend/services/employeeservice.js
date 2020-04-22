//const bcrypt = require('bcrypt')
//const jwt = require("jsonwebtoken");
const Employee = require("../models/employee")
//const passport = require("passport")
//const Language = require("../models/language")

const { ipcMain } = require('electron')

/*signToken = user => {
  return jwt.sign({
      iss: 'mttcsp-client-backend',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.JWT_SECRET);

}
*/

ipcMain.on('async-employee-create', (event, arg) => {
  /*console.log(arg)
  console.log("------------------------")
  console.log("event: ")
  console.log(event)
  console.log("------------------------")*/
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

/*exports.createEmployee = (data) => {
  console.log(data)
  const employee = new Employee({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    address: data.address,
    city: data.city,
    country: data.country,
    zip: data.zip,
    languages: data.languages,
    profilePic: data.profilePic,
    role: data.role
  });

  employee.save().then(result => {
    console.log("New employee saved: " + result);
  }).catch(err => {
    console.log(err.message)
  })
}*/


/*
exports.userLogin = (req, res)=>{
  const token = signToken(req.user);
    res.status(200).json({token})
}
*/
/*
exports.userProfile = (req, res) => {
  res.json({user: req.user})
}
*/

exports.updateProfile = (req,res) => {
  const employee = new Employee({
      _id: req.params.id,
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
  })
  console.log(employee)
  Employee.update({_id: req.params.id}, employee).then(result => {
      console.log(result)
      if(result.n > 0){
          res.status(200).json({message:'Update successful'})
      } else {
          res.status(401).json({message: "Unauthorized"})
      }
  }).catch(error => {
      res.status(500).json({
          message: error.message
      })

  })
}

ipcMain.on('async-employee-update', (event, arg) => {
  const employee = new Employee({
      _id: arg.id,
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
  })
  console.log(employee)
  Employee.update({_id: arg.id}, employee).then(result => {
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
  Employee.find(arg.id).then(result => {
    //console.log(result)
    event.reply('async-employee-get-by-id-reply', result);
  }).catch(error => {
    event.reply('async-employee-get-by-id-reply', error.message);
  })
})
