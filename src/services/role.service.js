import mongoRoleRepository from "../repositories/implementations/mongorolerepository";
import { AppError } from "../utils/errors";

class RoleService {
  constructor() {
    this.roleRepository = new mongoRoleRepository();
  }
  async createRole(RoleData) {
    const existingRole = await this.roleRepository.findRoleByName(
      RoleData.name,
    );
    if (role) {
      throw new AppError("Role already exists", 400);
    }
    return await this.roleRepository.createRole(RoleData);
  }
}

export default RoleService;
