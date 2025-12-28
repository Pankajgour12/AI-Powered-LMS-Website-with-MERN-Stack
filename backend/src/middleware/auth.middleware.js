import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
       let token = req.cookies && req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: `Unauthorized User Does't have token` });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status(401).json({ message: 'Unauthorized User Invalid Token' });
    }
  
    req.userId = verifiedToken.userID;



  next();



  } catch (error) {
    return res.status(500).json({ message: `Authenication Error: ${error.message}` });
    
  }







}



export default authUser;