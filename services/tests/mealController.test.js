const Meal = require("../models/Meal");
const {
  createMeal,
  getMeals,
  updateMeal,
  deleteMeal
} = require("../controller/mealController");


jest.mock("../models/Meal");

describe("Meal Controller (Unit Tests)", () => {

  const mockRes = () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  });

  const mockUserId = "user123";

  
  test("createMeal() should save meal and return json", async () => {
    const req = { 
      body: { name: "Pizza", calories: 500, protein: 20, carbs: 60, fat: 20, user: mockUserId } 
    };
    const res = mockRes();

    Meal.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(req.body)
    }));

    await createMeal(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  
  test("getMeals() should return meals", async () => {
    const req = { user: { id: mockUserId }, query: {} };
    const res = mockRes();

    const mockMeals = [{ name: "Burger" }, { name: "Salad" }];
    Meal.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockMeals)
    });

    await getMeals(req, res);

    expect(res.json).toHaveBeenCalledWith(mockMeals);
  });

  test("getMeals() returns 500 on error", async () => {
    const req = { user: { id: mockUserId }, query: {} };
    const res = mockRes();

    Meal.find.mockImplementation(() => { throw new Error("DB error"); });

    await getMeals(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
  });

  
  test("updateMeal() should return updated meal", async () => {
    const req = { params: { id: "meal1" }, body: { name: "Updated Pizza" }, user: { id: mockUserId } };
    const res = mockRes();

    const updatedMeal = { _id: "meal1", name: "Updated Pizza" };
    Meal.findOneAndUpdate.mockResolvedValue(updatedMeal);

    await updateMeal(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedMeal);
  });

  test("updateMeal() returns 404 if meal not found", async () => {
    const req = { params: { id: "meal1" }, body: {}, user: { id: mockUserId } };
    const res = mockRes();

    Meal.findOneAndUpdate.mockResolvedValue(null);

    await updateMeal(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Meal not found" });
  });

  
  test("deleteMeal() should delete meal", async () => {
    const req = { params: { id: "meal1" }, user: { id: mockUserId } };
    const res = mockRes();

    Meal.findOneAndDelete.mockResolvedValue({ _id: "meal1" });

    await deleteMeal(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Deleted" });
  });

  

});
