import toast from "react-hot-toast";

export function navigateWithToast(
    navigate,
    path,
    message,
    messageType,
    delay = 2000
) {
    if (messageType === "success") toast.success(message);
    if (messageType === "error") toast.error(message);

    setTimeout(() => {
        navigate(path);
    }, delay);
}
