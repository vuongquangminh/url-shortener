export const roleAdminMiddleware = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
      const error = new Error('Forbidden');
      error.statusCode = 403;
  
      return next(error);
    }
  
    next();
  };