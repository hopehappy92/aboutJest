// prettier를 설치해야지 동작함
// test option [-u]로 업데이트 가능

const snapshot = require("./src/snapshot");

test("repeats words three times inline", () => {
  expect(snapshot.repeat("Test", 3)).toMatchInlineSnapshot(`"Test,Test,Test"`);
});

test("repeats words threee times file", () => {
  expect(snapshot.repeat("Test", 3)).toMatchSnapshot();
});
