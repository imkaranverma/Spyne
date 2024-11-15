import { Flip, Id, Slide, ToastContainerProps, ToastOptions, toast } from "react-toastify";

export class ToasterService {
  static toastConfig: ToastContainerProps = {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    theme: "light",
    transition: Slide
  };

  static success = (message: string, options?: ToastOptions | undefined): void => {
    toast.success(message, options);
  };

  static error = (message: string, options?: ToastOptions | undefined): void => {
    toast.error(message, options);
  };

  static warning = (message: string, options?: ToastOptions | undefined): void => {
    toast.warning(message, options);
  };

  static loading = (message: string, options?: ToastOptions | undefined): void => {
    toast.loading(message, options);
  };

  static dismiss = (toastId?: Id | undefined): void => {
    toast.dismiss(toastId);
  };
}
