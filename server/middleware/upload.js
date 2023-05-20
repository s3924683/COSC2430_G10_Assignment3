/*
RMIT University Vietnam
 Course: COSC2430 Web Programming
 Semester: 2023A
 Assessment: Assignment 2
 Author: Group 10
 Acknowledgement: Acknowledge the resources that you use here.
*/

const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: 1024 * 1024 * 2 })
module.exports = upload