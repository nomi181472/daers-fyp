import request from "supertest";
import { app } from "../../app";
it("Accessing without login will return a {401} on successfull Unauthorized", async () => {
  return request(app)
  .get("/api-gateway/current-user/user")
  .send()
  .expect(401)

});
