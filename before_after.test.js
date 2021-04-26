// import userService from "./src/userService";
// import data from "./src/data";

const userService = require("./src/userService")
const data = require("./src/data")

beforeEach(() => {
    data.users.push(
        {id: 1, email: "user1@test.com"},
        {id: 2, email: "user2@test.com"},
        {id: 3, email: "user3@test.com"}
    )
})

afterEach(() => {
    data.users.splice(0)
})

test("finde all users", () => {
    // data.users.push(
    //     {id: 1, email: "user1@test.com"},
    //     {id: 2, email: "user2@test.com"},
    //     {id: 3, email: "user3@test.com"}
    // )

    const users = userService.findAll()

    expect(users).toHaveLength(3)
    expect(users).toContainEqual({id: 1, email: "user1@test.com"})
    expect(users).toContainEqual({id: 2, email: "user2@test.com"})
    expect(users).toContainEqual({id: 3, email: "user3@test.com"})
})

test("create a user", () => {
    const user = {id: "4", email: "user4@test.com"}

    userService.create(user)

    // expect(data.users).toHaveLength(1)
    expect(data.users).toHaveLength(4)
    expect(data.users).toContainEqual(user)
})

test("destroy a user", () => {
    // data.users.push(
    //     { id: 1, email: "user1@test.com" },
    //     { id: 2, email: "user2@test.com" },
    //     { id: 3, email: "user3@test.com" }
    // )

    const id = 3
    const user = data.users.find(user => user.id === id)

    userService.destroy(id)

    expect(data.users).toHaveLength(2)
    expect(data.users).not.toContainEqual(user)
})


beforeAll(() => {
    console.log("before all test")
})

afterAll(() => {
    console.log('after all test')
})

// test.only("run only", () => {
//     expect(1).toEqual(1)
// })

test.skip("skip", () => {
    expect(1).toEqual(1)
})

describe("group 1", () => {
    test("test 1-1", () => {
        expect('1-1').toEqual('1-1')
    })

    test("test 1-2", () => {
        expect('1-2').toEqual('1-2')
    })
})

describe("group 2", () => {
    it("test 2-1", () => {
        expect('2-1').toEqual('2-1')
    })

    it("test 2-2", () => {
        expect('2-2').toEqual('2-2')
    })
})