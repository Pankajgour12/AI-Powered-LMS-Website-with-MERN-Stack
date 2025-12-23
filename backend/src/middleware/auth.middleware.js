import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
       let token = req.cookies;
  if (!token) {
      return res.status(401).json({ message: `Unauthorized User Does't have token` });
  }

  let verifyedToken = await jwt.verify(token, process.env.JWT_SECRET);

  if (!verifyedToken) {
      return res.status(401).json({ message: 'Unauthorized User Invalid Token' });
  }
  
    req.userID = verifyedToken.userID;



  next();



  } catch (error) {
    return res.status(500).json({ message: `Authenication Error: ${error.message}` });
    
  }







}



export default authUser;