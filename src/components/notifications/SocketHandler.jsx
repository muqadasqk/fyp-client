import { socket } from "@utils";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const socketHandler = () => {
    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user?._id) {
            socket.auth = { token };
            socket.connect();
            socket.emit("join", user._id);
        }

        return () => {
            socket.disconnect();
        };
    }, [user]);

    return null;
}

export default socketHandler;