import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { addProduct } from '../../../../utils/product/addProduct';
import { getSubCategory } from '../../../../utils/categories/getCategories';
import { toast } from 'react-toastify';

export const AddProducts = ({ category }) => {
  const [open, setOpen] = useState(false);
  const [images, setimages] = useState(null);
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const [subCategory, setSubCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selecterSubCat, setSelecterSubCat] = useState('');
  const handleOpen = () => setOpen(!open);
  const getSubCat = async () => {
    const response = await getSubCategory(selectedCategory);
    if (response?.status === 200) {
      setSubCategory(response?.data);
    }
  };
  const handleimages = (e) => {
    setimages(e?.target?.files[0]);
  };
  const handleSubmited = async (values) => {
    let formData = new FormData();
    formData?.append('product_name', values?.product_name);
    formData?.append('descriptions', values?.descriptions);
    formData?.append('weight', values?.weight);
    formData?.append('price', values?.price);
    formData?.append('file', images);
    formData?.append('CategoryId', selectedCategory);
    formData?.append('SubCategoryId', selecterSubCat);
    const response = await addProduct(formData, tokenAdmin);
    if (response?.status === 200) {
      toast.success(response?.data?.message, {
        autoClose: 3000,
        position: 'top-right',
      });
    } else {
      toast.error(response?.response?.data?.message, {
        autoClose: 3000,
        position: 'top-right',
      });
    }
    handleOpen();
  };
  const formik = useFormik({
    initialValues: {
      product_name: '',
      descriptions: '',
      weight: 0,
      price: '',
    },
    onSubmit: (values, action) => {
      handleSubmited(values);
      action.resetForm();
    },
  });
  useEffect(() => {
    getSubCat();
  }, [selectedCategory]);
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add products
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>Add products.</DialogHeader>
          <DialogBody>
            <div className="grid grid-cols-2 gap-10">
              <Input
                required
                label="Product Name"
                name="product_name"
                variant="static"
                value={formik.values.product_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Spicy Burger"
              />
              <Input
                required
                label="Product Descriptions"
                name="descriptions"
                variant="static"
                alue={formik.values.descriptions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Spicy burger with salad and beef inside"
              />
              <Input
                required
                variant="static"
                label="Product Weight"
                alue={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="weight in grams example: 1000grams for 1kg"
                name="weight"
              />
              <Input
                required
                variant="static"
                label="Price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik?.values?.price}
              />
              <Select
                required
                label="Category"
                onChange={(e) => setSelectedCategory(e)}
              >
                {category?.map((category) => (
                  <Option key={category?.id} value={category?.id}>
                    {category?.name}
                  </Option>
                ))}
              </Select>
              <Select
                required
                label="Subcategory"
                onChange={(e) => setSelecterSubCat(e)}
                disabled={selectedCategory === ''}
              >
                {subCategory?.map((subCat) => (
                  <Option key={subCat?.id} value={subCat?.id}>
                    {subCat?.sub_category}
                  </Option>
                ))}
              </Select>
              <Input
                type="file"
                required
                variant="static"
                label="Choose photo"
                name="images"
                onChange={(e) => handleimages(e)}
              />
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};
