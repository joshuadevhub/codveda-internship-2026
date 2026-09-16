function adminAuth(req, res, next) {
  const { role } = req.data;
  if (role !== "admin") {
    res.status(403).send({ success: false, message: "Access Denied!" });
    return false;
  }
  next();
}

module.exports = adminAuth;