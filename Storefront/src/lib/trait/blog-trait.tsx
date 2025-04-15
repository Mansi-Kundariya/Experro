import React, { useState, useCallback, useEffect } from 'react';
import { TraitInterface } from '../../interfaces/trait.interface';
import { ContentService } from '../../services';
import Select from 'react-select';
// import { InputActionMeta } from 'react-select';
const ExpBlogCard: React.FC = ({
  value,
  changeHandler,
}: {
  value: any;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState<any>(JSON.parse(value));
  const [categoryNames, setCategoryNames] = useState([]);
  const [authorNames, setAuthorNames] = useState([]);
  const [posts, setPosts] = useState([]);
  const [defaultSelections, setDefaultSelections] = useState<any>({});
  const [freeFormData, setFreeFormData] = useState<any>(
    traitData?.blog_data
      ? traitData.blog_data
      : {
          title: '',
          category_ids: '',
          author_ids: '',
          posts: '',
          limit: 4,
        }
  );

  const handleFreeFormData = (event, field) => {
    if (field === 'category_ids') {
      const arrToString = event?.map((item) => item?.value)?.toString();
      setFreeFormData({
        ...freeFormData,
        category_ids: arrToString,
        posts: '',
        author_ids: '',
      });
    } else if (field === 'author_ids') {
      const arrToString = event?.map((item) => item?.value)?.toString();
      setFreeFormData({
        ...freeFormData,
        author_ids: arrToString,
        posts: '',
        category_ids: '',
      });
    } else if (field === 'posts') {
      const arrToString = event?.map((item) => item?.value)?.toString();
      const getLimit = event?.length && event?.length > 4 ? event?.length : 4;
      setFreeFormData({
        ...freeFormData,
        limit: getLimit,
        posts: arrToString,
        category_ids: '',
        author_ids: '',
      });
    }
  };

  // Function will be handling all the input [trait] changes
  const handelInputChange = useCallback(
    (field: string, event: any) => {
      if (field === 'show_featured_blogs') {
        // if checkbox is value got change then we need status for checkbox only
        setFreeFormData({
          ...freeFormData,
          [`${field}`]: event.target.checked,
        });
      } else if (
        field === 'category_ids' ||
        field === 'author_ids' ||
        field === 'posts'
      ) {
        handleFreeFormData(event, field);
      } else {
        setFreeFormData({
          ...freeFormData,
          [`${field}`]: event?.target?.value,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [traitData, freeFormData]
  );

  const saveTabsSettings = () => {
    setTraitData({ ...traitData, ['blog_data']: freeFormData });
  };

  const findDefaultSelections = (
    selectionFor: 'category_ids' | 'posts' | 'author_ids',
    itemList: any
  ) => {
    const selectedIds: any = traitData?.blog_data?.[selectionFor];
    if (!itemList?.length && !selectedIds?.length) return [];

    const selectedOptions: any = [];

    itemList.forEach((item: any) => {
      if (selectedIds?.includes(item.id)) {
        selectedOptions.push({
          value: item.id,
          label: item.title,
        });
      }
    });
    return selectedOptions;
  };

  //Function to get the data for the Category Name
  const getContentModelList = useCallback(
    async (modelInternalName?: string, setState?: any) => {
      try {
        const contentModelData =
          await ContentService.getCollectionRecordsByCollectionInternalName({
            modelInternalName: `${modelInternalName}`,
          });

        setState(contentModelData?.items);
        const selectedOptions = findDefaultSelections(
          modelInternalName === 'categories'
            ? 'category_ids'
            : modelInternalName === 'author'
            ? 'author_ids'
            : 'posts',
          contentModelData?.items
        );
        if (selectedOptions?.length) {
          setDefaultSelections({
            ...defaultSelections,
            [`${modelInternalName}`]: selectedOptions,
          });
        }
      } catch (error: any) {
        //TODO: add proper error message
        console.error(error);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [categoryNames, authorNames]
  );

  useEffect(() => {
    getContentModelList('categories', setCategoryNames);
    getContentModelList('author', setAuthorNames);
    getContentModelList('posts', setPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    changeHandler(JSON.stringify(traitData));
  }, [
    traitData,
    freeFormData,
    freeFormData.show_featured_blogs,
    changeHandler,
  ]);

  return (
    <>
      <div className="custom-fields">
        <div className="gjs-field">
          <div className="deviceImageTab">
            <div>
              <div className="gjs-field">
                <label className="gjs-label">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  onChange={(event: any) => handelInputChange('title', event)}
                  value={freeFormData?.title}
                />
              </div>
              {/* Check box for featured blog */}
              {/* <div className="gjs-trt-trait__wrp gjs-trt-trait__wrp-showTagLine">
                <div className="gjs-trt-trait gjs-trt-trait--checkbox">
                  <div className="gjs-label-wrp" data-label="">
                    <div className="gjs-label" title="Show Tag Line">Show Featured Blog</div>
                  </div>
                  <div className="gjs-field-wrp gjs-field-wrp--checkbox" data-input="">
                    <label className="gjs-field gjs-field-checkbox" data-input="">
                      <input type="checkbox"
                        id="show_featured_blogs"
                        name="show_featured_blogs"
                        value={freeFormData?.show_featured_blogs}
                        onChange={(event: any) =>
                          handelInputChange('show_featured_blogs', event)
                        }
                      />
                      <i className="gjs-chk-icon"></i>
                    </label>
                  </div>
                </div>
              </div> */}

              {/*Category Name Drop-Down --START--*/}
              {freeFormData?.posts?.split(',')?.length < 2 &&
                freeFormData?.posts?.split(',')?.includes('') &&
                freeFormData?.author_ids?.split(',')?.length < 2 &&
                freeFormData?.author_ids?.split(',')?.includes('') && (
                  <div className="gjs-field">
                    <div className="gjs-label">
                      Category Name
                      <a
                        className="text-right"
                        style={{ float: 'right' }}
                        onClick={() =>
                          getContentModelList('categories', setCategoryNames)
                        }>
                        Refresh
                      </a>
                    </div>

                    <div className="gjs-field-select custom-gjs-field-select">
                      <Select
                        // menuIsOpen={true}
                        key={defaultSelections?.categories
                          ?.map((item) => item.value)
                          .join(',')}
                        placeholder={'Select Category Name'}
                        onChange={(event: any) =>
                          handelInputChange('category_ids', event)
                        }
                        closeMenuOnSelect={false}
                        classNamePrefix={'custom-select_blog'}
                        isMulti={true}
                        defaultValue={defaultSelections?.categories}
                        options={categoryNames?.map((item: any) => {
                          return { value: item?.id, label: item?.title };
                        })}
                      />
                      <div className="gjs-sel-arrow">
                        <div className="gjs-d-s-arrow"></div>
                      </div>
                    </div>
                  </div>
                )}
              {/*Category Name Drop-Down --END--*/}

              {/*Author Name Drop-Down --START--*/}
              {freeFormData?.posts?.split(',')?.length < 2 &&
                freeFormData?.posts?.split(',')?.includes('') &&
                freeFormData?.category_ids?.split(',')?.length < 2 &&
                freeFormData?.category_ids?.split(',')?.includes('') && (
                  <div className="gjs-field">
                    <div className="gjs-label">
                      Author Name
                      <a
                        className="text-right"
                        style={{ float: 'right' }}
                        onClick={() =>
                          getContentModelList('author', setAuthorNames)
                        }>
                        Refresh
                      </a>
                    </div>
                    <div className="gjs-field-select custom-gjs-field-select">
                      <Select
                        key={defaultSelections?.author
                          ?.map((item) => item.value)
                          .join(',')}
                        placeholder={'Select Author Name'}
                        onChange={(event: any) =>
                          handelInputChange('author_ids', event)
                        }
                        closeMenuOnSelect={false}
                        isMulti={true}
                        classNamePrefix={'custom-select_blog'}
                        defaultValue={defaultSelections?.author}
                        options={authorNames?.map((item: any) => {
                          return {
                            ...item,
                            value: item?.id,
                            label: item?.title,
                          };
                        })}
                      />
                      <div className="gjs-sel-arrow">
                        <div className="gjs-d-s-arrow"></div>
                      </div>
                    </div>
                  </div>
                )}
              {/*Author Name Drop-Down --END--*/}

              {/*Posts Name Drop-Down --START--*/}
              {freeFormData?.author_ids?.split(',')?.length < 2 &&
                freeFormData?.author_ids?.split(',')?.includes('') &&
                freeFormData?.category_ids?.split(',')?.length < 2 &&
                freeFormData?.category_ids?.split(',')?.includes('') && (
                  <div className="gjs-field">
                    <div className="gjs-label">
                      Posts
                      <a
                        className="text-right"
                        style={{ float: 'right' }}
                        onClick={() => getContentModelList('posts', setPosts)}>
                        Refresh
                      </a>
                    </div>
                    <div className="gjs-field-select custom-gjs-field-select">
                      <Select
                        // menuIsOpen={true}
                        key={defaultSelections?.posts
                          ?.map((item) => item.value)
                          .join(',')}
                        placeholder={'Select Post'}
                        onChange={(event: any) =>
                          handelInputChange('posts', event)
                        }
                        closeMenuOnSelect={false}
                        isMulti={true}
                        classNamePrefix={'custom-select_blog'}
                        defaultValue={defaultSelections?.posts}
                        options={posts?.map((item: any) => {
                          return {
                            ...item,
                            value: item?.id,
                            label: item?.title,
                          };
                        })}
                      />
                      <div className="gjs-sel-arrow">
                        <div className="gjs-d-s-arrow"></div>
                      </div>
                    </div>
                  </div>
                )}
              {/*Posts Name Drop-Down --END--*/}
              <div className="gjs-field">
                <label className="gjs-label">Limit</label>
                <input
                  type="text"
                  placeholder="Limit"
                  onChange={(event) => handelInputChange('limit', event)}
                  value={freeFormData?.limit}
                />
              </div>

              <div className="footerButton">
                <button
                  disabled={
                    `${freeFormData?.posts}${freeFormData?.author_ids}${freeFormData?.category_ids}`
                      ?.length <= 0
                  }
                  className="grape-btn"
                  onClick={saveTabsSettings}>{`Save`}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const expBlogCardTrait: TraitInterface = {
  traitName: 'blog-card',
  component: ExpBlogCard,
};

export default expBlogCardTrait;
