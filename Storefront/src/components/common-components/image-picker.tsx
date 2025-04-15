import React, { useCallback, useState, useMemo } from 'react';
import { CommonUtilities } from '../../utilities';

const ExpImageselector: React.FC<any> = ({
  changeHandler,
  field,
  type,
  inputValue,
}) => {
  const [currentDevice, setCurrentDevice] = useState<string>('desktop');
  const [imageSource, setImageSource] = useState<any>({
    desktop: 'mediaManager',
    tablet: 'mediaManager',
    mobile: 'mediaManager',
  });
  const [imageData, setImageData] = useState<any>(
    inputValue
      ? inputValue
      : {
          desktop: {
            imageUrl: '',
            mediaManagerUrl: '',
            imageHeigth: '',
            imageWidth: '',
          },
          tablet: {
            imageUrl: '',
            mediaManagerUrl: '',
            imageHeigth: '',
            imageWidth: '',
          },
          mobile: {
            imageUrl: '',
            mediaManagerUrl: '',
            imageHeigth: '',
            imageWidth: '',
          },
          image_width: '',
          image_height: '',
          altText: '',
          caption: '',
        }
  );

  const hasMediaManagerImage = useMemo(() => {
    return Boolean(imageData[currentDevice]?.mediaManagerUrl);
  }, [currentDevice, imageData]);

  const handleDeviceChange = useCallback((field: string) => {
    setCurrentDevice(field);
  }, []);

  const handelInputChange = (field: string, event: any) => {
    if (field === 'imageUrl') {
      setImageData({
        ...imageData,
        [currentDevice]: {
          ...imageData[currentDevice],
          imageUrl: event.target.value,
          mediaManagerUrl: '',
        },
      });
    } else if (field === 'image_width') {
      if (currentDevice === 'desktop') {
        setImageData({
          ...imageData,
          [currentDevice]: {
            ...imageData[currentDevice],
            imageWidth: event.target.value,
          },
          image_width: event.target.value,
        });
      } else {
        setImageData({
          ...imageData,
          [currentDevice]: {
            ...imageData[currentDevice],
            imageWidth: event.target.value,
          },
        });
      }
    } else if (field === 'image_height') {
      if (currentDevice === 'desktop') {
        setImageData({
          ...imageData,
          [currentDevice]: {
            ...imageData[currentDevice],
            imageHeigth: event.target.value,
          },
          image_height: event.target.value,
        });
      } else {
        setImageData({
          ...imageData,
          [currentDevice]: {
            ...imageData[currentDevice],
            imageHeigth: event.target.value,
          },
        });
      }
    } else if (field === 'altText') {
      setImageData({ ...imageData, ['altText']: event.target.value });
    } else if (field === 'caption') {
      setImageData({ ...imageData, ['caption']: event.target.value });
    }
  };

  const setMediaManagerImage = (
    imageUrl: any,
    altText?: any,
    caption?: any
  ) => {
    setImageData({
      ...imageData,
      [currentDevice]: {
        ...imageData[currentDevice],
        imageUrl: '',
        mediaManagerUrl: imageUrl,
      },
      ['altText']: altText ? altText : '',
      ['caption']: caption ? caption : '',
    });
  };

  const clearMediaManagerUrlState = () => {
    setImageData({
      ...imageData,
      [currentDevice]: {
        ...imageData[currentDevice],
        imageUrl: '',
        mediaManagerUrl: '',
      },
    });
  };

  const handleButtonClick = () => {
    // @ts-ignore
    if (parent && parent.window && parent.window.openMediaManager) {
      // @ts-ignore
      parent.window.openMediaManager();
    }
  };
  const parseAltTitleText = (altText: string) => {
    try {
      const altObj = JSON.parse(altText);
      const languageCode = CommonUtilities.getCurrentChannelInfo()?.language;
      if (languageCode) {
        return altObj[languageCode];
      }
    } catch {
      return altText;
    }
  };
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  window.mediaManagerCallback = function (file, mediaUrl) {
    // setMediaManagerImage(mediaUrl);
    if (file?.length) {
      if (typeof file[0] !== 'string') {
        setMediaManagerImage(
          JSON.stringify(file[0]),
          parseAltTitleText(file[0]?.altText),
          parseAltTitleText(file[0]?.caption)
        );
      } else {
        setMediaManagerImage(file[0]);
      }
    }
  };

  const saveImageSettings = () => {
    changeHandler(field, imageData, type);
  };

  const handelImageSourceChange = (event: any) => {
    setImageSource({ ...imageSource, [currentDevice]: event.target.value });
  };

  const getImageURL = (imagObj) => {
    try {
      return JSON.parse(imagObj)?.publicUrl;
    } catch (e) {
      return imagObj?.publicUrl;
    }
  };

  const getImageName = (imageObj) => {
    try {
      return JSON.parse(imageObj)?.name;
    } catch (e) {
      return imageObj?.name;
    }
  };

  return (
    <div className="gjs-field">
      <div className="deviceImageTab">
        <div className="deviceImageTabButton">
          <button
            className={currentDevice === 'desktop' ? 'active' : ''}
            onClick={handleDeviceChange.bind(this, 'desktop')}>
            Desktop
          </button>
          <button
            className={currentDevice === 'tablet' ? 'active' : ''}
            onClick={handleDeviceChange.bind(this, 'tablet')}>
            Tablet
          </button>
          <button
            className={currentDevice === 'mobile' ? 'active' : ''}
            onClick={handleDeviceChange.bind(this, 'mobile')}>
            Mobile
          </button>
        </div>

        <div className="deviceImageTabContent">
          <div className="deviceImageTabTitle">{currentDevice}</div>
          <div className="m-b-16 deviceImageTabContentInner">
            <div className="gjs-trt-trait__wrp gjs-trt-trait__wrp-image_wrapper m-b-8">
              <div className="gjs-trt-trait--select">
                <label className="gjs-label line-height-normal">
                  Image Source
                </label>
                <div className="gjs-field-wrp gjs-field-wrp--select">
                  <div className="gjs-field gjs-field-select">
                    <div data-input>
                      <select
                        onChange={handelImageSourceChange}
                        value={imageSource[currentDevice]}>
                        <option value="mediaManager">Media Library</option>
                        <option value="imageUrl">Image URL</option>
                      </select>
                    </div>
                    <div className="gjs-sel-arrow">
                      <div className="gjs-d-s-arrow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {imageSource[currentDevice] === 'mediaManager' ? (
              <div className="imageMediaLibrary">
                <div className="imageMediaLibraryInner">
                  {/* <input
                    type="file"
                    id="custom-file-input"
                    className="customFileInput"
                  /> */}
                  <label htmlFor="custom-file-input">
                    <div className="fileImageContent">
                      <div
                        className="fileImage"
                        onClick={() =>
                          !hasMediaManagerImage && handleButtonClick()
                        }>
                        {/* <FileAddIcon /> */}
                        <img
                          src={getImageURL(
                            imageData[currentDevice]?.mediaManagerUrl
                          )}
                          alt=""
                        />
                      </div>
                      {!hasMediaManagerImage ? (
                        <div className="fileImageText">
                          <div className="imageName">No image selected.</div>
                          <button
                            onClick={handleButtonClick}
                            className="imageBtn">
                            Choose Image
                          </button>
                        </div>
                      ) : (
                        <div className="fileImageText">
                          <div className="imageName">
                            {getImageName(
                              imageData[currentDevice]?.mediaManagerUrl
                            )}
                          </div>
                          <button
                            onClick={clearMediaManagerUrlState}
                            className="imageBtn">
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                {/* <div className="helpText">Supported files: JPEG. PNG. GIF. SVG</div> */}
              </div>
            ) : (
              <div className="imageUrl">
                <div className="m-b-8 gjs-field">
                  <input
                    value={imageData[currentDevice]?.imageUrl}
                    onChange={(event: any) =>
                      handelInputChange('imageUrl', event)
                    }
                    className="imageUrlInput"
                    placeholder="Add image link"
                    type="text"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="m-b-16 gjs-field">
            <label className="gjs-label line-height-normal">Image Width</label>
            <input
              type="text"
              onChange={(event) => handelInputChange('image_width', event)}
              value={
                (currentDevice === 'desktop'
                  ? imageData[currentDevice]?.imageWidth ||
                    imageData?.image_width
                  : imageData[currentDevice]?.imageWidth) || ''
              }
            />
          </div>

          <div className="m-b-16 gjs-field">
            <label className="gjs-label line-height-normal">Image Height</label>
            <input
              type="text"
              onChange={(event) => handelInputChange('image_height', event)}
              value={
                (currentDevice === 'desktop'
                  ? imageData[currentDevice]?.imageHeigth ||
                    imageData?.image_height
                  : imageData[currentDevice]?.imageHeigth) || ''
              }
            />
          </div>
          <div className="m-b-16 gjs-field">
            <label className="gjs-label line-height-normal">Image Alt</label>
            <input
              type="text"
              onChange={(event) => handelInputChange('altText', event)}
              value={imageData?.altText}
            />
          </div>

          <div className="m-b-16 gjs-field">
            <label className="gjs-label line-height-normal">Image Title</label>
            <input
              type="text"
              onChange={(event) => handelInputChange('caption', event)}
              value={imageData?.caption}
            />
          </div>
          <div className="footerButton">
            <button className="grape-btn" onClick={saveImageSettings}>
              Save Image Setting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpImageselector;
