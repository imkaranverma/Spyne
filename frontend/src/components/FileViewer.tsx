import React from "react";
import Typography from "@mui/material/Typography";
import { ImageViewer } from "./ImageViewer";

// TODO: Need to accept type prop to render other file type ui
export const FileViewer = ({ summaryData, dataType }: { summaryData: { title: string; link: string; type: string }[]; dataType: string }) => {
  return (
    // $######################################################
    <div>
      {dataType === "IMAGE" || undefined ? (
        <ImageViewer fileData={summaryData} />
      ) : (
        <Typography>PDF VIEWER LIBRARY</Typography>
        /* TODO: PDF Viewer  libraray to be used here!!!!!!*/
      )}
    </div>
  );
};
