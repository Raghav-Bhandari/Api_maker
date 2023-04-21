import express from "express";
import {
  // getAllUsers,
  getMyProfile,
  loginUser,
  registerUser,
  logoutUser,
  // updateUser,
  // deleteUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Show all Users
// router.get("/all", getAllUsers);

// Create User
router.post("/new", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Get, Update, Delete user by Id
// router.route("/userid/:id").get(getMyProfile);
// .put(updateUser).delete(deleteUser)

// Same as above

router.get("/me", isAuthenticated, getMyProfile);
// router.put("/userid/:id", updateUser);
// router.delete("/userid/:id", deleteUser);

export default router;
