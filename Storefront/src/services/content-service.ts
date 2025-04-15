/* eslint-disable @typescript-eslint/no-unused-vars */
import {CommonUtilities, Http} from '../utilities';
// import DOMPurify from 'dompurify';
import { getUIBuilderMediaHost } from '../utilities/get-media-hostname';
import { contentServiceResponseParser } from '../utilities/content-service-response-parser';
import { IsCMSApp } from '../app-main-index';

interface GetPageDataRequest {
  pageSlug: string;
  versionId?: string;
  lang?: string;
  callForceFully?: boolean
}

interface GetSingleTypeContentRequest {
  versionId: string;
  modelName: string;
  componentId: string;
  ssrKey: string;
  enableSSR: boolean;
  callForceFully?: boolean;
}

interface GetCollectionContentByIdRequest {
  id: string | undefined;
  versionId: string | undefined;
  modelName: string;
  componentId: string;
  ssrKey: string;
  enableSSR: boolean;
}

interface GetCollectionRecordsByInternalName {
  modelInternalName: string;
}

interface getLocationsByPlaceName {
  radius: any;
  modelInternalName: string;
  fieldKey: string;
  fieldValue: string;
  fieldsToQuery: string;
  sortBy?: string;
  sortType?: string;
  contentDataSortBy?: string; // when we want records to be sorted by the STATIC fields like, (created_at,modified_at, any_id's
  // e.g(content_data_model_idm or id, etc.) at that time need to provide same field in
  // [sortBy and contentDataSortBy] to get the result in sorted manner, else for dynamic fields like,
  // (page_title_esi, publish_date_esi, etc.) just need to provide [sortBy and sortType])
  limit?: string;
  skip?: string;
  relationField?: string;
  relationFieldDataToQuery?: string;
  filter?: any;
  enableSSR?: any;
  fieldType?: 'parent' | 'child';
}

interface GetContentModelRecordsByFieldKeyValue {

  modelInternalName: string;
  fieldKey: string;
  fieldValue: string;
  fieldsToQuery: string;
  sortBy?: string;
  sortType?: string;
  contentDataSortBy?: string; // when we want records to be sorted by the STATIC fields like, (created_at,modified_at, any_id's
                              // e.g(content_data_model_idm or id, etc.) at that time need to provide same field in
                              // [sortBy and contentDataSortBy] to get the result in sorted manner, else for dynamic fields like,
                              // (page_title_esi, publish_date_esi, etc.) just need to provide [sortBy and sortType])
  limit?:string;
  skip?:string;
  relationField?:string;
  relationFieldDataToQuery?:string;
  filter?: any;
  enableSSR?: any;
  fieldType?: 'parent' | 'child'
  callForceFully?: boolean
}

interface searchContentModelRecordsByFieldKeyValue {
  modelInternalName: string;
  fieldKey: string;
  fieldValue: string;
  fieldsToQuery: string;
  sortBy?: string;
  orderBy?: string;
  limit?:string;
  skip?:string;
  relationField?:string;
  relationFieldDataToQuery?:string;
  filter?: any;
  ssrKey?: string;
  enableSSR?: any;
  fieldType?: 'parent' | 'child'
  callForceFully?: boolean
}

interface searchMultipleContentModelRecordsByFieldKeyValue {
  modelInternalNames: string,
  fieldKey?: string,
  fieldsToQuery?: string,
  sortBy?: string,
  orderBy?: string,
  limit?: string,
  skip?: string,
  enableSSR?: boolean,
  ssrKey?: string,
  fieldType?: 'parent' | 'child',
  searchText: string
}
interface fetchContentModelRecordsByFieldKeyValue {

  modelInternalName: string;
  fieldKey: string;
  fieldValue: string;
  fieldsToQuery: string;
  sortBy?: string;
  orderBy?: string;
  contentDataSortBy?: string; // when we want records to be sorted by the STATIC fields like, (created_at,modified_at, any_id's
                              // e.g(content_data_model_idm or id, etc.) at that time need to provide same field in
                              // [sortBy and contentDataSortBy] to get the result in sorted manner, else for dynamic fields like,
                              // (page_title_esi, publish_date_esi, etc.) just need to provide [sortBy and sortType])
  limit?:string;
  skip?:string;
  relationField?:string;
  relationFieldDataToQuery?:string;
  filter?: any;
  enableSSR?: any;
  ssrKey?: string;
  fieldType?: 'parent' | 'child'
}

export class ContentService {
  private static __pageData__: any;

