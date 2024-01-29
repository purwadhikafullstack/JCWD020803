import { IconButton, Tooltip } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ModalUploadImage } from './ModalImages';
import { ModalEmail } from './ModalEmail';
import { ModalPhone } from './ModalPhone';
import { useNavigate } from 'react-router-dom';
import { ButtonVerifyPhone } from './ButtonVerifyPhone';
import { requestVerifyEmail } from '../../../../utils/customer/change.email';
import { MdVerified } from 'react-icons/md';

export const ProfileBody = () => {
  useEffect(() => {
    AOS.init({
      disable: false,
      once: false,
      duration: '2000',
    });
  });
  const user = useSelector((state) => state.customer.value);
  const textRef = useRef('');
  const [copy, setCopy] = useState('Copy');

  const handleCopied = () => {
    navigator.clipboard.writeText(textRef.current.innerText);
    setCopy('Copied');
  };
  const token = localStorage.getItem('token');
  const handleVerifyEmail = async () => {
    const response = await requestVerifyEmail(token);
    console.log(response);
  };

  return (
    <section className="bg-gray-200 h-[100%] pb-3">
      <div className="bg-white py-5 mx-2 h-[100%] shadow-lg rounded-lg laptop:px-5">
        <div className="flex flex-col pl-3 pt-1">
          <div>
            <ModalUploadImage />
          </div>
          <div className="flex flex-col gap-3 font-poppins">
            <h1 className="font-bold text-2xl" data-aos="fade-up">
              Welcome {user?.username}!
            </h1>
            <div className="flex justify-between items-center tablet:pr-4 mobile:pr-0">
              <p className="text-md text-gray-600" data-aos="fade-up">
                Email: {user?.email}
              </p>
              <div className="flex gap-3 pr-1 tablet:flex tablet:gap-5 mobile:flex">
                {user?.isVerified === false ? (
                  <button
                    className="bg-black/90 text-white rounded-lg py-[10px] px-[15px] text-[14px]"
                    onClick={handleVerifyEmail}
                  >
                    Verify
                  </button>
                ) : (
                  <MdVerified className="text-blue-500" size={30} />
                )}
                <ModalEmail email={user?.email} />
              </div>
            </div>
            <div className="flex justify-between items-center tablet:pr-4 mobile:pr-0">
              <p className="text-md text-gray-600" data-aos="fade-up">
                Phone: {user?.phone_number}
              </p>
              <div className="flex gap-3 pr-1 tablet:flex tablet:gap-5 mobile:flex">
                <ButtonVerifyPhone user={user} />
                <ModalPhone />
              </div>
            </div>
            <div className="flex justify-between items-center pr-4 pt-5">
              <div className="flex gap-3 items-center">
                <h3 data-aos="fade-up">Referral code :</h3>
                <p ref={textRef} className="font-bold" data-aos="fade-up">
                  {user?.referral_code}
                </p>
              </div>
              <div data-aos="fade-up">
                <Tooltip content={copy} placement="left">
                  <IconButton
                    className="bg-main-blue rounded-2xl w-8 h-8"
                    onClick={handleCopied}
                  >
                    <MdOutlineContentCopy size={'14px'} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
