import { useState } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import Typography from "@mui/material/Typography";

interface FileInterface {
  title: string;
  link: string;
  type: string | "PDF" | "IMAGE";
  // TODO: make type to either accept Image or PDF
}

export const ImageViewer = ({ fileData }: { fileData: FileInterface[] }) => {
  const [fileIndex, setFileIndex] = useState(0);

  const files = fileData;

  return (
    <div className="w-full h-full  flex flex-col">
      <div>
        <Typography variant="h6">{files[fileIndex].title}</Typography>
        <div className="flex justify-center relative flex-col">
          <IoIosArrowDropleftCircle
            size={"25"}
            className="absolute text-gray-900 z-3 h-100px left-4 cursor-pointer hover:opacity-25"
            onClick={() => {
              if (fileIndex > 0) setFileIndex(fileIndex - 1);
              else {
                setFileIndex(files.length - 1);
              }
            }}
          />
          <img src={files[fileIndex].link} className="border border-sm border-gray-900"></img>
          <IoIosArrowDroprightCircle
            size={"25"}
            className="absolute text-gray-900 z-3 h-100px right-4 cursor-pointer hover:opacity-25"
            onClick={() => {
              if (fileIndex < files.length - 1) setFileIndex(fileIndex + 1);
              else setFileIndex(0);
            }}
          />
        </div>
      </div>
      {files.length > 0 ? (
        <div className="w-full  flex justify-center my-4 gap-3 cursor-pointer">
          {files.map((ele, index) => (
            <div className="relative">
              <img
                className="w-[70px] h-[70px] content-fit border border-black border-sm hover:cursor-pointer hover:ring-2 "
                src={ele.link}
                onClick={() => {
                  setFileIndex(index);
                }}
              ></img>
              <Typography
                sx={{ position: "absolute", top: "50%", left: "50%", fontSize: "10px", transform: "translate(-50%,-50%)", textAlign: "center" }}
                onClick={() => {
                  setFileIndex(index);
                }}
              >
                {ele.title}
              </Typography>
            </div>
          ))}
        </div>
      ) : (
        "NO IMAGE DATA FOUND"
      )}
    </div>
  );
};
