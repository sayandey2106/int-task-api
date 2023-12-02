import user from "../models/user-model.js";

class UserController {
  constructor() {}

  /**
   * @method addUser
   * @description Add Users
   */
  async addUser(req, res) {
    try {
      let isUserExists = await user.findOne({
        email: req.body.email,
      });
      if (isUserExists) {
        res.status(200).json({ msg: "User already exists!" });
        return;
      }

      const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        domain: req.body.domain,
        avatar: req.body.avatar,
        available: req.body.available,
      };

      const newUser = new user(data);
      await newUser.save();
      return res.status(201).json("User created");
    } catch (error) {
      return res
        .status(500)
        .json({ "Server Error! -> addUser": error.message });
    }
  }

  /**
   * @method getUsers
   */
  async getUsers(req, res) {
    try {
      const users = await user.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @method getDetails
   * @description It will return the details of user
   */
  async getDetails(req, res) {
    try {
      const { id } = req.params;

      const isUserExists = await user.findOne({
        _id: id,
      });

      if (!isUserExists) {
        return res.status(404).json({ error: "User Not Found" });
      }

      return res.status(200).json(isUserExists);
    } catch (error) {
      console.log("Error:", error.message);
      return res.status(500).json({ error: "Server Error! --> getId" });
    }
  }

  /**
   * @method editUser
   * @description Editing the user data
   */
  async editUser(req, res) {
    try {
      const userId = req.params.id;
      const updates = req.body;

      // Validate if the user exists
      const existingUser = await user.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update user data
      Object.assign(existingUser, updates);
      await existingUser.save();

      return res
        .status(200)
        .json({ msg: "User updated successfully", user: existingUser });
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ error: "Server Error! --> editUser" });
    }
  }

  /**
   * @method deleteUser
   * @description Editing the user data
   */
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      // Validate if the user exists
      const existingUser = await user.findByIdAndDelete(userId);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ error: "Server Error! --> deleteUser" });
    }
  }
}

export default UserController = new UserController();
