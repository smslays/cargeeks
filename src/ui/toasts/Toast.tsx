import * as React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface IToastProps {
  autoClose?: number;
}

export const Toast: React.FunctionComponent<IToastProps> = ({ autoClose }) => {
  return (
    <>
      <ToastContainer autoClose={autoClose ? autoClose : 8000} />
    </>
  );
};

export const successToast = (message: string, autoClose?: number) =>
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: autoClose ? autoClose : 8000,
  });
export const errorToast = (message: string, autoClose?: number) =>
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: autoClose ? autoClose : 8000,
  });
export const warningToast = (message: string, autoClose?: number) =>
  toast.warning(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: autoClose ? autoClose : 8000,
  });

export const promiseToast = (
  promise: Promise<any>,
  messageObj: { pending?: string; success?: string; error?: string }
) => toast.promise(promise, messageObj);
