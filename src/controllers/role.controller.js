import RoleService from "../services/role.service";

class RoleController {
  constructor() {
    this.roleService = new RoleService();
  }
  createRole = async (req, res) => {
    try {
      const role = await this.roleService.createRole(req.body);
      return res.status(201).json({ success: true, data: role });
    } catch (error) {
        next(error);
    }
  };
}

export default RoleController;
