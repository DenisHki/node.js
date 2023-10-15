const express = require("express");
const router = express.Router();
const Car = require("./models/car");

// Fetch all cars
router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Add car
router.post("/cars", async (req, res) => {
    const car = new Car({
      brand: req.body.brand,
      model: req.body.model,
      color: req.body.color,
      year: req.body.year,
    });
  
    try {
      const newcar = await car.save();
      res.status(201).json({ newcar });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
  
  // Delete car by id
router.delete("/cars/:id", async (req, res) => {
    try {
      const result = await Car.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
  
  // Edit car by id
  router.put("/cars/:id", async (req, res) => {
    try {
      const updatedcar = await Car.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
  
      if (!updatedcar) {
        return res.status(404).json({ message: "car not found" });
      }
  
      res.status(200).json(updatedcar);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
