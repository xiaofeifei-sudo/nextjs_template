export function checkStatus(
  status: number,
  msg: string,
  mode: 'message' | 'modal' | 'none' | undefined = 'none',
) {
  let errMessage = msg;
  switch (status) {
    case 400:
      errMessage = '请求错误';
      break;
    case 401:
      errMessage = '未授权或登录已过期';
      break;
    case 403:
      errMessage = '禁止访问';
      break;
    case 404:
      errMessage = '资源不存在';
      break;
    case 408:
      errMessage = '请求超时';
      break;
    default:
      errMessage = '服务器内部错误';
      break;
  }
  return errMessage;
}
