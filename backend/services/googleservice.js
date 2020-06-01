const {Storage} = require("@google-cloud/storage")
const util = require('util')

const gc = new Storage({
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILENAME,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
})
let bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME


exports.listFiles = async function (folder) {
  // Lists files in the bucket
  var [files] = await gc.bucket(bucketName).getFiles();

  files = files.filter(file => file.name.startsWith(folder))
  files.forEach(file => {
    console.log(file.name)
  })
  return files
}

exports.downloadFile = async function (file) {
  const options = {
    // The path to which the file should be downloaded, e.g. "./file.txt"
    destination: './workspace/'+ file,
  };

  // Downloads the file
  await gc.bucket(bucketName).file(file).download(options).then(console.log('downloaded')).catch(error=> {console.log(error.message)});

}

exports.uploadFile = async function (file,folder, fileName) {
  const _fileName = fileName.split('_')[1];
  const blob = gc.bucket(bucketName).file(folder+"/" + "translated_" + _fileName);
        const blobStream = blob.createWriteStream({
            resumable: false
        });
        blobStream.on("error", err => {
            console.log(err);
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            publicUrl = util.format(
                `https://storage.googleapis.com/${bucketName}/${blob.name}`
            );

            console.log(publicUrl)

            })
        blobStream.end(file);
}
