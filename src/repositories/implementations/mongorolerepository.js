import roleModel from "../../models/role.model";
import { AppError } from "../../utils/errors";
import IRoleRepository from "../contracts/IRoleRepository";

class mongoRoleRepository extends IRoleRepository {
  async createRole(RoleData) {
    try {
      const role = new roleModel(RoleData);
      return await role.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError("Role name already exists", 409)
      }
      throw new AppError("Failed to create role", 500);
    }
  }

  async findRoleByName(Role) {
    try {
      const role = await roleModel.findOne(Role);
      return role;
    } catch (error) {
      throw new AppError("Failed to find role", 404);
    }
  }
}

export default mongoRoleRepository;
