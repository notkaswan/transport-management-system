const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Driver = require("./models/Driver");
const Client = require("./models/Client");
const Vehicle = require("./models/Vehicle");
const Order = require("./models/Order");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();
const app = express();
const BASE_URL = process.env.BASE_URL;

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = "asdfe2fsdf8dafdf7dfsdf23q4v5aw";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: BASE_URL,
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/", (req, res) => {
  res.json("testsad ok");
});

app.post("/register", async (req, res) => {
  const { name, company, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      company,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, company, email, _id } = await User.findById(userData.id);
      res.json({ name, company, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

const photoMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/drivers", (req, res) => {
  const { token } = req.cookies;
  const {
    name,
    dob,
    phoneNo,
    altPhoneNo,
    email,
    address,
    aadhaarNo,
    driverLicense,
    profileImage,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const driverDoc = await Driver.create({
      userId: userData.id,
      name,
      dob,
      phoneNo,
      altPhoneNo,
      email,
      address,
      aadhaarNo,
      driverLicense,
      profileImage,
    });
    res.json(driverDoc);
  });
});

app.get("/drivers", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Driver.find({ userId: id }));
  });
});

app.get("/drivers/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Driver.findById(id));
});

app.put("/drivers", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    name,
    dob,
    phoneNo,
    altPhoneNo,
    email,
    address,
    aadhaarNo,
    driverLicense,
    profileImage,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const driverDoc = await Driver.findById(id);
    if (userData.id === driverDoc.userId.toString()) {
      driverDoc.set({
        name,
        dob,
        phoneNo,
        altPhoneNo,
        email,
        address,
        aadhaarNo,
        driverLicense,
        profileImage,
      });
      await driverDoc.save();
      res.json("ok");
    }
  });
});

app.post("/clients", (req, res) => {
  const { token } = req.cookies;
  const { clientName, remarks, phoneNo, altPhoneNo, email, address, gstin } =
    req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const clientDoc = await Client.create({
      userId: userData.id,
      clientName,
      remarks,
      phoneNo,
      altPhoneNo,
      email,
      address,
      gstin,
    });
    res.json(clientDoc);
  });
});

app.get("/clients", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Client.find({ userId: id }));
  });
});

app.get("/clients/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Client.findById(id));
});

app.put("/clients", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    clientName,
    remarks,
    phoneNo,
    altPhoneNo,
    email,
    address,
    gstin,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const clientDoc = await Client.findById(id);
    if (userData.id === clientDoc.userId.toString()) {
      clientDoc.set({
        clientName,
        remarks,
        phoneNo,
        altPhoneNo,
        email,
        address,
        gstin,
      });
      await clientDoc.save();
      res.json("ok");
    }
  });
});

app.post("/vehicles", (req, res) => {
  const { token } = req.cookies;
  const {
    ownerName,
    driverId,
    driver,
    maker,
    model,
    plateNumber,
    height,
    capacity,
    noOfTires,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const vehicleDoc = await Vehicle.create({
      userId: userData.id,
      ownerName,
      driverId,
      driver,
      maker,
      model,
      plateNumber,
      height,
      capacity,
      noOfTires,
    });
    res.json(vehicleDoc);
  });
});

app.get("/vehicles", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Vehicle.find({ userId: id }));
  });
});

app.get("/vehicles/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Vehicle.findById(id));
});

app.put("/vehicles", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    ownerName,
    driverId,
    driver,
    maker,
    model,
    plateNumber,
    height,
    capacity,
    noOfTires,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const vehicleDoc = await Vehicle.findById(id);
    if (userData.id === vehicleDoc.userId.toString()) {
      vehicleDoc.set({
        ownerName,
        driverId,
        driver,
        maker,
        model,
        plateNumber,
        height,
        capacity,
        noOfTires,
      });
      await vehicleDoc.save();
      res.json("ok");
    }
  });
});

app.post("/orders", (req, res) => {
  const { token } = req.cookies;
  const {
    clientId,
    clientName,
    vehicleId,
    vehicle,
    driver,
    driverId,
    source,
    destination,
    orderDate,
    sourceArrivalDate,
    loadDate,
    arrivalDate,
    unloadDate,
    freightCharges,
    advanceReceived,
    pay1,
    pay2,
    miscCharges,
    netAmount,
    driverCash,
    fuel,
    fastag,
    remarks,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const orderDoc = await Order.create({
      userId: userData.id,
      clientId,
      clientName,
      vehicleId,
      vehicle,
      driver,
      driverId,
      source,
      destination,
      orderDate,
      sourceArrivalDate,
      loadDate,
      arrivalDate,
      unloadDate,
      freightCharges,
      advanceReceived,
      pay1,
      pay2,
      miscCharges,
      netAmount,
      driverCash,
      fuel,
      fastag,
      remarks,
    });
    res.json(orderDoc);
  });
});

app.get("/orders", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Order.find({ userId: id }));
  });
});

app.get("/orders/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Order.findById(id));
});

app.put("/orders", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    clientId,
    clientName,
    vehicleId,
    vehicle,
    driver,
    driverId,
    source,
    destination,
    orderDate,
    sourceArrivalDate,
    loadDate,
    arrivalDate,
    unloadDate,
    freightCharges,
    advanceReceived,
    pay1,
    pay2,
    miscCharges,
    netAmount,
    driverCash,
    fuel,
    fastag,
    remarks,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const orderDoc = await Order.findById(id);
    if (userData.id === orderDoc.userId.toString()) {
      orderDoc.set({
        clientId,
        clientName,
        vehicleId,
        vehicle,
        driver,
        driverId,
        source,
        destination,
        orderDate,
        sourceArrivalDate,
        loadDate,
        arrivalDate,
        unloadDate,
        freightCharges,
        advanceReceived,
        pay1,
        pay2,
        miscCharges,
        netAmount,
        driverCash,
        fuel,
        fastag,
        remarks,
      });
      await orderDoc.save();
      res.json("ok");
    }
  });
});

app.listen(4000);
