import { useSelector } from 'react-redux';
import { getDistanceBranch } from '../../utils/branch/get.distance.branch';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StoreLocation = ({ deliveried }) => {
  const position = useSelector((state) => state.position.value);
  const [branch, setBranch] = useState();
  // console.log(position);
  const getDistance = async () => {
    const response = await getDistanceBranch(
      position?.latitude,
      position?.longitude,
    );
    // console.log(response);
    if (response?.status === 200) {
      setBranch(response?.data?.branches);
    } else {
      toast.warn(response?.response?.data, {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };
  // console.log(branch);
  useEffect(() => {
    getDistance();
  }, [position, deliveried]);
  // console.log(branch);
  return (
    <div className="font-poppins rounded-lg w-[50%] overflow-hidden ">
      <div
        className={`${
          deliveried ? 'flex justify-center' : 'flex justify-start'
        } laptop:mt-2 laptop:mx-2 laptop: flex laptop:justify-start`}
      >
        <div className="flex flex-col py-2">
          <small className="font-bold laptop:text-sm">
            {branch?.branch_name}
          </small>
          <small className="text-gray-500 text-[10px] laptop:text-sm">
            {branch?.address}
          </small>
        </div>
      </div>
    </div>
  );
};
