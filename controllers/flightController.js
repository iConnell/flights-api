const fs = require("fs");
const path = require("path");
const pathToDb = path.join(__dirname, "../models", "/flights.json");

const flights = [];

exports.bookFlight = (req, res) => {
  const { title, time, price, date } = req.body;

  if (!title || !time || !price || !date) {
    return res.status(400).json({ msg: "One or more fields missing" });
  }

  const data = { id: Date.now(), ...req.body };

  flights.push(data);

  //const jsonData = JSON.stringify(flights);
  fs.writeFileSync(pathToDb, flights, { flag: "a" });

  res.status(201).json(data);
};

exports.getFlights = (req, res) => {
  const flights = flightDb;

  res.status(200).json(flights);
};

exports.getFlight = (req, res) => {
  const { id } = req.params;

  const flight = flightDb.find({ id: id });

  res.status(200).json(flight);
};

exports.updateFlight = (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  const flight = flightDb.find({ id: id });

  // Update flight

  const updatedFlight = flightDb.find({ id: id });

  res.status(200).json(updatedFlight);
};

exports.deleteFlight = (req, res) => {
  const { id } = req.params;

  res.status(204).json({ msg: "Flight Deleted" });
};
