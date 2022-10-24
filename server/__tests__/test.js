const request = require("supertest");
const app = require("../app");
const { User, Bookmark } = require("../models");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { sign } = require("jsonwebtoken");

let access_token;

beforeAll(async () => {
  const users = [
    {
      username: "John Doe",
      email: "johndoe@mail.com",
      password: hashPassword("johndoe"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const bookmarks = [
    {
      UserId: 1,
      url: "google.com/1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 1,
      url: "google.com/2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await queryInterface
    .bulkInsert("Users", users)
    .then(() => {
      return User.findOne({
        where: {
          email: users[0].email,
        },
      });
    })
    .then((result) => {
      access_token = signToken({
        id: result.UserId,
        username: result.username,
      });
    });
  await queryInterface.bulkInsert("Bookmarks", bookmarks);

  access_token = signToken({
    id: 1,
    username: "John Doe",
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Bookmarks", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

// Test cases
describe("POST /users/register", () => {
  test("POST /users/register - success test", async () => {
    const payload = {
      username: "jester",
      email: "jester@mail.com",
      password: "jester",
    };
    const response = await request(app).post("/users/register").send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
    expect(response.body).toHaveProperty(
      "loggedInUsername",
      expect.any(String)
    );
  });

  test("POST /users/register - failed test - username must be unique", async () => {
    const payload = {
      username: "jester",
      email: "jester2@mail.com",
      password: "jester2",
    };
    const response = await request(app).post("/users/register").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Username must be unique");
  });

  test("POST /users/register - failed test - email must be unique", async () => {
    const payload = {
      username: "jester2",
      email: "jester@mail.com",
      password: "jester2",
    };
    const response = await request(app).post("/users/register").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email must be unique");
  });

  test("POST /users/register - failed test - Username is required", async () => {
    const payload = {
      username: "",
      email: "jester3@mail.com",
      password: "jester3",
    };
    const response = await request(app).post("/users/register").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Username is required");
  });

  test("POST /users/register - failed test - Email is required", async () => {
    const payload = {
      username: "jester3",
      email: "",
      password: "jester3",
    };
    const response = await request(app).post("/users/register").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("POST /users/register - failed test - Password is required", async () => {
    const payload = {
      username: "jester3",
      email: "jester3@mail.com",
      password: "",
    };
    const response = await request(app).post("/users/register").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  test("POST /users/register - failed test - Username length < 5 characters", async () => {
    const payload = {
      username: "test",
      email: "test@mail.com",
      password: "test1",
    };
    const response = await request(app).post("/users/register").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Minimum username is 5 characters"
    );
  });

  test("POST /users/register - failed test - Password length < 5 characters", async () => {
    const payload = {
      username: "test1",
      email: "test@mail.com",
      password: "test",
    };
    const response = await request(app).post("/users/register").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Minimum password is 5 characters"
    );
  });

  test("POST /users/register - failed test - Invalid email format", async () => {
    const payload = {
      username: "test1",
      email: "testmail.com",
      password: "test1",
    };
    const response = await request(app).post("/users/register").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email must be valid");
  });
});

describe("POST /users/login", () => {
  test("POST /users/login - success test", async () => {
    const payload = {
      email: "johndoe@mail.com",
      password: "johndoe",
    };
    const response = await request(app).post("/users/login").send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
    expect(response.body).toHaveProperty(
      "loggedInUsername",
      expect.any(String)
    );
  });

  test("POST /users/login - failed test - Email is required", async () => {
    const payload = {
      email: "",
      password: "johndoe",
    };
    const response = await request(app).post("/users/login").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("POST /users/login - failed test - Password is required", async () => {
    const payload = {
      email: "johndoe@mail.com",
      password: "",
    };
    const response = await request(app).post("/users/login").send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  test("POST /users/login - failed test - Wrong email", async () => {
    const payload = {
      email: "johndoee@mail.com",
      password: "johndoe",
    };
    const response = await request(app).post("/users/login").send(payload);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });

  test("POST /users/login - failed test - Wrong password", async () => {
    const payload = {
      email: "johndoe@mail.com",
      password: "johndoee",
    };
    const response = await request(app).post("/users/login").send(payload);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe("POST /users/bookmark", () => {
  test("POST /users/bookmark - success test", async () => {
    const response = await request(app)
      .post("/users/bookmark")
      .set("access_token", access_token)
      .send({
        UserId: 1,
        url: "google.com/news/1",
      });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Bookmark successfuly added"
    );
  });

  test("POST /users/bookmark - failed test - News already bookmarked", async () => {
    const response = await request(app)
      .post("/users/bookmark")
      .set("access_token", access_token)
      .send({
        UserId: 1,
        url: "google.com/1",
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "You already bookmark this news"
    );
  });

  test("POST /users/bookmark - failed test - Url is required", async () => {
    const response = await request(app)
      .post("/users/bookmark")
      .set("access_token", access_token)
      .send({
        UserId: 1,
        url: "",
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Url is required");
  });
});

describe("DELETE /users/bookmark", () => {
  test("DELETE /users/bookmark - success test", async () => {
    const response = await request(app)
      .delete("/users/bookmark")
      .set("access_token", access_token)
      .send({
        UserId: 1,
        url: "google.com/2",
      });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Bookmark successfuly deleted"
    );
  });

  test("DELETE /users/bookmark - failed test - Bookmark not found", async () => {
    const response = await request(app)
      .delete("/users/bookmark")
      .set("access_token", access_token)
      .send({
        UserId: 1,
        url: "google.com/100",
      });
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Bookmark not found");
  });

  test("DELETE /users/bookmark - failed test - Url is required", async () => {
    const response = await request(app)
      .delete("/users/bookmark")
      .set("access_token", access_token)
      .send({
        UserId: 1,
        url: "",
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Url is required");
  });
});

describe("GET /users/bookmark", () => {
  test("GET /users/bookmark - success test", async () => {
    const response = await request(app)
      .get("/users/bookmark")
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("url", expect.any(String));
  });
});
