import { toast } from "react-hot-toast"

function Toast(message, type, duration, mode = "dark") {
    switch (type) {
        case "error":
            return (
                toast.error(message, {
                    duration: duration,
                    style: selectMode(mode)
                })
            )
        case "success":
            return toast.success(message, {
                duration: duration,
                style: selectMode(mode)
            })
    }

}

function selectMode(mode) {
    switch (mode) {
        case "dark":
            return {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        case "light":
            return {
                borderRadius: '10px',
                background: '#fff',
                color: '#333',
            }
    }
}


export default Toast