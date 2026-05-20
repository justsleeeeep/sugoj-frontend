/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_List_Question_ } from "../models/BaseResponse_List_Question_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_QuestionVO_ } from "../models/BaseResponse_Page_QuestionVO_";
import type { BaseResponse_QuestionVO_ } from "../models/BaseResponse_QuestionVO_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { QuestionAddRequest } from "../models/QuestionAddRequest";
import type { QuestionUpdateRequest } from "../models/QuestionUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class QuestionControllerService {
  /**
   * addQuestion
   * @param requestBody
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addQuestionUsingPost(
    requestBody?: QuestionAddRequest,
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/add",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * deleteQuestion
   * @param requestBody
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteQuestionUsingPost(
    requestBody?: DeleteRequest,
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/delete",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * getQuestionById
   * @param id id
   * @returns BaseResponse_QuestionVO_ OK
   * @throws ApiError
   */
  public static getQuestionByIdUsingGet(
    id?: number,
  ): CancelablePromise<BaseResponse_QuestionVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/get",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * listQuestion
   * @param content
   * @param current
   * @param id
   * @param pageSize
   * @param sortField
   * @param sortOrder
   * @param tags
   * @param title
   * @param userId
   * @returns BaseResponse_List_Question_ OK
   * @throws ApiError
   */
  public static listQuestionUsingGet(
    content?: string,
    current?: number,
    id?: number,
    pageSize?: number,
    sortField?: string,
    sortOrder?: string,
    tags?: string,
    title?: string,
    userId?: number,
  ): CancelablePromise<BaseResponse_List_Question_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/list",
      query: {
        content: content,
        current: current,
        id: id,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
        tags: tags,
        title: title,
        userId: userId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * listQuestionByPage
   * @param content
   * @param current
   * @param id
   * @param pageSize
   * @param sortField
   * @param sortOrder
   * @param tags
   * @param title
   * @param userId
   * @returns BaseResponse_Page_QuestionVO_ OK
   * @throws ApiError
   */
  public static listQuestionByPageUsingGet(
    content?: string,
    current?: number,
    id?: number,
    pageSize?: number,
    sortField?: string,
    sortOrder?: string,
    tags?: string,
    title?: string,
    userId?: number,
  ): CancelablePromise<BaseResponse_Page_QuestionVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/list/page",
      query: {
        content: content,
        current: current,
        id: id,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
        tags: tags,
        title: title,
        userId: userId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * updateQuestion
   * @param requestBody
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateQuestionUsingPost(
    requestBody?: QuestionUpdateRequest,
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/update",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
