// import data from "./data";

const data = require("./data")

module.exports = {
    findAll() {
        return data.users
    },

    create(user) {
        data.users.push(user)
    },

    destroy(id) {
        data.users.splice(
            data.users.findIndex(user => user.id === id)
        )
    },

    update(id, user) {
        data.users[data.users.findIndex(user => user.id === id)] = user
    }
}


// --------------------------------------------------------- mocking example
const axios = require('axios')
const API_ENDPOINT = "https://jsonplaceholder.typicode.com"

module.exports = {
    findOne(id) {
        return axios
            .get(`${API_ENDPOINT}/users/${id}`)
            .then((response) => response.data)
    }
}


// --------------------------------------------------------- mocking module example
// import { sendEmail, sendSMS } from "./src/messageService"

// const sendEmail = require('./messageService').sendEmail
// const sendSMS = require('./messageService').sendSMS

// module.exports = {
//     register(user) {
//         const message = "회원가입을 축하합니다."
//         sendEmail(user.email, message)
//         sendSMS(user.phone, message)
//     },

//     deregister(user) {
//         const message = "탈퇴 처리 되었습니다."
//         sendEmail(user.email, message)
//         sendSMS(user.phone, message)
//     }
// }