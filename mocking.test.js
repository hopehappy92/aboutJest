const mockFn = jest.fn()

test('mock error == undefined', () => {
    mockFn()
    mockFn(1)
    mockFn("a")
    mockFn([1, 2], { a: "b" })

    expect(1).toEqual(1);
})


test('mock return value', () => {
    mockFn.mockReturnValue("I am a mock!")
    console.log(mockFn())
    
    expect(1).toEqual(1);
})


test('mock resolved value', () => {
    mockFn.mockResolvedValue("I will be a mock")
    mockFn().then((result) => {
        console.log(result)
    })

    expect(1).toEqual(1);
})


test('mock implementation', () => {
    mockFn.mockImplementation((name) => `I am ${name}!`)
    console.log(mockFn("Dale"))

    expect(1).toEqual(1);
})


test('mock to Be Called', () => {
    expect(mockFn).toBeCalledTimes(7) // 앞서 mockFn은 7번 선언됨

    const mockFn2 = jest.fn()  // 앞서 선언된 mockFn를 모두 기억하고있어서 mockFn2생성

    mockFn2("a")
    mockFn2(["b", "c"])

    expect(mockFn2).toBeCalledTimes(2)
    expect(mockFn2).toBeCalledWith("a")
    expect(mockFn2).toBeCalledWith(["b", "c"])
})


test('spy on', () => {
    const calculator = {
        add: (a, b) => a + b,
    }

    const spyFn = jest.spyOn(calculator, "add")

    const result = calculator.add(2, 3)

    expect(spyFn).toBeCalledTimes(1)
    expect(spyFn).toBeCalledWith(2, 3)
    expect(result).toBe(5)
})

// --------------------------------------------------------- mocking example
const axios = require('axios')
const userService = require("./src/userService")

// 실제로 userService에서 userList를 받아오고 test를 함 => test 안에서 user 확인 가능
test("findOne returns a user", async () => {
    const user = await userService.findOne(1)
    expect(user).toHaveProperty("id", 1)
    expect(user).toHaveProperty("name", "Leanne Graham")
})

// API 연동으로 사용자 정보 조회 유무 확인용 (userService에서 userList 받아오지 않음)
test("findOne fetches data from the API endpoint", async () => {
    const spyGet = jest.spyOn(axios, "get")
    await userService.findOne(1)
    expect(spyGet).toBeCalledTimes(1)
    expect(spyGet).toBeCalledWith(`https://jsonplaceholder.typicode.com/users/1`)
})


// 테스트는 deterministic 해야한다. (언제 실행되든 항상 같은 결과를 내야한다.) => 단위 테스트는 단독으로 고립되고 외부환경에 의존하지 않아야 한다.
test("findOne returns what axios get returns", async () => {
    axios.get = jest.fn().mockResolvedValue({
        data: {
            id: 1,
            name: "Dale Seo",
        }
    })

    const user = await userService.findOne(1)
    expect(user).toHaveProperty("id", 1)
    expect(user).toHaveProperty("name", "Dale Seo")
})

