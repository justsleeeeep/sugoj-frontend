import ACCESS_ENUM from "./accessEnum";

/**
 *@param loginUser 当前登录用户
 *@param needAccess 需要的权限
 *@return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess == ACCESS_ENUM.NOT_LOGIN) {
    return true;
  } else if (needAccess == ACCESS_ENUM.USER) {
    if (loginUserAccess == ACCESS_ENUM.NOT_LOGIN) return false;
    return true;
  } else if (needAccess == ACCESS_ENUM.ADMIN) {
    if (loginUserAccess != ACCESS_ENUM.ADMIN) return false;
    return true;
  }
};

export default checkAccess;
