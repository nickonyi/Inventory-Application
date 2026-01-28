export const validateId = (req, res, next) => {
  const id = req.params.id;

  if (!id || isNaN(Number(id))) {
    res.status(404).render("404");
    return;
  }
  next();
};
