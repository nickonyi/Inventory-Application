export const verifyAdminPassword = (req, res, next) => {
  const { adminPassword } = req.body;

  if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
    return res
      .status(401)
      .send(
        "<script>alert('Invalid password'); window.history.back()</script>",
      );
  }
  next();
};
