import { toast } from "react-toastify";

const ToastError = ({ message }) => {
    toast.dismiss()
    toast.error(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

}
const ToastSuccess = ({ message }) => {
    toast.dismiss()
    toast.success(message, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
const ToastWorn = ({ message }) => {
    toast.dismiss()
    toast.warn(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

}
export default ToastError
export { ToastSuccess, ToastWorn };