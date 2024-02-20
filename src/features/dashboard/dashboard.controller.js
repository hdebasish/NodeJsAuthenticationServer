import UserRepository from "../user/user.repository.js";

export default class DashboardController {
  async index(req, res, next) {
    try {
      const userId = req.userId;
      const userRepository = new UserRepository();

      const user = await userRepository.findUserById(userId);

      if (!user) {
        return res.status(500).send("Something went wrong");
      }
      return res.status(200).send("Welcome " + user.name);
    } catch (error) {
      next(error);
    }
  }
}
