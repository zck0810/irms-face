const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userName: state => state.user.userName,
  roleId: state => state.user.roleId,
  unitId: state => state.user.unitId,
  departmentId: state => state.user.departmentId,
  accountStatus: state => state.user.accountStatus,
  unit: state => state.user.unit,
  department: state => state.user.department,
  loginId: state => state.user.loginId,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes

}
export default getters
