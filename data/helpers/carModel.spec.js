const db = require("../dbConfig.js");
const Cars = require("./carModel.js");

describe("cars model", () => {
  describe("add()", () => {
    beforeEach(async () => {
      await db("cars").truncate();
    });
    it("should add the provided cars into the DB", async () => {
      await Cars.add({
        vin: "qw1234567ydktifde",
        make: "Toyota",
        model: "ILX",
        mileage: 1500,
        transmission_type: "9-speed automatic",
        status_title: "clean",
      });
      await Cars.add({
        vin: "qw123kjnbvdktifde",
        make: "Honda",
        model: "CLI",
        mileage: 20000,
        transmission_type: "9-speed automatic",
        status_title: "clean",
      });

      const cars = await db("cars");
      expect(cars).toHaveLength(2);
    });
    it("should return what was inserted", async () => {
      let car = await Cars.add({
        vin: "qw123kjnbvdkf8hly",
        make: "Acura",
        model: "CLI",
        mileage: 20000,
        transmission_type: "9-speed automatic",
        status_title: "clean",
      });
      expect(car.vin).toBe("qw123kjnbvdkf8hly");
      expect(car.make).toBe("Acura");
      expect(car.model).toBe("CLI");
      expect(car.mileage).toBe(20000);
      expect(car.transmission_type).toBe("9-speed automatic");
      expect(car.status_title).toBe("clean");
    });
  });

  //---------------remove------------------
  describe("remove()", () => {});
  beforeEach(async () => {
    await db("cars").truncate();
  });
  it("should remove the provided id cars in the DB", async () => {
    await Cars.add({
      vin: "qw1234567y5t6ifde",
      make: "Lexus",
      model: "ILX",
      mileage: 1500,
      transmission_type: "9-speed automatic",
      status_title: "clean",
    });
    await Cars.add({
      vin: "mh343kjnbvdktifde",
      make: "BMW",
      model: "CLI",
      mileage: 20000,
      transmission_type: "9-speed automatic",
      status_title: "clean",
    });

    const cars = await db("cars");
    expect(cars).toHaveLength(2);

    let idCar = await Cars.remove(1);
    expect(idCar).toBe(1);
  });
});
