import Loader from "react-loader-spinner";

type SpinnerProps = {
    height?: number
}

export const Spinner = ({height = 60}:SpinnerProps) => {
    return (
        <Loader
            type="Oval"
            color="#171212"
            height={60}
            width={height}
        />
    )
};