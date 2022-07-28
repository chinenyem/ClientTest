import { FC, useState, CSSProperties } from "react";
import RotateLoader from "react-spinners/RotateLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    top:"50%",
    left:"50%",
    zIndex: 1,
    position: 'absolute',
};

type Props = {
    loading: boolean;
    size:number;
};

const AppLoader: FC<Props> =  (props) => {
    let [loading, setLoading] = useState(props.loading);
    let [color, setColor] = useState("#ffffff");

    return (
        <RotateLoader color={color} loading={loading} cssOverride={override} size={props.size} />
    )
}


export default AppLoader;