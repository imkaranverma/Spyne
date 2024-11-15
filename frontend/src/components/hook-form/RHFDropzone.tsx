import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import { ToasterService } from "src/service/ToasterService";
import { acceptableFiles, getCurrentYear } from "src/utils/Utilities";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormHelperText, Grid } from "@mui/material";
import { FilePickerUI, FilePickerUIMini, FilePreview, FilePreviewNew } from "../DropzoneComponents";
import { uploadFileToBucket } from "src/api/apiHelper";

export function RHFMyDropzone({
  customFileUIBuilder,

  member_id,
  methods,
  viewOnly = false,
  accept,
  maxFiles,
  heading,
  subHeading,
  externalUploadService = false,

  uniqueKey,
  gridItemConfig = {
    xs: 12,
    md: 6,
    lg: 4
  }
}: {
  customFileUIBuilder?: (args0: any, args1: any, isDragActive: boolean, externalUploadService: boolean, fields: any, showMiniFileUploader: boolean) => { uploader: React.ReactNode; previewer: React.ReactNode };
  accept?: {
    [key: string]: string[];
  };
  externalUploadService?: boolean;
  gridItemConfig?: object;
  member_id?: number;

  methods: UseFormReturn<any, any, undefined>;

  uniqueKey: string;
  maxFiles: number;
  heading: string;
  subHeading: string;
  viewOnly?: boolean;
}) {
  const { fields, prepend, remove, swap, move, insert } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: uniqueKey
  });

  const values = methods.watch();

  const onDrop = useCallback((files: File[]) => {
    if (externalUploadService) {
      if (maxFiles === 1) {
        const data = [...files];
        methods.setValue(uniqueKey, data, { shouldTouch: true });
      } else {
        const data = [...methods.getValues()[uniqueKey], ...files];
        methods.setValue(uniqueKey, data, { shouldTouch: true });
      }
    } else {
      files.map(async (file, index) => {
        if (file != null) {
          const fileType = file.type;
          const fileName = file.name.split(" ").join("_");
          console.log(fileName.length);
          if (fileName.length > 50) {
            methods.setError(uniqueKey, { type: "custom", message: "File name is too large" });
            return;
          }

          uploadFileToBucket({
            data: {
              member_id: member_id?.toString(),
              file_type: acceptableFiles?.[fileType]?.[0] ?? "",
              file,
              year: getCurrentYear().toString(),
              file_name: `${fileName}`
            }
          })
            .then((resp) => {
              if (maxFiles === 1) {
                const data = [];
                data.push({
                  file_url: resp.data.file_url,
                  file_name: `${resp.data.file_name}`,
                  file_type: acceptableFiles?.[fileType]?.[0] ?? "",
                  file_format: Object.keys(acceptableFiles).includes(resp.data.file_format) ? acceptableFiles[resp.data.file_format][0] : "--"
                });
                methods.setValue(uniqueKey, data, { shouldTouch: true });
              } else {
                const data = [...methods.getValues()[uniqueKey]];
                data.push({
                  file_url: resp.data.file_url,
                  file_name: `${resp.data.file_name}`,
                  file_type: acceptableFiles?.[fileType]?.[0] ?? "",
                  file_format: Object.keys(acceptableFiles).includes(resp.data.file_format) ? acceptableFiles[resp.data.file_format][0] : "--"
                });
                methods.setValue(uniqueKey, data, { shouldTouch: true });
              }
            })
            .catch((e) => null);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    maxFiles,
    onDrop,
    multiple: true,
    accept: accept ?? acceptableFiles
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      ToasterService.error(`At max you can select only ${maxFiles} files`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileRejections]);

  const fileError = methods.formState.errors[uniqueKey]?.message?.toString();
  return (
    <>
      {!viewOnly && !(fields.length > 0) && (customFileUIBuilder?.(getRootProps, getInputProps, isDragActive, externalUploadService, fields, fields.length > 0 && fields.length < maxFiles && !viewOnly).uploader ?? <FilePickerUI heading={heading} subHeading={subHeading} getInputProps={getInputProps} getRootProps={getRootProps} isDragActive={isDragActive} />)}

      {customFileUIBuilder?.(getRootProps(), getInputProps(), isDragActive, externalUploadService, fields, fields.length > 0 && fields.length < maxFiles && !viewOnly).previewer ?? (
        <Grid container spacing={3}>
          {fields.map((el: any, index) => {
            console.log(el);

            return (
              <Grid item key={el.id + el.created_at} {...gridItemConfig}>
                {externalUploadService ? (
                  <FilePreviewNew file={el} viewModeOnly />
                ) : (
                  <FilePreview
                    onDeleteHandler={() => {
                      // const newData = files.filter((el) => el !== file);
                      // setFiles(newData);
                      remove(index);
                    }}
                    viewModeOnly={viewOnly}
                    file={{
                      created_at: el.created_at,
                      file_format: el.file_format,
                      file_name: el.file_name,
                      file_type: el.file_type,
                      file_url: el.file_url
                    }}
                  />
                )}
              </Grid>
            );
          })}
          {fields.length > 0 && fields.length < maxFiles && !viewOnly && (
            <Grid item {...gridItemConfig}>
              <FilePickerUIMini getInputProps={getInputProps} getRootProps={getRootProps} isDragActive={isDragActive} />
            </Grid>
          )}
        </Grid>
      )}
      {!!methods.formState.errors && Object.keys(methods.formState.errors).includes(uniqueKey) && (
        <FormHelperText error={!!Object.keys(methods.formState.errors).includes(uniqueKey)} sx={{ mx: 0 }}>
          {Object.keys(methods.formState.errors).includes(uniqueKey) ? fileError : ""}
        </FormHelperText>
      )}
    </>
  );
}
