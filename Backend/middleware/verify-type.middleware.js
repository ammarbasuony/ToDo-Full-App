const verifyType = (types) => {
  return (req, res, next) => {
    if (types.includes(req.type)) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
  };
};

export default verifyType;