  static async getPageDataBySlug({
                                   pageSlug,
                                   versionId,
                                   lang,
                                 }: GetPageDataRequest) {
    //When pageSlug ends with any extension like '.html', '.docx' or any that time we will not add the '/' at the end of the pageSlug
   const slugs = !pageSlug.substring(pageSlug.length - 6).includes('.');
    if(pageSlug && /\/{2,}$/.test(pageSlug)){
      pageSlug = pageSlug.replace(/\/+$/, '')
    }
    if (!pageSlug.endsWith('/') && slugs) {
      pageSlug = pageSlug + '/';
      window.location.pathname = pageSlug;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const appendQuery = urlParams.get('aq');

    let url = `/apis/content/v1/collection/find-by-slug?page_slug=${pageSlug}`;
    if (versionId) {
      url += `&version_id=${versionId}`;
    }
    if(appendQuery === 'true'){
      url += `&isAuto=true&searchTerm=${urlParams.get('st')}`
    }
    const response = await Http.get({
      key: 'page',
      url: url,
      componentId: '',
      enableSSR: true,
      language: lang,
      appendLanguageFromQueryParams: true,
    });
    if (response.data.Status === 'success') {

    if(response.data.Data?.REDIRECT_URL?.length){
      let new_rediract_url = response.data.Data?.REDIRECT_URL;

      if (versionId) {
        new_rediract_url += `&version_id=${versionId}`;
      }
      if(appendQuery === 'true'){
        new_rediract_url += `&isAuto=true&searchTerm=${urlParams.get('st')}`
      }
        window.location.pathname = new_rediract_url;
    }
      return response.data.Data;
    } else {
      // throw new Error('ObjectNotFound');
    }
  }


  static async getPageDataBySlugV2({
    pageSlug,
    versionId,
    lang,
  }: GetPageDataRequest) {
    //When pageSlug ends with any extension like '.html', '.docx' or any that time we will not add the '/' at the end of the pageSlug
    const slugs = !pageSlug.substring(pageSlug.length - 6).includes('.');

    if (!pageSlug.endsWith('/') && slugs) {
      pageSlug = pageSlug + '/';
      window.location.pathname = pageSlug;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const appendQuery = urlParams.get('aq');

    let url = `/apis/content/v2/collection/find-by-slug?page_slug=${pageSlug}`;
    if (versionId) {
      url += `&version_id=${versionId}`;
    }
    if (appendQuery === 'true') {
      url += `&isAuto=true&searchTerm=${urlParams.get('st')}`;
    }
    const response = await Http.get({
      key: 'page',
      url: url,
      componentId: '',
      enableSSR: true,
      language: lang,
      appendLanguageFromQueryParams: true,
    });
    if (response.data.Status === 'success') {
      if (response.data.Data?.REDIRECT_URL?.length) {
        let new_rediract_url = response.data.Data?.REDIRECT_URL;

        if (versionId) {
          new_rediract_url += `&version_id=${versionId}`;
        }
        if (appendQuery === 'true') {
          new_rediract_url += `&isAuto=true&searchTerm=${urlParams.get('st')}`;
        }
        window.location.pathname = new_rediract_url;
      }
      return response.data.Data;
    } else {
      throw new Error('ObjectNotFound');
    }
  }

  static async getCollectionRecordsByCollectionInternalName({
                                                              modelInternalName,
                                                            }: GetCollectionRecordsByInternalName) {
    const url = `/apis/content/v1/contents/content-data/${modelInternalName}?fieldsToQuery=id,title,current_version_id,published_version_id&is_call_fromi_frame=true`;
    const response = await Http.get({
      key: 'collection-record',
      url: url,
      componentId: '',
      enableSSR: false,
      appendLanguageFromQueryParams: true,
    });
    if (response.data.Status === 'success') {
      return response.data.Data;
    } else {
      // throw new Error('ObjectNotFound');
    }
  }

  static async getCollectionRecordsByCollectionInternalNameV2({
    modelInternalName,
  }: GetCollectionRecordsByInternalName) {
    const url = `/apis/content/v2/contents/content-data/${modelInternalName}?fieldsToQuery=id,title,current_version_id,published_version_id&is_call_fromi_frame=true`;
    const response = await Http.get({
      key: 'collection-record',
      url: url,
      componentId: '',
      enableSSR: false,
      appendLanguageFromQueryParams: true,
    });
    if (response.data.Status === 'success') {
      return response.data.Data;
    } else {
      throw new Error('ObjectNotFound');
    }
  }


  static async getCollectionTypeContentById({
                                              id,
                                              versionId,
                                              modelName,
                                              componentId,
                                              ssrKey,
                                              enableSSR,
                                            }: GetCollectionContentByIdRequest) {
    let url = `/apis/content/v1/collection/${modelName}/${id}`;
    if (!IsCMSApp) {
      url += "?is_call_fromi_frame=true";
    }
    const response = await Http.get({
      key: ssrKey,
      url: url,
      componentId,
      enableSSR,
      appendLanguageFromQueryParams: true,
    });
    if (response.data.Status === 'success') {
      return response.data.Data;
    } else {
      // throw new Error('ObjectNotFound');
    }
  }
  
  static async getCollectionTypeContentByIdV2({
                                                  id,
                                                  versionId,
                                                  modelName,
                                                  componentId,
                                                  ssrKey,
                                                  enableSSR,
  }: GetCollectionContentByIdRequest) {
    let url = `/apis/content/v2/collection/${modelName}/${id}`;
    if (!IsCMSApp) {
      url += '?is_call_fromi_frame=true';
    }
    const response = await Http.get({
      key: ssrKey,
      url: url,
      componentId,
      enableSSR,
      appendLanguageFromQueryParams: true,
    });
    if (response.data.Status === 'success') {
      return response.data.Data;
    } else {
      throw new Error('ObjectNotFound');
    }
  }


  static async getRecordById({
                              id,
                              versionId,
                              modelName,
                              componentId,
                              ssrKey,
                              enableSSR,
                              }: GetCollectionContentByIdRequest) {
    const url = `/content/v1/content-models/${modelName}/records/${id}`;
    const response = await Http.get({
      key: ssrKey,
      url: url,
      componentId,
      enableSSR,
    });

    if (response.data.Status === 'success') {
      const response_data = {...response.data.Data, ...response.data.Data.version_data};
      delete response_data['version_data'];
      return response_data;
    } else {
      // throw new Error('ObjectNotFound');
    }
}

static async getRecordByIdV2({
                              // not in use
                              id,
                              versionId,
                              modelName,
                              componentId,
                              ssrKey,
                              enableSSR,
                            }: GetCollectionContentByIdRequest) {
    const url = `/content/v2/content-models/${modelName}/records/${id}`;
    const response = await Http.get({
      key: ssrKey,
      url: url,
      componentId,
      enableSSR,
    });

    if (response.data.Status === 'success') {
      const response_data = {
        ...response.data.Data,
        ...response.data.Data.version_data,
      };
      delete response_data['version_data'];
      return response_data;
    } else {
      throw new Error('ObjectNotFound');
    }
}

  static async getLocationsByPlaceName({
    radius,
    modelInternalName,
    fieldKey,
    fieldValue,
    fieldsToQuery,
    sortBy,
    sortType,
    limit,
    skip,
    relationField,
    relationFieldDataToQuery,
    filter,
    contentDataSortBy,
    enableSSR = true,
    fieldType = 'parent',
  }: getLocationsByPlaceName) {
    try {
      let url = `/apis/content-manager-service/public/v1/collection/maps/preview/place?radius=${radius}&field_name=${fieldKey}&field_value=${fieldValue}&internal_name=${modelInternalName}`;

      if (fieldsToQuery) {
        url += `&fields=${fieldsToQuery}`;
      }
      if (sortBy) url += `&sort_by=${sortBy}`;

      if (sortType) url += `&order_by=${sortType}`;

      if (limit) url += `&limit=${limit}`;

      if (skip) url += `&skip=${skip}`;

      if (relationField) url += `&relation_field=${relationField}`;

      if (relationFieldDataToQuery)
        url += `&relationFieldDataToQuery=${relationFieldDataToQuery}`;

      if (filter) url += `&filter=${filter}`;

      if (contentDataSortBy)
        url += `&content_data_sort_by=${contentDataSortBy}`;

      if (fieldType) url += `&field_type=${fieldType}`;

      const response = await Http.get({
        key: modelInternalName,
        url: url,
        componentId: fieldKey,
        enableSSR: enableSSR,
      });
      if (response && response.data) {
        return response.data;
      } else {
        // throw new Error('ObjectNotFound');
      }
    } catch (e) {
      // throw new Error('ObjectNotFound');
    }
  }

  static async getLocationsByPlaceNameV2({
    // not in use
    radius,
    modelInternalName,
    fieldKey,
    fieldValue,
    fieldsToQuery,
    sortBy,
    sortType,
    limit,
    skip,
    relationField,
    relationFieldDataToQuery,
    filter,
    contentDataSortBy,
    enableSSR = false,
    fieldType = 'parent',
  }: getLocationsByPlaceName) {
    try {
      let url = `/apis/content-manager-service/public/v2/collection/maps/preview/place?radius=${radius}&field_name=${fieldKey}&field_value=${fieldValue}&internal_name=${modelInternalName}`;

      if (fieldsToQuery) {
        url += `&fields=${fieldsToQuery}`;
      }
      if (sortBy) url += `&sort_by=${sortBy}`;

      if (sortType) url += `&order_by=${sortType}`;

      if (limit) url += `&limit=${limit}`;

      if (skip) url += `&skip=${skip}`;

      if (relationField) url += `&relation_field=${relationField}`;

      if (relationFieldDataToQuery)
        url += `&relationFieldDataToQuery=${relationFieldDataToQuery}`;

      if (filter) url += `&filter=${filter}`;

      if (contentDataSortBy)
        url += `&content_data_sort_by=${contentDataSortBy}`;

      if (fieldType) url += `&field_type=${fieldType}`;
      const response = await Http.get({
        key: modelInternalName,
        url: url,
        componentId: fieldKey,
        enableSSR: enableSSR,
      });
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('ObjectNotFound');
      }
    } catch (e) {
      throw new Error('ObjectNotFound');
    }
  }


  static async getSingleTypeContent({
                                      versionId,
                                      modelName,
                                      componentId,
                                      ssrKey,
                                      enableSSR,
                                      callForceFully,
                                    }: GetSingleTypeContentRequest) {
    let url = `/apis/content/v1/single/${modelName}/detail`;
    if (versionId) {
      url += `?version_id=${versionId}`;
    }
    const response = await Http.get({
      key: ssrKey,
      url: url,
      componentId,
      enableSSR,
      callForceFully,
      appendLanguageFromQueryParams: true
    });
    if (response.data.Status === 'success') {
      return response.data.Data;
    } else {
      // throw new Error('ObjectNotFound');
    }
  }

  static async getSingleTypeContentV2({
                                        versionId,
                                        modelName,
                                        componentId,
                                        ssrKey,
                                        enableSSR,
                                        callForceFully,
                                      }: GetSingleTypeContentRequest) {
    let url = `/apis/content/v2/single/${modelName}/detail`;
    if (versionId) {
      url += `?version_id=${versionId}`;
    }
    const response = await Http.get({
      key: ssrKey,
      url: url,
      componentId,
      enableSSR,
      callForceFully,
      appendLanguageFromQueryParams: true,
    });
    if (response.data.Status === 'success') {
      return response.data.Data;
    } else {
      throw new Error('ObjectNotFound');
    }
  }

  static async getMenuById(menuId) {
    try {
      const url = `/apis/menu-service/public/v1/menu-items-by-language/${menuId}?dataFieldsToQuery=id,internal_name,title,page_slug,current_version_id`;
      const response = await Http.get({
        key: 'menu-exp-cmp',
        url: url,
        componentId: menuId,
        enableSSR: true,
        appendLanguageFromQueryParams: true
      });
      if (response && response.data) {
        return response.data;
      } else {
        // throw new Error('ObjectNotFound');
      }
    } catch (e) {
      // throw new Error(e);
    }
  }

  static async getMenuByIdV2(menuId) {
    try {
      const url = `/apis/menu-service/public/v2/menu-items-by-language/${menuId}?dataFieldsToQuery=id,internal_name,title,page_slug,current_version_id`;
      const response = await Http.get({
        key: 'menu-exp-cmp',
        url: url,
        componentId: menuId,
        enableSSR: true,
        appendLanguageFromQueryParams: true,
      });
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('ObjectNotFound');
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static async searchMultipleContentModelRecordsByFieldKeyValuePOST({
                                                                      modelInternalNames,
                                                                      fieldKey,
                                                                      fieldsToQuery,
                                                                      sortBy,
                                                                      orderBy,
                                                                      limit,
                                                                      skip,
                                                                      enableSSR = false,
                                                                      ssrKey,
                                                                      searchText
                                                                    }: searchMultipleContentModelRecordsByFieldKeyValue) {
    try {
      let url = `/apis/search-service/public/v1/contents/content-search`;

      if (searchText) url += `?content_search=${searchText}`;
      if (modelInternalNames) url += `&internal_names=${modelInternalNames}`;
      if (sortBy) url += `&sort_by=${sortBy}`;
      if (orderBy) url += `&order_by=${orderBy}`;
      if (limit) url += `&limit=${limit}`;
      if (skip) url += `&skip=${skip}`;
      if (fieldsToQuery) url += `&fields=${fieldsToQuery}`;

      const response = await Http.post({
        key: ssrKey,
        url: url,
        componentId: fieldKey,
        enableSSR: enableSSR,
        config: {
          body: {
            "locale": CommonUtilities.getLanguage()
          }
        }
        });
      if (response && response.data) {
        return response.data;
      } else {
        // throw new Error('ObjectNotFound');
      }
    } catch (e) {
      // throw new Error('ObjectNotFound');
    }
  }

  static async searchContentModelRecordsByFieldKeyValuePOSTV2({
                                                                // not in use
                                                                modelInternalName,
                                                                fieldKey,
                                                                fieldValue,
                                                                fieldsToQuery,
                                                                sortBy,
                                                                orderBy,
                                                                limit,
                                                                skip,
                                                                relationField,
                                                                relationFieldDataToQuery,
                                                                filter,
                                                                enableSSR = false,
                                                                ssrKey,
                                                                fieldType = 'parent',
                                                              }: searchContentModelRecordsByFieldKeyValue) {
    try {
      const url = `/content/v2/content-models/${modelInternalName}/records/search`;

      const body: any = {};

      if (fieldKey) body['field_name'] = fieldKey;
      if (fieldValue) body['field_value'] = fieldValue;
      if (fieldsToQuery) body['fields_data_to_query'] = fieldsToQuery;
      if (sortBy) body['sort_by'] = sortBy;
      if (orderBy) body['order_by'] = orderBy;
      if (limit) body['limit'] = limit;
      if (skip) body['offset'] = skip;
      if (relationField) body['relation_field'] = relationField;
      if (relationFieldDataToQuery)
        body['relationFieldDataToQuery'] = relationFieldDataToQuery;
      if (filter) body['filter'] = filter;
      if (fieldType) body['field_type'] = `${fieldType}`;
      
      const locale = CommonUtilities.getLanguage();
      if(locale) body['locale'] = locale;

      const response = await Http.post({
        key: ssrKey,
        url: url,
        componentId: fieldKey,
        enableSSR: enableSSR,
        config: {
          body,
        },
      });
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('ObjectNotFound');
      }
    } catch (e) {
      throw new Error('ObjectNotFound');
    }
  }

  static async searchContentModelRecordsByFieldKeyValuePOST({
                                                          modelInternalName,
                                                          fieldKey,
                                                          fieldValue,
                                                          fieldsToQuery,
                                                          sortBy,
                                                          orderBy,
                                                          limit,
                                                          skip,
                                                          relationField,
                                                          relationFieldDataToQuery,
                                                          filter,
                                                          enableSSR=false,
                                                          ssrKey,
                                                          fieldType='parent',
                                                        }:searchContentModelRecordsByFieldKeyValue){
      try{
        const url = `/content/v1/content-models/${modelInternalName}/records/search`

        const body: any= {};

        if(fieldKey)
          body['field_name'] = fieldKey;
        if(fieldValue)
          body['field_value'] = fieldValue;
        if(fieldsToQuery)
          body['fields_data_to_query'] = fieldsToQuery;
        if(sortBy)
          body['sort_by']= sortBy;
        if(orderBy)
          body['order_by']= orderBy;
        if(limit)
          body['limit']= limit;
        if(skip)
          body['offset']= skip;
        if(relationField)
          body['relation_field']= relationField;
        if(relationFieldDataToQuery)
          body['relationFieldDataToQuery']= relationFieldDataToQuery;
        if(filter)
          body['filter']= filter;
        if(fieldType)
          body['field_type']=`${fieldType}`

        const response = await Http.post({
          key: ssrKey,
          url: url,
          componentId: fieldKey,
          enableSSR: enableSSR,
          config: {
            body,
          },
        });
        if (response && response.data) {
          return contentServiceResponseParser(response.data);
        } else {
          // throw new Error('ObjectNotFound');
        }
      }catch(e){
        // throw new Error('ObjectNotFound');
      }
  }

  static async searchContentModelRecordsByFieldKeyValueGET({
                                                            modelInternalName,
                                                            fieldKey,
                                                            fieldValue,
                                                            fieldsToQuery,
                                                            sortBy,
                                                            orderBy,
                                                            limit,
                                                            skip,
                                                            relationField,
                                                            relationFieldDataToQuery,
                                                            filter,
                                                            ssrKey,
                                                            enableSSR=false,
                                                            fieldType='parent',
                                                            callForceFully
                                                          }:searchContentModelRecordsByFieldKeyValue){
try{
    let url = `/content/v1/content-models/${modelInternalName}/records/search?field_name=${fieldKey}&field_value=${fieldValue}&fields_data_to_query=${fieldsToQuery}`

    if(sortBy)
      url += `&sort_by=${sortBy}`;
    if(orderBy)
      url += `&order_by=${orderBy}`;
    if(limit)
      url += `&limit=${limit}`;
    if(skip)
        url += `&offset=${skip}`;
    if(relationField)
      url += `&relation_field=${relationField}`;
    if(relationFieldDataToQuery)
      url += `&relationFieldDataToQuery=${relationFieldDataToQuery}`;
    if(filter)
      url += `&filter=${filter}`;
    if(fieldType)
      url += `&field_type=${fieldType}`;

    const response = await Http.get({
      key: ssrKey,
      url: url,
      componentId: fieldKey,
      enableSSR: enableSSR,
      callForceFully,
    });

    if (response && response.data) {
    return contentServiceResponseParser(response.data);
    } else {
    // throw new Error('ObjectNotFound');
    }
    }catch(e){
    // throw new Error('ObjectNotFound');
    }
}


static async searchContentModelRecordsByFieldKeyValueGETV2({
                                                            modelInternalName,
                                                            fieldKey,
                                                            fieldValue,
                                                            fieldsToQuery,
                                                            sortBy,
                                                            orderBy,
                                                            limit,
                                                            skip,
                                                            relationField,
                                                            relationFieldDataToQuery,
                                                            filter,
                                                            ssrKey,
                                                            enableSSR = false,
                                                            fieldType = 'parent',
                                                            callForceFully,
                                                          }: searchContentModelRecordsByFieldKeyValue) {
  try {
    let url = `/content/v2/content-models/${modelInternalName}/records/search?field_name=${fieldKey}&field_value=${fieldValue}&fields_data_to_query=${fieldsToQuery}`;

    if (sortBy) url += `&sort_by=${sortBy}`;
    if (orderBy) url += `&order_by=${orderBy}`;
    if (limit) url += `&limit=${limit}`;
    if (skip) url += `&offset=${skip}`;
    if (relationField) url += `&relation_field=${relationField}`;
    if (relationFieldDataToQuery)
      url += `&relationFieldDataToQuery=${relationFieldDataToQuery}`;
    if (filter) url += `&filter=${filter}`;
    if (fieldType) url += `&field_type=${fieldType}`;

    const response = await Http.get({
      key: ssrKey,
      url: url,
      componentId: fieldKey,
      enableSSR: enableSSR,
      callForceFully,
    });

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('ObjectNotFound');
    }
  } catch (e) {
    throw new Error('ObjectNotFound');
  }
}

  static async getContentModelRecordsByFieldKeyValue({
                                                       modelInternalName,
                                                       fieldKey,
                                                       fieldValue,
                                                       fieldsToQuery,
                                                       sortBy,
                                                       sortType,
                                                       limit,
                                                       skip,
                                                       relationField,
                                                       relationFieldDataToQuery,
                                                       filter,
                                                       contentDataSortBy,
                                                       enableSSR=true,
                                                       fieldType='parent',
                                                       callForceFully,
                                                     }:GetContentModelRecordsByFieldKeyValue) {
    try {
      let url = `/apis/content/v1/collection/find-by-field?field_name=${fieldKey}&field_value=${fieldValue}&internal_name=${modelInternalName}&fieldsDataToQuery=${fieldsToQuery}`;

      if(sortBy)
        url += `&sort_by=${sortBy}`;
      if(sortType)
        url += `&order_by=${sortType}`;
      if(limit)
        url += `&limit=${limit}`;
      if(skip)
        url += `&skip=${skip}`;
      if(relationField)
        url += `&relation_field=${relationField}`;
      if(relationFieldDataToQuery)
        url += `&relationFieldDataToQuery=${relationFieldDataToQuery}`;
      if(filter)
        url += `&filter=${filter}`;
      if(contentDataSortBy)
        url += `&content_data_sort_by=${contentDataSortBy}`;
      if(fieldType)
        url += `&field_type=${fieldType}`

      const response = await Http.get({
        key: modelInternalName,
        url: url,
        componentId: fieldKey,
        enableSSR: enableSSR,
        callForceFully,
        appendLanguageFromQueryParams: true,
      });
      if (response && response.data) {
        return response.data;
      } else {
        // throw new Error('ObjectNotFound');
      }
    } catch (e) {
      // throw new Error('ObjectNotFound');
    }
  }


  static async getContentModelRecordsByFieldKeyValueV2({
                                                        modelInternalName,
                                                        fieldKey,
                                                        fieldValue,
                                                        fieldsToQuery,
                                                        sortBy,
                                                        sortType,
                                                        limit,
                                                        skip,
                                                        relationField,
                                                        relationFieldDataToQuery,
                                                        filter,
                                                        contentDataSortBy,
                                                        enableSSR,
                                                        fieldType = 'parent',
                                                        callForceFully,
                                                      }: GetContentModelRecordsByFieldKeyValue) {
    try {
      let url = `/apis/content/v2/collection/find-by-field?field_name=${fieldKey}&field_value=${fieldValue}&internal_name=${modelInternalName}&fieldsDataToQuery=${fieldsToQuery}`;

      if (sortBy) url += `&sort_by=${sortBy}`;
      if (sortType) url += `&order_by=${sortType}`;
      if (limit) url += `&limit=${limit}`;
      if (skip) url += `&skip=${skip}`;
      if (relationField) url += `&relation_field=${relationField}`;
      if (relationFieldDataToQuery)
        url += `&relationFieldDataToQuery=${relationFieldDataToQuery}`;
      if (filter) url += `&filter=${filter}`;
      if (contentDataSortBy)
        url += `&content_data_sort_by=${contentDataSortBy}`;
      if (fieldType) url += `&field_type=${fieldType}`;

      const response = await Http.get({
        key: modelInternalName,
        url: url,
        componentId: fieldKey,
        enableSSR: enableSSR,
        callForceFully,
        appendLanguageFromQueryParams: true,
      });
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('ObjectNotFound');
      }
    } catch (e) {
      throw new Error('ObjectNotFound');
    }
  }

