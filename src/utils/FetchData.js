import { DetailProduct, getImage } from "../supabase/CrudSupabase";

const getDetailProduct = async (setData, id) => {
    const productData = await DetailProduct(id);
    setData(productData);
  };

  const getImageUrl = async (setImg, fileName) => {
    const image = getImage(fileName);
    setImg(image.publicUrl)
  }

  export{
    getDetailProduct,
    getImageUrl
  }