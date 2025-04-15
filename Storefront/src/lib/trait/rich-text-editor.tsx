import React, { useRef, useState } from 'react';
import { TraitInterface } from '../../interfaces/trait.interface';
import Modal from 'react-modal';
import { IconCross } from '../../assets/fonts/icons/cross';

import 'froala-editor/js/froala_editor.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/help.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';

import 'froala-editor/js/third_party/embedly.min.js';
import Froala from 'react-froala-wysiwyg';
import Froalaeditor from 'froala-editor';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/third_party/embedly.min.css';
import 'froala-editor/css/plugins/fullscreen.min.css';
import { CommonUtilities } from '../../utilities';
import { ContentService } from '../../services';

const ExpRichTextEditor = ({
  value,
  changeHandler,
}: {
  value: string;
  changeHandler: any;
}) => {
  let defaultValue;
  try {
    defaultValue = CommonUtilities.b64_to_utf8(value);
  } catch {
    defaultValue = value;
  }
  const editorRef: any = useRef();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<string>(defaultValue);

  const handleButtonClick = () => {
    editorRef.current.editor.selection.save();
    // @ts-ignore
    if (parent && parent.window && parent.window.openMediaManager) {
      // @ts-ignore
      parent.window.openMediaManager();
    }
  };

  const handleImage = (file) => {
    let imageData = { imageUrl: '', altText: '', caption: '' };
    if (file?.length) {
      if (typeof file[0] !== 'string') {
        imageData = ContentService.parseImageURL(JSON.stringify(file[0]));
      } else {
        imageData = ContentService.parseImageURL(file[0]);
      }
    }
    return imageData;
  };

  // @ts-ignore
  window.mediaManagerCallback = function (file) {
    const imageData = handleImage(file);
    const image = `<img src="${imageData?.imageUrl}" title="${
      imageData?.caption?.length ? imageData?.caption : 'Image'
    }" alt="${
      imageData?.altText?.length ? imageData?.altText : 'Image'
    }" height="" width="">`;
    editorRef.current.editor.selection.restore();
    editorRef.current.editor.html.insert(image, false);
  };

  Froalaeditor.DefineIcon('imageIcon', { SVG_KEY: 'insertImage' });
  Froalaeditor.RegisterCommand('imageIcon', {
    title: 'Image Upload',
    icon: 'imageIcon',
    focus: true,
    undo: false,
    refreshAfterCallback: true,
    callback: function () {
      handleButtonClick();
    },
  });

  const handelFarolaChange = (value: string) => {
    setInitialValue(value);
  };

  const handelSaveClick = () => {
    changeHandler(CommonUtilities.utf8_to_b64(initialValue));
    setIsModalOpen(false);
  }

  return (
    <div className="custom-fields">
      <div className="editorButWrap">
        <button className="grape-btn" onClick={() => setIsModalOpen(true)}>
          Open Editor
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Example Modal"
        className={'modalpopup editorModal visualBulderModal storefront-modal editor-with-footer'}
        ariaHideApp={false}>
        <div onClick={() => setIsModalOpen(false)} className="popup-close-link">
          <i className="icon">
            <IconCross />
          </i>
        </div>
        <Froala
          ref={editorRef}
          model={initialValue}
          onModelChange={(value) => handelFarolaChange(value)}
          tag="textarea"
          config={{
            key: 'zEG4iH4B9D9B5A3F5g1JWSDBCQG1ZGDf1C1d2JXDAAOZWJhE5B4E4H3F2H3C7A4E5F5==',
            attribution: false,
            placeholder: 'Start typing...',
            htmlRemoveTags: [],
            htmlAllowedTags: ['.*'],
            htmlAllowedAttrs: ['.*'],
            htmlAllowedEmptyTags: ['svg', 'path', 'g', 'iframe'],
            Default:[
              {code: '1f600', desc: 'Grinning face'},
              {code: '1f601', desc: 'Grinning face with smiling eyes'},
              {code: '1f602', desc: 'Face with tears of joy'},
              {code: '1f603', desc: 'Smiling face with open mouth'},
              {code: '1f604', desc: 'Smiling face with open mouth and smiling eyes'},
              {code: '1f605', desc: 'Smiling face with open mouth and cold sweat'},
              {code: '1f606', desc: 'Smiling face with open mouth and tightly-closed eyes'},
              {code: '1f607', desc: 'Smiling face with halo'},
              {code: '1f608', desc: 'Smiling face with horns'},
              {code: '1f609', desc: 'Winking face'},
              {code: '1f60a', desc: 'Smiling face with smiling eyes'},
              {code: '1f60b', desc: 'Face savoring delicious food'},
              {code: '1f60c', desc: 'Relieved face'},
              {code: '1f60d', desc: 'Smiling face with heart-shaped eyes'},
              {code: '1f60e', desc: 'Smiling face with sunglasses'},
              {code: '1f60f', desc: 'Smirking face'},

              {code: '1f610', desc: 'Neutral face'},
              {code: '1f611', desc: 'Expressionless face'},
              {code: '1f612', desc: 'Unamused face'},
              {code: '1f613', desc: 'Face with cold sweat'},
              {code: '1f614', desc: 'Pensive face'},
              {code: '1f615', desc: 'Confused face'},
              {code: '1f616', desc: 'Confounded face'},
              {code: '1f617', desc: 'Kissing face'},
              {code: '1f618', desc: 'Face throwing a kiss'},
              {code: '1f619', desc: 'Kissing face with smiling eyes'},
              {code: '1f61a', desc: 'Kissing face with closed eyes'},
              {code: '1f61b', desc: 'Face with stuck out tongue'},
              {code: '1f61c', desc: 'Face with stuck out tongue and winking eye'},
              {code: '1f61d', desc: 'Face with stuck out tongue and tightly-closed eyes'},
              {code: '1f61e', desc: 'Disappointed face'},
              {code: '1f61f', desc: 'Worried face'},
              {code: '1f620', desc: 'Angry face'},
              {code: '1f621', desc: 'Pouting face'},
              {code: '1f622', desc: 'Crying face'},
              {code: '1f623', desc: 'Persevering face'},
              {code: '1f624', desc: 'Face with look of triumph'},
              {code: '1f625', desc: 'Disappointed but relieved face'},
              {code: '1f626', desc: 'Frowning face with open mouth'},
              {code: '1f627', desc: 'Anguished face'},

              {code: '1f628', desc: 'Fearful face'},
              {code: '1f629', desc: 'Weary face'},
              {code: '1f62a', desc: 'Sleepy face'},
              {code: '1f62b', desc: 'Tired face'},
              {code: '1f62c', desc: 'Grimacing face'},
              {code: '1f62d', desc: 'Loudly crying face'},
              {code: '1f62e', desc: 'Face with open mouth'},
              {code: '1f62f', desc: 'Hushed face'},

              {code: '1f631', desc: 'Face screaming in fear'},
              {code: '1f632', desc: 'Astonished face'},
              {code: '1f633', desc: 'Flushed face'},
              {code: '1f634', desc: 'Sleeping face'},
              {code: '1f635', desc: 'Dizzy face'},
              {code: '1f636', desc: 'Face without mouth'},
              {code: '1f637', desc: 'Face with medical mask'}
              ],
            toolbarButtons: {
              moreText: {
                buttons: [
                  'bold',
                  'italic',
                  'underline',
                  'strikeThrough',
                  'subscript',
                  'superscript',
                  'fontFamily',
                  'fontSize',
                  'textColor',
                  'backgroundColor',
                  'inlineClass',
                  'inlineStyle',
                  'clearFormatting',
                ],
              },
              moreParagraph: {
                buttons: [
                  'alignLeft',
                  'alignCenter',
                  'alignRight',
                  'paragraphFormat',
                  'alignJustify',
                  'formatOLSimple',
                  'formatOL',
                  'formatUL',
                  'paragraphStyle',
                  'lineHeight',
                  'outdent',
                  'indent',
                  'quote',
                ],
                buttonsVisible: 4,
              },
              moreRich: {
                buttons: [
                  'insertLink',
                  'insertImage',
                  'imageIcon',
                  'insertVideo',
                  'insertTable',
                  'emoticons',
                  'fontAwesome',
                  'specialCharacters',
                  'embedly',
                  'insertFile',
                  'insertHR',
                ],
              },
              moreMisc: {
                buttons: [
                  'undo',
                  'redo',
                  'html',
                  'fullscreen',
                  'emoticons',
                  'spellChecker',
                  'selectAll',
                  'help',
                ],
                align: 'right',
                buttonsVisible: 4,
              },
            },
            pluginsEnabled: [
              'emoticons',
              'table',
              'spell',
              'quote',
              'save',
              'paragraphFormat',
              'paragraphStyle',
              'help',
              'draggable',
              'align',
              'embedly',
              'colors',
              'entities',
              'inlineClass',
              'inlineStyle',
              'entities',
              'fullscreen',
              'lists',
              'embedly',
              'codeBeautify',
              'spellChecker',
              'codeView',
              'link',
            ],
          }}
        />
        <div className="reactModalFooter">
          <button type="button" onClick={()=>setIsModalOpen(false)}>
            Cancel
          </button>
        <button
          onClick={handelSaveClick}
          disabled={!value?.length}
          className="buttonPrimary"
          type="button">
          Save
        </button>
      </div>
      </Modal>
    </div>
  );
};

const expRichTextEditor: TraitInterface = {
  traitName: 'rich-text-editor',
  component: ExpRichTextEditor,
};

export default expRichTextEditor;
