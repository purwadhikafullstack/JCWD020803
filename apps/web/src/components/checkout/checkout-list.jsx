import { useNavigate } from 'react-router-dom';
import { Checkout } from './checkout';
import { useSelector } from 'react-redux';

export const CheckoutList = ({ cartData }) => {
  const deliveried = useSelector((state) => state.delivery.value);
  const navigate = useNavigate();
  return (
    <div className="pt-6 bg-[#F0F3F7] h-auto pb-10">
      <header className=" w-[100vw] md:w-[80vw] xl:w-[92vw] m-auto xl:flex space-y-2 xl:space-y-[9.5vh]">
        <div className="md:w-[80vw] xl:w-[61vw] ">
          <div className="hidden xl:block text-3xl font-bold text-black">
            Shipping
          </div>
          {deliveried?.length >= 1 ? (
            deliveried?.map((delivery) => (
              <section
                className="-mt-8 xl:mt-6 space-y-2 bg-white px-5 py-6 xl:rounded-xl shadow-lg"
                key={delivery?.id}
              >
                <p className="xl:font-semibold text-xs xl:text-sm text-[#6D7588]">
                  SHIPPING ADDRESS
                </p>
                <p className="text-sm">
                  <span className="font-bold">{delivery?.received_name}</span> (
                  {delivery?.label_address})
                </p>
                <div className="h-6 overflow-hidden xl:w-fit xl:h-fit">
                  <p>{delivery?.street}</p>
                </div>
                <button
                  className="hidden xl:block border border-[#6D7588] rounded-lg px-4 text-md text-[#6D7588] font-semibold"
                  onClick={() => navigate('/customer-dashboard/address')}
                >
                  {deliveried ? 'Choose another address' : 'Add address'}
                </button>
              </section>
            ))
          ) : (
            <section className="-mt-8 xl:mt-6 space-y-2 bg-white px-5 py-6 xl:rounded-xl shadow-lg">
              <p className="xl:font-semibold text-xs xl:text-sm text-[#6D7588]">
                SHIPPING ADDRESS
              </p>
              <p className="text-sm">
                <span className="font-bold">you don't have an address yet</span>
              </p>
              <div className="h-6 overflow-hidden xl:w-fit xl:h-fit">
                <p>Choose another address</p>
              </div>
              <button
                className="hidden xl:block border border-[#6D7588] rounded-lg px-4 text-md text-[#6D7588] font-semibold"
                onClick={() => navigate('/customer-dashboard/address')}
              >
                add address
              </button>
            </section>
          )}
          {cartData.map((item) => (
            <section key={item?.id}>
              <div className="flex-col bg-white pl-6 mt-2 xl:mt-4 pt-4 pb-14 xl:rounded-xl shadow-lg">
                <p className="font-bold">Served by Ez Mart</p>
                <p className="pb-3">
                  {
                    item.Cart_detail.Product.Branch_products[0].Branch
                      .branch_name
                  }
                </p>
                <div className="flex w-full">
                  <div className="w-[17vw] h-[8vh] md:w-[12vw] md:h-[10vh] xl:w-[6.5vw] xl:h-[13vh]">
                    <img
                      src="https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/5/26/532471bc-a27e-4ac8-a79c-786b06758ffd.png.webp?ect=4g"
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="relative flex flex-col w-fit h-[14vh] xl:w-[84%] ml-4 space-y-2">
                    <div className=" xl:flex justify-between">
                      <p className="text-gray-900">
                        {item.Cart_detail.Product.product_name}
                      </p>
                      <p className="font-semibold">
                        {item.Cart_detail.quantity} x{' '}
                        {item.Cart_detail.Product.price.toLocaleString(
                          'id-ID',
                          {
                            style: 'currency',
                            currency: 'IDR',
                          },
                        )}
                      </p>
                    </div>
                    <p>{item.Cart_detail.Product.descriptions}</p>
                    <button className="text-black border border-[#6D7588] w-[90vw] md:w-[75vw] absolute xl:static top-[10vh] -left-[21vw] md:top-[11vh] md:-left-[14vw] xl:w-full xl:px-[5vw] py-2.5 rounded-md font-semibold mt-2">
                      Shipping
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
        <Checkout cartData={cartData} deliveried={deliveried} />
      </header>
    </div>
  );
};
