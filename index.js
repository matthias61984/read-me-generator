const axios = require('axios');
const inquirer = require('inquirer');
const util = require('util');
const fs = require('fs');
const api = require('./utils/api');

const writeFileAsync = util.promisify(fs.writeFile);

function init() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'gitName',
      message: 'What is your git user name?'
    }
    ]).then(function({ gitName }) {
      axios.get(`https://api.github.com/users/${gitName}`)
      .then(function(response){
        data = { 
          name: response.data.name,
          company: response.data.company
        }
        console.log(response.data);
        writeFileAsync("README.md", data.company);
        console.log("Successfully wrote to README.md");
    });
  })
}
  
init();