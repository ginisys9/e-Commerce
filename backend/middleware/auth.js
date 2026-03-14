const jwt = require("jsonwebtoken");
const User = require("../schema/user.schema");
const auth = async (req, res, next) => {
   try {
      
        const Authheader = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null;
        if (!Authheader) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const verifyToken = jwt.verify(Authheader,process.env.JWT_SECRET);  
        const user = await User.findById(verifyToken._id)
  
        if (user) {
         req.user = user;
        req.user.password = undefined;
        next();
        }
        else{
            return res.status(401).json({ message: "user not found" });
        }
   } catch (error) {
     console.log(error);
     return res.status(500).json({ message: error.message });
   }
};
const adminAuth = async (req, res, next) => {
   try {
        const Authheader = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null;
        if (!Authheader) {
          return res.status(401).json({ message: "no token provided" });
        }
        const verifyToken = jwt.verify(Authheader,process.env.JWT_SECRET);
        const user = await User.findById(verifyToken._id);
        if(user && user.role !==0){
        req.user = user;
        req.user.password = undefined;
        next();
        }
        else{
       return res.status(401).json({ message: "user not found" });
        }
   } catch (error) {
     console.log(error);
     return res.status(500).json({ message: error.message });
   }
};

module.exports = {
   auth,
   adminAuth,
};
