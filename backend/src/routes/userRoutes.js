const { Router } = require("express");
const { login, register } = require("../controllers/user.js");

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity");
router.route("/get_all_activity");

module.exports = router;
