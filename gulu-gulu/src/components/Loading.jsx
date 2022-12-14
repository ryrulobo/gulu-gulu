import { Bars } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center" data-testid="loading">
      <Bars
        color="#243A73"
        height={550}
        width={80}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
