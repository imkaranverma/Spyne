import React from "react";
import Dialog from "@mui/material/Dialog";
import { Button, Typography } from "@mui/material";
import { AnimationComponent } from "./AnimationComponent";
import tick from "../assets/lottieAnimations/tickAnimation.json";

export const ConfirmDialog = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [confirmed, setConfirmed] = React.useState(false);
  // const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("i");
  };

  const handleClose = () => {
    console.log("u");
  };

  const confirming = () => {
    setConfirmed(true);
    setTimeout(() => {
      setOpen(false);
    }, 2200);
  };

  return (
    <div>
      {!confirmed ? (
        <div className="w-fit">
          <AnimationComponent animation={tick} />
          <Typography className="py-5 px-0 mx-0 text-black w-full text-center">Are you sure you want to approve</Typography>
          <div className="flex justify-around  gap-4 px-0 py-4">
            <Button
              variant="outlined"
              className="w-[20%]"
              onClick={() => {
                setOpen(false);
              }}
            >
              No
            </Button>
            <Button variant="contained" className="w-[20%]" autoFocus onClick={() => confirming()}>
              Yes
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <AnimationComponent animation={tick} />
          </div>
          <Typography className="py-3 px-2 w-full text-black text-center">Claimed Approved Succesfully</Typography>
        </>
      )}
    </div>
  );
};
