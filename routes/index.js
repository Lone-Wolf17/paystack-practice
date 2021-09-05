const express = require("express");
const request = require("request");
const _ = require("lodash");
const router = express.Router();
const Donor = require("../models/Donor.js");
const { initializePayment, verifyPayment } =
  require("../config/paystack")(request);

// @desc        Display Homepage
// @route       Get /
router.get("/", (req, res) => {
  res.render("index.pug");
});

// @desc        Make a payment Request to Paystack
// @route       POST /paystack/pay
router.post("/paystack/pay", (req, res) => {
  const form = _.pick(req.body, ["amount", "email", "full_name"]);

  form.metadata = {
    full_name: form.full_name,
  };

  form.amount *= 100;

  initializePayment(form, (error, body) => {
    if (error) {
      // handle errors
      console.log(error);
      return;
    }

    response = JSON.parse(body);
    res.redirect(response.data.authorization_url);
  });
});

// @desc        Callback after Paystack Transaction
// @route       Get /paystack/callback
router.get("/paystack/callback", (req, res) => {
  const ref = req.query.reference;

  verifyPayment(ref, (error, body) => {
    if (error) {
      // Handle Errors Appropriately
      console.log(error);
      return res.redirect("/error");
    }

    response = JSON.parse(body);
    console.log(response);
    const data = _.at(response.data, [
      "reference",
      "amount",
      "customer.email",
      "metadata.full_name",
    ]);
    [reference, amount, email, full_name] = data;

    newDonor = { reference, amount, email, full_name };

    console.log(newDonor);

    const donor = new Donor(newDonor);
    donor
      .save()
      .then((donor) => {
        if (donor) {
          res.redirect("/receipt/" + donor._id);
        }
      })
      .catch((e) => {
        console.log("Werey Re oooo!!!!");
        console.log(e);
        res.redirect("/error");
      });
  });
});

// @desc        Display Donor Receipt / Success Page
// @route       Get /receipt/:id
router.get("/receipt/:id", (req, res) => {
  const id = req.params.id;

  Donor.findById(id)
    .then((donor) => {
      if (!donor) {
        /// Handle error when the donor is found
        res.redirect("/error");
      }

      res.render("success.pug", { donor });
    })
    .catch((e) => {
      res.redirect("/error");
    });
});

// @desc        Display Error Page
// @route       Get /error
router.get("/error", (req, res) => {
  res.render("error.pug");
});

module.exports = router;
