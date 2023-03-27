const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const result = await AccessService.signUp(name, email, password);
      return res.status(201).json({
        code: "aaa",
        metadata: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
