module.exports = {

    sendEmail(email, message) {
        console.log('sendEmail', email, message)
    },

    sendSMS(phone, message) {
        console.log('sendSMS', phone, message)
    }
}
// export { sendEmail, sendSMS }