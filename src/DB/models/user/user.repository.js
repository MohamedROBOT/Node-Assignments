import DBRepository from "../../db.repository.js";
import User from "./user.model.js";

class UserRepository extends DBRepository {
  constructor() {
    super(User);
  }
}
const userRepository = new UserRepository();
export default userRepository;
