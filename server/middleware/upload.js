const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: 1024 * 1024 * 2 })
module.exports = upload