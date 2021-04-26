// import { register, deregister } from "./src/userService"
// import * as messageService from "./src/messageService"


// 단일 mock
// const register = require("./src/userService").register
// const deregister = require("./src/userService").deregister
// const messageService = require("./src/messageService")

// messageService.sendEmail = jest.fn()
// messageService.sendSMS = jest.fn()

// const sendEmail = messageService.sendEmail;
// const sendSMS = messageService.sendSMS;


// 멀티 mock
const register = require("./src/userService").register
const deregister = require("./src/userService").deregister
const sendEmail = require("./src/messageService").sendEmail
const sendSMS = require("./src/messageService").sendSMS


jest.mock("./src/messageService") // hoist됨


beforeEach(() => {
    sendEmail.mockClear();
    sendSMS.mockClear();
})

const user = {
    email: "test@email.com",
    phone: "012-345-6789",
}

test("register sends messages", () => {
    register(user)

    expect(sendEmail).toBeCalledTimes(1)
    expect(sendEmail).toBeCalledWith(user.email, "회원가입을 축하합니다.")

    expect(sendSMS).toBeCalledTimes(1)
    expect(sendSMS).toBeCalledWith(user.phone, "회원가입을 축하합니다.")
})

test("deregister sends messages", () => {
    deregister(user)

    expect(sendEmail).toBeCalledTimes(1)
    expect(sendEmail).toBeCalledWith(user.email, "탈퇴 처리 되었습니다.")

    expect(sendSMS).toBeCalledTimes(1)
    expect(sendSMS).toBeCalledWith(user.phone, "탈퇴 처리 되었습니다.")
})


// --------------------- mocking test ( spyon + resolved )
const axios = require("axios")
const userService = require("./src/userService")

jest.mock("axios")

test("findOne fetches data from the API endpoint and returns what axios get returns", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            name: "Dale Seo"
        }
    })

    const user = await userService.findOne(1)

    expect(user).toHaveProperty("id", 1)
    expect(user).toHaveProperty("name", "Dale Seo")
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).toBeCalledWith(`https://jsonplaceholder.typicode.com/users/1`)
})