const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Meal = require("../models/Meal");
const mealRoutes = require("../routes/mealRoutes");
const { Types } = require("mongoose");


jest.mock("../middleware/auth", () => ({
  auth: (req, res, next) => {
    req.user = { id: req.headers["x-user"] }; 
    next();
  }
}));

jest.setTimeout(30000);

const app = express();
app.use(express.json());
app.use("/v1/meal", mealRoutes);

let mongoServer;

describe("Meal API Integration Tests (In-Memory MongoDB)", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: "testdb" });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Meal.deleteMany({});
  });

  
  test("POST /v1/meal/create → should create a meal", async () => {
    const mockUserId = new Types.ObjectId().toString();

    const payload = {
      user: mockUserId,
      name: "Breakfast",
      calories: 300,
      protein: 20,
      carbs: 30,
      fat: 10
    };

    const res = await request(app)
      .post("/v1/meal/create")
      .set("X-User", mockUserId)  
      .send(payload)
      .expect(200);

    expect(res.body.name).toBe("Breakfast");
    expect(res.body.calories).toBe(300);

    const created = await Meal.findOne({ name: "Breakfast" });
    expect(created).not.toBeNull();
    expect(created.user.toString()).toBe(mockUserId);
  });

  
  test("GET /v1/meal → should return meals for the authenticated user", async () => {
    const mockUserId = new Types.ObjectId().toString();
    const otherUserId = new Types.ObjectId().toString();

    
    await Meal.create([
      {
        user: mockUserId,
        name: "Lunch",
        calories: 500,
        protein: 30,
        carbs: 50,
        fat: 15,
        date: new Date()
      },
      {
        user: otherUserId,
        name: "NOT Allowed",
        calories: 999
      }
    ]);

    const res = await request(app)
      .get("/v1/meal")
      .set("X-User", mockUserId)
      .expect(200);

    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Lunch");
  });
});
