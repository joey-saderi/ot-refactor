const language = require("../../public/languages/fa.json");

test("Json file parser ", () => {
  expect(language.test).toStrictEqual("تست");
});
