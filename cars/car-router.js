const express = require("express");
//const db = require("../data/dbConfig"); // db access using knex
const Cars = require("../data/helpers/carModel.js");
const router = express.Router();

router.get("/", (req, res) => {
  Cars.find()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.get("/:id", validateCarId, (req, res) => {
  res.status(200).json(req.car);
});

router.post("/", validateCar, (req, res) => {
  const carData = req.body;
  Cars.add(carData)
    .then((newCarEntry) => {
      res.status(201).json(newCarEntry);
    })
    .catch((err) => {
      console.log("POST error");
      res.status(500).json({ message: "Failed to store data", error: err });
    });
});
//-------------------------------
router.put("/:id", validateCarId, validateCar, async (req, res) => {
  const { id } = req.params;
  const newCar = req.body;
  try {
    const count = await Cars.update(id, newCar);
    if (count) {
      res.status(201).json({ updated: count });
    } else {
      res.status(404).json({ message: "invalid id", error: err });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});
router.delete("/:id", validateCarId, async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Cars.remove(id);
    if (count) {
      res.status(201).json({ deleted: count });
    } else {
      res.status(404).json({ message: "invalid id", error: err });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

//custom middleware
function validateCarId(req, res, next) {
  const { id } = req.params;

  Cars.findById(id)
    .then((car) => {
      if (car) {
        req.car = car;
        next();
      } else {
        res.status(400).json({ message: "invalid car id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}

function validateCar(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.vin) {
      res.status(400).json({ message: "missing required vin field" });
    } else if (!req.body.make) {
      res.status(400).json({ message: "missing required make field" });
    } else if (!req.body.model) {
      res.status(400).json({ message: "missing required model field" });
    } else if (!req.body.mileage) {
      res.status(400).json({ message: "missing required mileage field" });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: "missing car data" });
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
// function getById(id) {
//   return db("cars").where({ id }).first();
// }
// function getByName(thisVin) {
//   return db("cars").where("vin", thisVin).first();
// }

module.exports = router;
