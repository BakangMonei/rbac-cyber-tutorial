// middleware/authenticateUser.js
const authenticateUser = (req, res, next) => {
    // Check if user is authenticated (implement your logic here)
    if () {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = authenticateUser;
  