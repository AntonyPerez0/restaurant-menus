const { sequelize } = require("./db");
const { Restaurant, Menu, Item } = require("./models/index");
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

  test("can create an Item", async () => {
    const item = await Item.create({
      name: "Test Item",
      image: "test.jpg",
      price: 9.99,
      vegetarian: true,
    });
    expect(item.name).toEqual("Test Item");
  });

  test("can perform CRUD operations using the Item model", async () => {
    const item = await Item.create({
      name: "CRUD Item",
      image: "crud.jpg",
      price: 5.99,
      vegetarian: false,
    });
    const foundItem = await Item.findByPk(item.id);
    expect(foundItem.name).toEqual("CRUD Item");

    await item.update({ price: 6.99 });
    const updatedItem = await Item.findByPk(item.id);
    expect(updatedItem.price).toEqual(6.99);

    await item.destroy();
    const deletedItem = await Item.findByPk(item.id);
    expect(deletedItem).toBeNull();
  });

  test("Menu can have many Items", async () => {
    const menu = await Menu.create({ title: "Lunch Menu" });
    const item1 = await Item.create({
      name: "Burger",
      image: "burger.jpg",
      price: 8.99,
      vegetarian: false,
    });
    const item2 = await Item.create({
      name: "Salad",
      image: "salad.jpg",
      price: 5.99,
      vegetarian: true,
    });
    await menu.addItems([item1, item2]);
    const items = await menu.getItems();
    expect(items.length).toBe(2);
  });

  test("can eager load Items in Menu", async () => {
    const menus = await Menu.findAll({ include: [Item] });
    expect(menus[0].Items).toBeDefined();
  });
});
