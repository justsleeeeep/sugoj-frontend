/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_QuestionSubmit_ } from "../models/BaseResponse_Page_QuestionSubmit_";
import type { QuestionSubmitAddRequest } from "../models/QuestionSubmitAddRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class QuestionSubmitControllerService {
  /**
   * addQuestionSubmit
   * @param requestBody
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addQuestionSubmitUsingPost(
    requestBody?: QuestionSubmitAddRequest,
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/questionsubmit/add",
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
   * listQuestionSubmitByPage
   * @param current
   * @param language
   * @param pageSize
   * @param questionId
   * @param sortField
   * @param sortOrder
   * @param userAccount
   * @returns BaseResponse_Page_QuestionSubmit_ OK
   * @throws ApiError
   */
  public static listQuestionSubmitByPageUsingGet(
    current?: number,
    language?: string,
    pageSize?: number,
    questionId?: number,
    sortField?: string,
    sortOrder?: string,
    userAccount?: string,
  ): CancelablePromise<BaseResponse_Page_QuestionSubmit_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/questionsubmit/list/page",
      query: {
        current: current,
        language: language,
        pageSize: pageSize,
        questionId: questionId,
        sortField: sortField,
        sortOrder: sortOrder,
        userAccount: userAccount,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
