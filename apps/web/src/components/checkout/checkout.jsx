import { useEffect } from 'react';
import { shipmentFunction } from '../../utils/transaction/shipment.function';
import { AiOutlineClose } from 'react-icons/ai';

export const Checkout = () => {
  const { shipmentData, postData } = shipmentFunction();

  useEffect(() => {}, [shipmentData]);

  const calculateTotalQuantity = (products) => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };
  return (
    <>
      <div className="w-full xl:w-[30vw] bg-white px-4 py-7 xl:rounded-xl xl:ml-5 h-fit space-y-5">
        <p className="font-semibold">Ringkasan belanja</p>
        {shipmentData.map((item) => (
          <section className="space-y-2">
            <div className="flex justify-between text-sm">
              <p>
                Total Harga ({calculateTotalQuantity(item.Transaction_products)}{' '}
                Produk)
              </p>
              <p>Rp.{item.total}</p>
            </div>
            <div className="flex justify-between h-8 font-semibold items-end xl:border-t border-gray-400">
              <p>Total Belanja</p>
              <p>-</p>
            </div>
          </section>
        ))}
        <button className="font-semibold text-gray-800 border w-full border-gray-400 py-3 rounded-lg">
          Makin hemat pakai promo
        </button>
        <button
          onClick={() => document.getElementById('my_modal_1').showModal()}
          className="bg-main-red w-full py-3 rounded-md text-white font-bold"
        >
          Pilih Pembayaran
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
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="Manual"
                checked
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
                <p>Total Tagihan</p>
                <p>Rp 26.000</p>
              </div>
              <button
                onClick={postData}
                className="bg-main-red text-white px-[6.5vw] rounded-md"
              >
                Bayar
              </button>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};
