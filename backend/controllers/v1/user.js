const userModel = require("../../models/user");
const banUserModel = require("../../models/ban-phone");
const courseUserModel = require("../../models/course-user");

// exports.create = async (req, res) => {
//   const { name, description, shortName, categoryID, price } = req.body;

//   const course = await courseModel.create({
//     name,
//     description,
//     shortName,
//     creator: req.user._id,
//     categoryID,
//     price,
//     isComplete: 0,
//     support: "گروه تلگرامی",
//     cover: "/images/courses/fareelancer.png",
//   });

//   const populatedCourse = await courseModel
//     .findById(course._id)
//     .populate("creator", "-password");

//   return res.status(201).json(populatedCourse);
// };

exports.getAll = async (req, res) => {
  const users = await userModel.find();

  const allUsers = [];
  for (const userItem of users) {
    if (userItem.role !== "ADMIN") {
      allUsers.push(userItem);
    }
  }
  return res.json(allUsers);
};

exports.removeUser = async (req, res) => {
  const deletedUser = await userModel.findOneAndRemove({ _id: req.params.id });

  if (!deletedUser) {
    return res.status(404).json("There is not user");
  }

  return res.status(200).json("User Deleted Successfully");
};

exports.banUser = async (req, res) => {
  const mainUser = await userModel.findOne({ _id: req.params.id }).lean();
  const banUserResult = banUserModel.create({ phone: mainUser.phone });

  if (banUserResult) {
    return res.status(200).json({ msg: "User ban successfully" });
  }
  return res.status(500).json({ msg: 'Error' })
};

exports.getUserCourses = async (req, res) => {
  const userCourses = await courseUserModel.find({ user: req.user._id }).populate('course').lean()

  res.json(userCourses)
}