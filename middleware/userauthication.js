const jwt = require('jsonwebtoken');
const tokenkey="mynamrisrohit"
const fetchuser = (req, res, next) => {
   // Get the user from the jwt token and add id to req object
   const id = req.header('id');
   if (!id) {
      return  res.status(401).send({ msg: "Ple authenticate using a valid token" })
   }
   
   try {
    //    const data = jwt.verify(token, tokenkey);
       req.user = id
       next();
   } catch (error) {
       res.status(401).send({ msg: "Please authenticate using a valid token" })
   }

}
module.exports = fetchuser