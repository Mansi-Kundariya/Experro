import React, {
    useCallback,
    useState,
    useMemo,
    useRef,
    useEffect,
  } from 'react';
  import ExpTextInput from './text-input';
  import ExpTextAreaInput from './textarea-input';
  
  const ExpImageselector: React.FC<any> = ({ changeHandler, field, type }) => {
    const textAreaInput = useRef<HTMLInputElement>(null);
    const [focusState, setFocusState] = useState(false);
    const [currentDevice, setCurrentDevice] = useState<string>('desktop');
    const [isDirty, setIsDirty] = useState({
      tablet: false,
      mobile: false,
    });
    const [isWidthDirty, setIsWidthDirty] = useState({
      tablet: false,
      mobile: false,
    });
    const [imageData, setImageData] = useState<any>({
      desktop: {
        imageUrl: '',
        mediaManagerUrl: '',
        width: '',
      },
      tablet: {
        imageUrl: '',
        mediaManagerUrl: '',
        width: '',
      },
      mobile: {
        imageUrl: '',
        mediaManagerUrl: '',
        width: '',
      },
    });
  
    const isValid = useMemo(() => {
      return (
        Boolean(imageData[currentDevice]['imageUrl']) ||
        !imageData[currentDevice]['mediaManagerUrl']
      );
    }, [imageData, currentDevice]);
  
    const hasMediaManagerImage = useMemo(() => {
      return Boolean(imageData[currentDevice]['mediaManagerUrl']);
    }, [currentDevice, imageData]);
  
    const handleDeviceChange = useCallback((field: string) => {
      setCurrentDevice(field);
    }, []);
  
    const handelInputChange = useCallback(
      (field: string, event: any) => {
        const imageDataReplica = { ...imageData };
        imageDataReplica[currentDevice][field] = event.target.value;
        if (field === 'imageUrl') {
          imageDataReplica[currentDevice].mediaManagerUrl = '';
          imageDataReplica[currentDevice].width = '';
        }
        if ((currentDevice === 'tablet' || currentDevice === 'mobile') && field === 'imageUrl') {
          if (event.target.value) {
            setIsDirty({ ...isDirty, [currentDevice]: true });
          } else {
            setIsDirty({ ...isDirty, [currentDevice]: false });
          }
        }
        if (currentDevice === 'desktop') {
          if (!isDirty.tablet) {
            imageDataReplica.tablet[field] = event.target.value;
            if (field === 'imageUrl') {
              imageDataReplica.tablet.mediaManagerUrl = '';
              imageDataReplica.tablet.width = '';
            }
          }
          if (!isDirty.mobile && !isDirty.tablet) {
            imageDataReplica.mobile[field] = event.target.value;
            if (field === 'imageUrl') {
              imageDataReplica.mobile.mediaManagerUrl = '';
              imageDataReplica.mobile.width = '';
            }
          }
        }
        if (currentDevice === 'tablet') {
          if (!isDirty.mobile && event.target.value) {
            imageDataReplica.mobile[field] = event.target.value;
            if (field === 'imageUrl') {
              imageDataReplica.mobile.mediaManagerUrl = '';
              imageDataReplica.mobile.width = '';
            }
          } else if (!isDirty.mobile) {
            imageDataReplica.mobile[field] = imageDataReplica.desktop[field];
          }
        }
        if (currentDevice === 'tablet' || currentDevice === 'mobile') {
          if (event.target.value && field === 'width') {
            setIsWidthDirty({ ...isWidthDirty, [currentDevice]: true });
          } else if (field === 'width') {
            setIsWidthDirty({ ...isWidthDirty, [currentDevice]: false });
          }
        }
        if (currentDevice === 'desktop' && field === 'width') {
          if (!isWidthDirty.tablet) {
            imageDataReplica.tablet[field] = event.target.value;
          }
          if (!isWidthDirty.mobile && !isWidthDirty.tablet) {
            imageDataReplica.mobile[field] = event.target.value;
          }
        }
        if (currentDevice === 'tablet' && field === 'width') {
          if (!isWidthDirty.mobile && event.target.value) {
            imageDataReplica.mobile[field] = event.target.value;
          } else if (!isWidthDirty.mobile) {
            imageDataReplica.mobile[field] = imageDataReplica.desktop[field];
          }
        }
  
        setImageData(imageDataReplica);
      },
      [currentDevice, imageData, isDirty, isWidthDirty]
    );
  
    const handelTextAreaBlur = useCallback(() => {
      const imageDataReplica = { ...imageData };
      if (!isDirty.tablet) {
        Object.assign(imageDataReplica.tablet, imageDataReplica.desktop);
      }
      if (!isDirty.mobile) {
        Object.assign(imageDataReplica.mobile, imageDataReplica.tablet);
      }
      setImageData(imageDataReplica);
    }, [imageData, isDirty.mobile, isDirty.tablet]);
  
    const handelTextBoxBlur = useCallback(() => {
      const imageDataReplica = { ...imageData };
      if (currentDevice === 'tablet' && !imageDataReplica.tablet.width) {
        imageDataReplica.tablet.width = imageDataReplica.desktop.width;
      }
      if (currentDevice === 'mobile' && !imageDataReplica.mobile.width) {
        if (imageDataReplica.tablet.width) {
          imageDataReplica.mobile.width = imageDataReplica.tablet.width;
        } else if (imageDataReplica.desktop.width) {
          imageDataReplica.mobile.width = imageDataReplica.desktop.width;
        }
      }
      setImageData(imageDataReplica);
    }, [currentDevice, imageData]);
  
    const setMediaManagerImage = useCallback(
      (imageUrl: string) => {
        const imageDataReplica = { ...imageData };
        imageDataReplica[currentDevice].imageUrl = '';
        imageDataReplica[currentDevice].mediaManagerUrl = imageUrl;
        if (currentDevice === 'tablet') {
          setIsDirty({ ...isDirty, ['tablet']: true });
          if (!isDirty.mobile) {
            imageDataReplica.mobile.imageUrl = '';
            imageDataReplica.mobile.mediaManagerUrl = imageUrl;
          }
        }
        if (currentDevice === 'mobile') {
          setIsDirty({ ...isDirty, ['mobile']: true });
        }
        if (currentDevice === 'desktop') {
          if (!isDirty.tablet) {
            imageDataReplica.tablet.imageUrl = '';
            imageDataReplica.tablet.mediaManagerUrl = imageUrl;
            if (!isDirty.mobile) {
              imageDataReplica.mobile.imageUrl = '';
              imageDataReplica.mobile.mediaManagerUrl = imageUrl;
            }
          }
        }
        if (currentDevice === 'tablet' && !imageDataReplica.tablet.width) {
          imageDataReplica.tablet.width = imageDataReplica.desktop.width;
        }
        if (currentDevice === 'mobile' && !imageDataReplica.mobile.width) {
          if (imageDataReplica.tablet.width) {
            imageDataReplica.mobile.width = imageDataReplica.tablet.width;
          } else if (imageDataReplica.desktop.width) {
            imageDataReplica.mobile.width = imageDataReplica.desktop.width;
          }
        }
        setImageData(imageDataReplica);
      },
      [currentDevice, imageData, isDirty]
    );
  
    const clearMediaManagerUrlState = useCallback(() => {
      const imageDataReplica = { ...imageData };
      imageDataReplica[currentDevice].mediaManagerUrl = '';
      if (currentDevice === 'tablet') {
        setIsDirty({ ...isDirty, ['tablet']: false });
        if (!isDirty.mobile) {
          imageDataReplica.mobile.mediaManagerUrl = '';
        }
      }
      if (currentDevice === 'mobile') {
        setIsDirty({ ...isDirty, ['mobile']: false });
      }
      if (currentDevice === 'desktop') {
        if (!isDirty.tablet) {
          imageDataReplica.tablet.mediaManagerUrl = '';
          if (!isDirty.mobile) {
            imageDataReplica.mobile.mediaManagerUrl = '';
          }
        }
      }
      setImageData(imageDataReplica);
    }, [currentDevice, imageData, isDirty]);
  
    const handleButtonClick = () => {
      // @ts-ignore
      if (parent && parent.window && parent.window.openMediaManager) {
        // @ts-ignore
        parent.window.openMediaManager();
      }
    };
  
    // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      window.mediaManagerCallback = function (file, mediaUrl) {
        if (file?.length) {
          if (typeof file[0] !== 'string') {
            setMediaManagerImage(JSON.stringify(file[0]));
          } else {
            setMediaManagerImage(file[0]);
          }
        }
      };
  
    useEffect(() => {
      if (!hasMediaManagerImage && focusState) {
        textAreaInput?.current.focus();
      }
      setFocusState(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      imageData.desktop.mediaManagerUrl,
      imageData.tablet.mediaManagerUrl,
      imageData.mobile.mediaManagerUrl,
    ]);
  
  
    const saveImageSettings = () => {
        changeHandler(field, imageData, type);
    };
  
    return (
      <div className="gjs-field">
        <div className="deviceImageTab">
          <div className="deviceImageTabButton">
            <button className={currentDevice === 'desktop' ? 'active' : ''} onClick={handleDeviceChange.bind(this, 'desktop')}>
              Desktop
            </button>
            <button className={currentDevice === 'tablet' ? 'active' : ''} onClick={handleDeviceChange.bind(this, 'tablet')}>
              Tablet
            </button>
            <button className={currentDevice === 'mobile' ? 'active' : ''} onClick={handleDeviceChange.bind(this, 'mobile')}>
              Mobile
            </button>
          </div>
  
          <div className="deviceImageTabContent">
            <div className="deviceImageTabTitle">{currentDevice}</div>
            <ExpTextAreaInput
              textAreaRef={textAreaInput}
              changeHandler={handelInputChange}
              inputValue={imageData[currentDevice]?.imageUrl}
              field={'imageUrl'}
              label={'Image Link'}
              onBlurHandler={handelTextAreaBlur}
              rows={3}
              cols={20}
            />
  
            <button className="grape-link" onClick={handleButtonClick}>
              Choose file from media manager
            </button>
  
            {hasMediaManagerImage && (
              <div className="mediaImageLink">
                <div className="closeLink" onClick={clearMediaManagerUrlState}>&times;</div>
                <div className="mediaImageLinkUrl">{imageData[currentDevice]?.mediaManagerUrl}</div>
              </div>
            )}
  
            {!isValid && (
              <ExpTextInput
                handelOnBlur={handelTextBoxBlur}
                changeHandler={handelInputChange}
                inputValue={imageData[currentDevice]?.width}
                field={'width'}
                label={'Width for Image'}
              />
            )}
  
            <div className="footerButton">
              <button className="grape-btn" onClick={saveImageSettings}>Save Image Setting</button>
            </div>
          </div>
        </div>
      </div>
  
    );
  };
  
  export default ExpImageselector;
  