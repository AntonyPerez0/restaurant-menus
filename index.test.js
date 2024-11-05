const { sequelize } = require("./db");
const { Restaurant, Menu } = require("./models/index");
const { seedRestaurant, seedMenu } = require("./seedData");

describe("Restaurant and Menu Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Restaurant", async () => {
    // TODO - write test
    const restaurant = await Restaurant.create({
      name: "Test Restaurant",
      location: "Test Location",
      cuisine: "Test Cuisine",
    });
    expect(restaurant.name).toEqual("Test Restaurant");
  });

  test("can create a Menu", async () => {
    // TODO - write test
    const menu = await Menu.create({
      title: "Test Menu",
    });
    expect(menu.title).toEqual("Test Menu");
  });

  test("can find Restaurants", async () => {
    // TODO - write test
    const restaurant = await Restaurant.create({
      name: "Find Me Restaurant",
      location: "Find Me Location",
      cuisine: "Find Me Cuisine",
    });
    const found = await Restaurant.findOne({
      where: { name: "Find Me Restaurant" },
    });
    expect(found).not.toBeNull();
  });

  test("can find Menus", async () => {
    // TODO - write test
    const menu = await Menu.create({
      title: "Find Me Menu",
    });
    const found = await Menu.findOne({ where: { title: "Find Me Menu" } });
    expect(found).not.toBeNull();
  });

  test("can delete Restaurants", async () => {
    // TODO - write test
    const restaurant = await Restaurant.create({
      name: "Delete Me",
      location: "Some Location",
      cuisine: "Some Cuisine",
    });
    await restaurant.destroy();
    const found = await Restaurant.findByPk(restaurant.id);
    expect(found).toBeNull();
  });
});
