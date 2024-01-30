import { useDispatch, useSelector } from "react-redux";
import { relapseOff, relapseOn } from "../redux/slices/conversationSlice";
import { useNavigate } from "react-router-dom";

const Relapse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { relapse } = useSelector((state) => state.conversationSlice);
  const handleRelapse = () => {
    dispatch(relapseOn());
    navigate("/chat");
  };
  return (
    <div className="fixed bottom-6 right-6 max-w-20 flex flex-col justify-center items-center">
      <button
        className={`p-5 ${
          relapse ? `hidden` : ` block`
        } rounded-full hover:p-6 duration-200 bg-red-600`}
        onClick={handleRelapse}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 512 512"
          transform="rotate(-45)"
          fill="white"
        >
          <path d="M128,144V476a4,4,0,0,0,4,4H232.07a8,8,0,0,0,7.82-9.7L208.71,352H232a8,8,0,0,0,8-8V144Z" />
          <path d="M452.18,186.55,448,185.5V36a4,4,0,0,0-4-4H401.5a4,4,0,0,0-2.63,1L272,144V304L398.87,415a4,4,0,0,0,2.63,1H444a4,4,0,0,0,4-4V262.5l4.18-1.05C461.8,258.84,480,247.67,480,224S461.8,189.16,452.18,186.55Z" />
          <path d="M96,144H52a4,4,0,0,0-4,4v35.59a43,43,0,0,0-4.24,4.35C38.4,194.32,32,205.74,32,224c0,20.19,7.89,33.13,16,40.42V300a4,4,0,0,0,4,4H96Z" />
        </svg>
      </button>
    </div>
  );
};
export default Relapse;
