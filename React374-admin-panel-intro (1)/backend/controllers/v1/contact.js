const contactModel = require("../../models/contact");

exports.create = async (req, res) => {
  const { name, email, phone, body } = req.body;

  const newcontact = await contactModel.create({ name, email, phone, body });

  return res.status(201).json(newcontact);
};

exports.getAll = async (req, res) => {
  const allcontacts = await contactModel.find();
  res.json(allcontacts);
};
