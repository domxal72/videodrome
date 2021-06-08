const fs = require('fs')
const path = require('path')

// const dir = '../assets/temp_img'

function delete_temp_files(dir){
  fs.readdir(dir, (err, files) => {
    files.forEach((file) => {
      if (err) throw err;
      fs.unlink(path.join(dir, file), () => {
        console.log(file + ' deleted')
      })
    })
  })
}

module.exports = delete_temp_files