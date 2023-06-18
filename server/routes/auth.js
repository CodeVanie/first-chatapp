const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  addContact,
  removeContact,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.post("/addcontct/:id", addContact);
router.post("/remcontct/:id", removeContact);

module.exports = router;
