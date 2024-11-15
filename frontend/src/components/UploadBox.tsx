import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Accept, useDropzone } from "react-dropzone";
// @mui
import { styled, alpha } from "@mui/material/styles";
//
import UploadIcon from "@mui/icons-material/Upload";
import { Button, Grid, Typography, Box, Chip, LinearProgress, TextField, Stack } from "@mui/material";
import React from "react";
import { uploadFileToBucket } from "src/api/apiHelper";
// import Iconify from '../iconify';
// ----------------------------------------------------------------------

const thumbsContainer: React.CSSProperties | undefined = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb: React.CSSProperties | undefined = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};
const StyledDropZone = styled("div")(({ theme }) => ({
  width: "100%",
  height: "160px",
  fontSize: 24,
  display: "flex",
  flexShrink: 0,
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(0.5),
  color: theme.palette.text.disabled,
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
  "&:hover": {
    opacity: 0.72
  }
}));

// ----------------------------------------------------------------------

interface CustomFile extends File {
  url?: string;
}

interface UploadBoxInterface {
  sx?: any;
  error?: boolean;
  disabled?: boolean;
  placeholder?: React.ReactNode;
  files?: Array<CustomFile>;
  previewMode?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  accept?: Accept;
  handleFileSubmission: (files: File[]) => void;
}

export default function UploadBox({ accept, multiple = true, maxFiles = 2, handleFileSubmission, placeholder = <>Supported formats: png/jpg/jpeg/pdf. Max size: 2MB</>, error, disabled, sx, ...other }: UploadBoxInterface) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles } = useDropzone({
    multiple: multiple,
    maxFiles: maxFiles,
    accept: accept,
    disabled,
    ...other,
    onDrop: (addedFiles) => {
      const newFiles = [];
      addedFiles.forEach(async (filee) => {
        await uploadFileToBucket({ showUploadProgress: false, file: filee }).then((resp) => {
          console.log(resp);
          Object.assign(filee, {
            preview: URL.createObjectURL(filee),
            url: resp.data.url,
            reference_key: resp.data.reference_key
          });
        });
      });
      handleFileSubmission(addedFiles);
    }
  });

  const isError = isDragReject || error;

  // eslint-disable-next-line consistent-return, array-callback-return
  const thumbs = (other.files ?? []).map((file) => {
    return (
      <div key={file.name}>
        {/* <Typography variant="body1">Uploaded File: {file.name}</Typography> */}
        <Typography
          // variant="span"
          style={{ textDecoration: "underline", color: "#000", textUnderlineOffset: "3px" }}
          component="a"
          href={file.url}
          target="_blank"
          rel="noreferrer"
        >
          Preview File :{file.name}
        </Typography>
      </div>
    );

    // if (typeof file === 'string') {
    //   return (
    //     <div style={thumb} key={file}>
    //       <div style={thumbInner}>
    //         <img src={file} style={img} alt="Preview not available" />
    //       </div>
    //     </div>
    //   );
    // }
    // return (
    //   <div style={thumb} key={file.name}>
    //     <div style={thumbInner}>
    //       <img
    //         src={file?.url}
    //         style={img}
    //         alt="Preview not available"
    //         // Revoke data uri after image is loaded
    //         onLoad={() => {
    //           {
    //             file?.url && URL.revokeObjectURL(file.url);
    //           }
    //         }}
    //       />
    //     </div>
    //   </div>
    // );
  });
  return (
    <>
      <StyledDropZone
        style={{ width: "fit-content" }}
        // multiple={false}
        {...getRootProps()}
        sx={{
          display: "flex",
          // flexDirection: "row-reverse",
          ...(isDragActive && {
            opacity: 0.72
          }),
          height: "3rem",
          ...(isError && {
            color: "error.main",
            bgcolor: "error.lighter",
            borderColor: "error.light"
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: "none"
          }),
          ...sx
        }}
      >
        <input {...getInputProps()} />

        <Typography sx={{ pl: "1rem" }}>Choose a file</Typography>
        <UploadIcon width={"88px"} sx={{ width: "5rem" }} />
        {/* <Typography>{placeholder}</Typography> */}
      </StyledDropZone>
      <div>
        {/* <div>AccpeptedFiles</div>
        {acceptedFiles && acceptedFiles[0] ? acceptedFiles[0].name : null} */}
      </div>
      {other.previewMode ? <aside style={thumbsContainer}>{thumbs}</aside> : null}
    </>
  );
}
