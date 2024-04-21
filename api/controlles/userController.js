const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async (req, res) => {
  const {userName, email, password } = req.body; 
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      email: email,
      userName: userName,
      password: hashedPassword,
    });

    if(result) {
      res.status(200).json({
        status: 200,
        message: "Registration Successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
           const token = jwt.sign(
              { user_id: user._id, email: user.email },
              SECRET_KEY,
              {
                expiresIn: "7h",
              }
            );
            res.status(200).json({
              code: 200,
              token: token,
              userId:user._id,
              status: "success",
              message: "Login Successfully",
            });
          
        } else {
          res.status(400).json({
            code: 400,
            status: "failed",
            message: "Email or Password is not Valid",
          });
        }
      } else {
        res.status(400).json({
          code: 400,
          status: "failed",
          message: "You are not a Registered User",
        });
      }
    } else {
      res.status(400).json({
        code: 400,
        status: "failed",
        message: "All Fields are Required",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "failed",
      message: "Unable to Login",
    });
  }
};

const verfiyUser = async (req, res) => {
  try {
    const verifycode = await User.findOne({
      _id: req.query.id,
    });

    if (!verifycode) {
      return res.status(400).json({
        message: "User Not found",
      });
    }
    await User.updateOne({ _id: req.query.id }, { $set: { isverified: true } });

    res.status(200).json({
      message: "Email verified SuccessFull",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

const getAllUser = async (req, res) => {
  const { search, sortBy, sortOrder, page, count } = req.query;
  const pageNumber = parseInt(page) || 1;
  const itemsPerPage = parseInt(count) || 10;
  const searchQuery = search
    ? {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  try {
    const totalCount = await User.countDocuments(searchQuery);

    const userData = await User.find(searchQuery)
      .select(["-password", "-isverified"])
      .sort(sortOptions)
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage);

    if (userData.length === 0) {
      return res.status(404).json({
        message: "No Records Found",
      });
    }

    return res.status(200).json({
      message: "Get Users Data",
      count: totalCount,
      page: pageNumber,
      itemsPerPage,
      data: userData,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

const retriveSingleUser = async (req, res) => {
  try {
    const getUserById = await User.findOne({
      _id: req.query.id,
    }).select(["-password", "-isverified"]);

    if (!getUserById) {
      return res.status(400).json({
        message: "User Not found",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Get Single User Data",
      data: getUserById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

module.exports = { signup, login, verfiyUser, getAllUser, retriveSingleUser };
