const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { auth } = require("../../middlewares");

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", auth, ctrl.post);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", ctrl.putById);

router.patch("/:contactId/favorite", ctrl.patchContactStatus);

module.exports = router;
