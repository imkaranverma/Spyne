/* eslint-disable react/jsx-no-useless-fragment */
// form
import { useFormContext, Controller } from "react-hook-form";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";

import { FormHelperText, StandardTextFieldProps } from "@mui/material";
import htmlToDraft from "html-to-draftjs";
// eslint-disable-next-line global-require
// const htmlToDraft = typeof window === "object" && require("html-to-draftjs").default;

// ----------------------------------------------------------------------

interface RHFTextFieldInterface extends StandardTextFieldProps {
  name: string;
  helperText?: string;
}

export const RHFRichTextEditor = ({ name, helperText, ...other }: RHFTextFieldInterface) => {
  const { control } = useFormContext();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    htmlToDraftConverter(control._formValues[name]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setEditor(true);
  }, []);
  const draftToHtmlConverter = (editorStatee: EditorState) => {
    const rawContentState = convertToRaw(editorStatee.getCurrentContent());

    const markup = draftToHtml(rawContentState, {
      trigger: "#",
      separator: " "
    });
    return markup;
  };

  const htmlToDraftConverter = (content: any) => {
    const blocksFromHtml = htmlToDraft(content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorStateData = EditorState.createWithContent(contentState);
    setEditorState(editorStateData);
  };

  const [editor, setEditor] = useState(false);

  return (
    <>
      {editor ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Editor
                wrapperStyle={{
                  padding: "0.2rem",
                  width: "100%",
                  border: "1px solid #D3D3D3",

                  margin: "1rem 0",
                  borderRadius: "10px"
                }}
                editorStyle={{
                  width: "100%",
                  padding: "1rem",
                  fontFamily: "AXIFORMA",
                  maxHeight: "10rem",
                  border: "none"
                }}
                // mention={{
                //   separator: ' ',
                //   trigger: '@',
                //   suggestions: [
                //     { text: 'APPLE', value: 'apple', url: 'apple' },
                //     { text: 'BANANA', value: 'banana', url: 'banana' },
                //     { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                //     { text: 'DURIAN', value: 'durian', url: 'durian' },
                //     { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                //     { text: 'FIG', value: 'fig', url: 'fig' },
                //     { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                //     { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                //   ],
                // }}
                editorState={editorState}
                // toolbarClassName=""
                //   wrapperClassName="w-full h-[15rem] flex flex-col-reverse"
                placeholder="Message body"
                editorClassName="border-[1px] border-purple-light w-full "
                toolbar={{
                  options: ["inline", "list", "fontSize", "fontFamily", "textAlign", "colorPicker", "remove", "history"],
                  fontFamily: {
                    options: ["AXIFORMA", "Georgia", "Times New Roman", "Verdana"],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined
                  },
                  list: {
                    inDropdown: true,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: ["unordered", "ordered"]
                    // unordered: { icon: unordered, className: undefined },
                    // ordered: { icon: ordered, className: undefined },
                    // indent: { icon: indent, className: undefined },
                    // outdent: { icon: outdent, className: undefined },
                  },
                  inline: {
                    inDropdown: false,
                    options: ["bold", "italic", "underline"]
                  }
                }}
                onEditorStateChange={(stateChangeValue) => {
                  setEditorState(stateChangeValue);
                  const markup = draftToHtmlConverter(stateChangeValue);

                  field.onChange(markup);
                }}
              />

              <FormHelperText className="Mui-error">{error ? error?.message : helperText}</FormHelperText>
            </div>
          )}
        />
      ) : null}
    </>
  );
};
