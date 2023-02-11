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
  // TODO Sign In User
};
