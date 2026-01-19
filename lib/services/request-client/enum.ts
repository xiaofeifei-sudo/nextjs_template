export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 1,
  NO_LOGIN = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TIMEOUT = 508,
}

export enum RequestEnum {
  DELETE = 'DELETE',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

export enum ContentTypeEnum {
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  JSON = 'application/json;charset=UTF-8',
}
