const fs = require('fs');

// 1) DATA (JSON)
let users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

// 2) VALIDATIONS
exports.checkBody = (req, res, next) => {
  const requiredParams = [
    'firstName',
    'lastName',
    'birthday',
    'city',
    'country',
    'email',
    'password',
    'confirmPassword',
  ];
  const missingParams = requiredParams.filter((param) => !req.body[param]);
  if (missingParams.length) {
    return res.status(400).json({
      status: 'fail',
      message: `Missing parameters: ${missingParams.join(', ')}.`,
    });
  }
  next();
};

// 3) HANDLERS
exports.signUp = async (req, res) => {
  const newUser = { ...req.body };
  users.push(newUser);
  try {
    await fs.promises.writeFile(
      `${__dirname}/../data/users.json`,
      JSON.stringify(users)
    );
    res.status(201).json({ status: 'success', data: { user: newUser } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err });
  }
};

exports.signIn = (req, res) => {
  const user = users.find((el) => el.email === req.body.email);
  if (!user)
    return res.status(404).json({ status: 'error', message: 'User not found' });
  if (user.password !== req.body.password)
    return res
      .status(400)
      .json({ status: 'error', message: 'Incorrect password' });
  return res.status(200).json({
    status: 'success',
    data: { email: user.email, password: user.password },
  });
};