  static async fetchContentModelRecordsByFieldKeyValue({
                                                         modelInternalName,
                                                         fieldKey,
                                                         fieldValue,
                                                         fieldsToQuery,
                                                         sortBy,
                                                         orderBy,
                                                         limit,
                                                         skip,
                                                         relationField,
                                                         relationFieldDataToQuery,
                                                         filter,
                                                         contentDataSortBy,
                                                         enableSSR=false,
                                                         fieldType='parent'
                                                       }:fetchContentModelRecordsByFieldKeyValue) {
    try {
      const url = `/apis/content/v1/collection/find-by-field`;

      const body: any= {};

      if(modelInternalName)
        body['internal_name'] = modelInternalName;
      if(fieldKey)
        body['field_name'] = fieldKey;
      if(fieldsToQuery)
        body['field_value'] = fieldValue;
      if(sortBy)
        body['sort_by']= sortBy;
      if(orderBy)
        body['order_by']= orderBy;
      if(limit)
        body['limit']= limit;
      if(skip)
        body['skip']= skip;
      if(relationField)
        body['relation_field']= relationField;
      if(relationFieldDataToQuery)
        body['relationFieldDataToQuery']= relationFieldDataToQuery;
      if(filter)
        body['filter']= filter;
      if(contentDataSortBy)
        body['content_data_sort_by']= contentDataSortBy;
      if(fieldType)
        body['field_type']=`${fieldType}`

      const response = await Http.post({
        key: modelInternalName,
        url: url,
        componentId: fieldKey,
        enableSSR: enableSSR,
        config: {
          body,
        },
      });
      if (response && response.data) {
        return response.data;
      } else {
        // throw new Error('ObjectNotFound');
      }
    } catch (e) {
      // throw new Error('ObjectNotFound');
    }
  }

  
  static async fetchContentModelRecordsByFieldKeyValueV2({
                                                          // Not in use
                                                          modelInternalName,
                                                          fieldKey,
                                                          fieldValue,
                                                          fieldsToQuery,
                                                          sortBy,
                                                          orderBy,
                                                          limit,
                                                          skip,
                                                          relationField,
                                                          relationFieldDataToQuery,
                                                          filter,
                                                          contentDataSortBy,
                                                          enableSSR = false,
                                                          ssrKey,
                                                          fieldType = 'parent',
                                                        }: fetchContentModelRecordsByFieldKeyValue) {
    try {
      const url = `/apis/content/v2/collection/find-by-field`;

      const body: any = {};

      if (modelInternalName) body['internal_name'] = modelInternalName;
      if (fieldKey) body['field_name'] = fieldKey;
      if (fieldsToQuery) body['field_value'] = fieldValue;
      if (sortBy) body['sort_by'] = sortBy;
      if (orderBy) body['order_by'] = orderBy;
      if (limit) body['limit'] = limit;
      if (skip) body['skip'] = skip;
      if (relationField) body['relation_field'] = relationField;
      if (relationFieldDataToQuery)
        body['relationFieldDataToQuery'] = relationFieldDataToQuery;
      if (filter) body['filter'] = filter;
      if (contentDataSortBy) body['content_data_sort_by'] = contentDataSortBy;
      if (fieldType) body['field_type'] = `${fieldType}`;

      const response = await Http.post({
        key: ssrKey,
        url: url,
        componentId: fieldKey,
        enableSSR: enableSSR,
        config: {
          body,
        },
      });
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('ObjectNotFound');
      }
    } catch (e) {
      throw new Error('ObjectNotFound');
    }
  }

  static async getFormFieldsByFormId({ formId }: { formId: string }) {
    try {
      const response = await Http.get({
        key: '',
        url: `/apis/setting-service/public/v1/forms/${formId}?fields=id,form_builder,display_name,description,form_type,submit_btn_txt,name,success_action,workspace_id,is_captcha_enabled`,
        componentId: '',
      });

      if (response && response.data) {
        return response.data;
      } else {
        // throw new Error('ObjectNotFound');
      }
    } catch (e) {
      // throw new Error('ObjectNotFound');
    }
  }

  static async getForms() {
    try {
      const response = await Http.get({
        key: '',
        url: `/apis/setting-service/public/v1/forms?fields=id,form_builder,display_name,description,form_type,submit_btn_txt,name,success_action,workspace_id,is_captcha_enabled`,
        componentId: '',
      });

      if (response && response.data) {
        return response.data;
      } else {
        // throw new Error('ObjectNotFound');
      }
    } catch (e) {
      // throw new Error('ObjectNotFound');
    }
  }

  static getPageData() {
    return this.__pageData__;
  }

  static setPageData(pageData) {
    this.__pageData__ = pageData;
  }

  static parseVariableSafeValue(variableName) {
    // return DOMPurify.sanitize(variableName);
    return variableName;
  }

  static parseVariableValue(variableName) {
    try {
      const pageData = this.__pageData__;
      // console.log(pageData);
      let returnValue = variableName;
      if (
        variableName &&
        variableName.startsWith('{') &&
        variableName.endsWith('}')
      ) {
        const tmp = variableName.replace('{', '').replace('}', '');
        returnValue = this.parseVariableSafeValue(eval(tmp));
      }
      if (returnValue && returnValue.indexOf('pageData.STORE_HASH') >= 0) {
        if (CommonUtilities.getEnvironmentType() === 'PRODUCTION') {
          returnValue = returnValue.replace(/\{pageData.STORE_HASH\}/ig, '');
        } else {
          returnValue = returnValue.replace(/\{pageData.STORE_HASH\}/ig, `/${CommonUtilities.getStoreHash()}`);
        }
      }
      return this.parseVariableSafeValue(returnValue);
    } catch (e) {
      console.error(e);
      return variableName;
    }
  }

  static prepareImageUrl({imagePath, fileType}) {
    return `${ContentService.parseImageURL(imagePath)?.imageUrl}`
  }

    static getMediaHostName() {
      // if(process.env.REACT_APP_BUILD_TARGET !== 'app') {
      //   const currentURL = new URL(window.document.location.href);
      //   return getUIBuilderMediaHost(currentURL.searchParams.get('wh'), '');
      // } else {
      //   return '';
      // }
      return '';
    }

  static parseImageURL(image) {
    if (Array.isArray(image)) {
      image = image[0];
    }

    const isUrl = (urlString : any) => {
      try {
        return Boolean(new URL(urlString));
      } catch(e) {
        return false;
      }
    }

    if(isUrl(image)) {
      return { imageUrl: image };
    }

    try {
      const imageData = JSON.parse(image);
      const mediaHostName = ContentService.getMediaHostName();
      if(imageData && imageData.alt_text) {
        imageData.altText = imageData.alt_text;
      }
      return {
        imageUrl: `${mediaHostName}/${imageData?.absolutePath}`,
        ...imageData,
      };
    } catch (error) {
      const image_url_prefix = `${CommonUtilities.getGoogleCdnMediaPrefix()}/mm-images/public/v1/render`;

      if (image?.length) {
        return {
          imageUrl: `${image_url_prefix}/${CommonUtilities.getWorkspaceId()}/${image}`,
        };
      } else {
        return { imageUrl: '' };
      }
    }
  }

}
