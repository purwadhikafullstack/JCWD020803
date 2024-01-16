import { useState } from 'react';
import { CartFunction } from '../../utils/cart/cart.function';
export const Coupon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteAllItems } = CartFunction();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAllItems = async () => {
    try {
      await deleteAllItems();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[62.8vw] h-[20vh] flex flex-col space-y-3 mt-6">
      <p>Coupon Code:</p>
      <section className="relative flex space-x-[23.5vw]">
        <div className="flex space-x-1">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            className="border border-gray-300 py-3 px-7 xl:px-14 text-sm focus:outline-none focus:border-black rounded-md"
          />
          <button className="bg-main-red hover:bg-main-blue rounded-md transition-all w-[25vw] md:w-[15vw] xl:w-[9vw] text-white font-bold">
            Apply
          </button>
        </div>
        <button
          onClick={openModal}
          className="absolute top-[7vh] md:top-0 md:left-[70vw] xl:left-[30.3vw] -left-[0vh] w-[27vw] md:w-[16vw] xl:w-[9vw] py-[1.5vh] md:py-[1vh] xl:py-[1.5vh] hover:bg-main-red rounded-md transition-all text-black hover:text-white font-semibold border border-gray-300"
        >
          Clean Cart
        </button>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md">
            <p className="text-lg font-semibold mb-3">
              Are you sure you want to clean the cart?
            </p>
            <div className="flex justify-end">
              <button className="mr-2" onClick={closeModal}>
                Cancel
              </button>
              <a href="/cart">
                <button
                  className="bg-main-red text-white px-4 py-2 rounded-md"
                  onClick={handleDeleteAllItems}
                >
                  Confirm
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
