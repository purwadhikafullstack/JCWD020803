import { useState } from 'react';
import { CartFunction } from '../../utils/cart/cart.function';
import { shipmentFunction } from '../../utils/transaction/shipment.function';
import { AiOutlineClose } from 'react-icons/ai';

export const Checkout = ({ deliveried }) => {
  const { cartData } = CartFunction();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { postData } = shipmentFunction(selectedPaymentMethod);

  const totalHargaProduk = cartData.reduce(
    (total, item) =>
      total +
      (
        item.Cart_detail.quantity * item.Cart_detail.Product.price
      ).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }),
    '',
  );

  return (
    <>
      <div className="w-full xl:w-[30vw] bg-white px-4 py-7 xl:rounded-xl xl:ml-5 h-fit space-y-5 font-poppins">
        <p className="font-semibold">Shopping Summary</p>
        <section className="space-y-2">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <p>Total Product Price</p>
              <p>{totalHargaProduk}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Shipping Cost</p>
              <p>Rp.0</p>
            </div>
          </div>

          <div className="flex justify-between h-8 font-semibold items-end xl:border-t border-gray-400">
            <p>Total Spending</p>
            <p>-</p>
          </div>
        </section>
        <button className="font-semibold text-gray-800 border w-full border-gray-400 py-3 rounded-lg">
          Save More with Promo
        </button>
        <button
          disabled={deliveried?.length < 1}
          onClick={() => {
            // Assuming `paymentMethodId` is a string or a number
            const paymentMethodId = '2'; // Replace this with your logic to get the payment method ID
            document.getElementById('my_modal_1').showModal();
            setSelectedPaymentMethod(String(paymentMethodId)); // Convert to string explicitly
          }}
          className={`${
            deliveried?.length >= 1
              ? 'bg-main-red w-full py-3 rounded-md text-white font-bold'
              : 'cursor-not-allowed  w-full py-3 rounded-md text-white font-bold bg-gray-200'
          }`}
        >
          Select Payment
        </button>
      </div>
      <section>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="flex items-center">
              <form method="dialog">
                <button className="text-3xl flex items-center">
                  <AiOutlineClose />
                </button>
              </form>
              <h3 className="font-bold text-lg mt-1 ml-5">Pembayaran</h3>
            </div>
            <div role="tablist" className="tabs tabs-bordered">
              <input
                type="radio"
                value="1"
                checked={selectedPaymentMethod === '1'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="Payment Gateway"
              />
              <div role="tabpanel" className="tab-content p-10">
                Tab content 1
              </div>

              <input
                type="radio"
                value="2"
                checked={selectedPaymentMethod === '2'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="Manual"
              />
              <div role="tabpanel" className="tab-content p-10">
                <p>
                  Anda bisa bayar ke nomor berikut <br /> setelah berhasil bisa
                  kirimkan bukti pembayarannya
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col text-sm">
                <p>Total Bill</p>
                <p>{totalHargaProduk}</p>
              </div>
              <button
                onClick={postData}
                className="bg-main-red text-white px-[6.5vw] rounded-md"
              >
                Pay
              </button>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};
