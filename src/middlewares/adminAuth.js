export const verifyAdminPassword = (req, res, next) => {
  const { adminpassword } = req.body;
  console.log(adminpassword);

  if (!adminpassword || adminpassword !== process.env.ADMIN_PASSWORD) {
    return res
      .status(401)
      .send(
        "<script>alert('Invalid password'); window.history.back()</script>",
      );
  }
  next();
};
