const router = require("express").Router();
const UserController = require("../controllers/user");
const authc = require("../middlewares/authc");
const authz = require("../middlewares/authz");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authc);
router.post("/bookmark", authz, UserController.addBookmark);
router.delete("/bookmark", authz, UserController.deleteBookmark);
router.get("/bookmark", authz, UserController.showBookmark);

module.exports = router;
