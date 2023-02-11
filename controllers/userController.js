const fs = require('fs');

// 1) JSON DATA
let users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

// 2) ROUTE HANDLERS
exports.signUp = (req, res) => {
  const newUser = { ...req.body};
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/../data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) return res.status(500).json({ status: 'error', message: err });
      return res
        .status(201)
        .json({ status: 'success', data: { user: newUser } });
    }
  );
};

exports.signIn = (req, res) => {
  const user = users.find((el) => el.email === req.body.email);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }
  if (user.password === req.body.password) {
    return res.status(200).json({
      status: 'success',
      data: {
        email: user.email,
        password: user.password
      },
    });
  } else {
    return res.status(400).json({
      status: 'error',
      message: 'Incorrect password',
    });
  }
};
