const fs = require("fs");
const path = require("path");
const pathToDb = path.join(__dirname, "../models", "/flights.json");
const flightDb = require("../models/flights.json");

exports.bookFlight = (req, res) => {
  const { title, time, price, date } = req.body;

  if (!title || !time || !price || !date) {
    return res.status(400).json({ msg: "One or more fields missing" });
  }

  const data = { id: Date.now(), ...req.body };

  flightDb.push(data);

  const newDb = JSON.stringify(flightDb);

  fs.writeFileSync(pathToDb, newDb);

  res.status(201).json(data);
};

exports.getFlights = (req, res) => {
  const flights = flightDb;

  res.status(200).json(flights);
};

exports.getFlight = (req, res) => {
  const { id } = req.params;
  const flights = flightDb;

  const flight = flights.find((obj) => {
    return obj.id == id;
  });

  res.status(200).json(flight);
};

exports.updateFlight = (req, res) => {
  const { id } = req.params;
  const { title, price, date, time } = req.body;

  const flightIndex = flightDb.findIndex((obj) => {
    return obj.id == id;
  });

  if (title) flightDb[flightIndex].title = title;
  if (price) flightDb[flightIndex].price = price;
  if (date) flightDb[flightIndex].date = date;
  if (time) flightDb[flightIndex].time = time;

  const newDb = JSON.stringify(flightDb);

  fs.writeFileSync(pathToDb, newDb);

  const updatedFlight = flightDb.find((obj) => {
    return obj.id == id;
  });

  res.status(200).json(updatedFlight);
};

exports.deleteFlight = (req, res) => {
  const { id } = req.params;

  const flightIndex = flightDb.findIndex((obj) => {
    return obj.id == id;
  });

  flightDb.splice(flightIndex, 1);
  const newDb = JSON.stringify(flightDb);

  fs.writeFileSync(pathToDb, newDb);

  res.status(204).json({ msg: "Flight Deleted" });
};
