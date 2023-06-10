//const { default: MessageList } = require("../../client/src/pages/recipe");
const { Signup, Login, Recipe } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/', userVerification);
//router.post('/recipe', Recipe);

module.exports = router;