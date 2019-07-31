var request = require("request");

describe("get messages", () => {
  it("should return 200 OK", (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  it("should return a list, that is not empty", (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
      expect(JSON.parse(res.body).length).toBeGreaterThan(0);
      done();
    });
  });
});
describe("get messages from user", () => {
  it("should return 200 OK", (done) => {
    request.get("http://localhost:3000/messages/tim", (err, res) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
  it("name should be Tim", () => {
    request.get("http://localhost:3000/messages/tim", (err, res) => {
      expect(JSON.parse(res.body)[0].name).toEqual("tim");
      done();
    });
  });
});
