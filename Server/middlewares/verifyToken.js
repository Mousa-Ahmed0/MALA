const Jwt = require("jsonwebtoken");
//verify Token
function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodeToken = Jwt.verify(token, process.env.SECRET_KEY);
      req.user = decodeToken;
      next();
    } catch (error) {
      return res.status(401).json({ meassage: "Invalid token, access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ meassage: "No token provided, access denied" });
  }
}

//if admin
function ifAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.usertype === "Admin") next();
    else return res.status(403).json({ meassage: "Not allwed,only admin" });
  });
}

//if admin or Staff
function ifAdminOrStaff(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.usertype === "Admin" || req.user.usertype == "Staff") next();
    else
      return res
        .status(403)
        .json({ meassage: "Not allwed,only Admin or Staff" });
  });
}
//only user himself
function verifyTokenOnlyUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) next();
    else
      return res.status(403).json({ meassage: "Not allwed,only user himself" });
  });
}

//only user himself  or admin
function verifyTokenOnlyUserOrAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.usertype === "Admin") next();
    else
      return res
        .status(403)
        .json({ meassage: "Not allwed,only user Himself or Admin" });
  });
}

module.exports = {
  verifyToken,
  ifAdmin,
  ifAdminOrStaff,
  verifyTokenOnlyUser,
  verifyTokenOnlyUserOrAdmin,
};

// const { data } = await qxiw.put(`/api/users/Profile/${userId}`, profile, {
//     headers: {
//         Authorization: "Bearer " + token ,
//     }
// });
