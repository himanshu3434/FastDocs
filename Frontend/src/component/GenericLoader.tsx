import { RotatingLines } from "react-loader-spinner";

function GenericLoader() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <RotatingLines
        visible={true}
        width="96"
        strokeColor="gray"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}

export default GenericLoader;
