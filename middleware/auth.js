module.exports = (req, res, next) => {
  const sessUser = req.session.user;
  if (sessUser) {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
