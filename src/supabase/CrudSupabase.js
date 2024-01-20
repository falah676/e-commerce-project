import Swal from "sweetalert2";
import { supabase } from "./Client";
const uploadImageProduct = async (FileName, file) => {
  const { error } = await supabase.storage
    .from("task_school_1")
    .upload(FileName, file);
  if (error) {
    console.error(error.message);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error.message}`
    })
    return;
  }
}

const deletImage = async(FileName) => {
  const { data, error } = await supabase.storage
  .from('task_school_1')
  .remove([FileName])
  if (error) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: `Cannot Delete Image`
    })
    console.log(data);
  }
} 
const getImage = (FileName) => {
  const { data, error } = supabase.storage
    .from("task_school_1")
    .getPublicUrl(FileName)
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal Mendapatkan Gambar!',
      text: `Server Error`
    })
  } else {
    return data
  }
}
const InsertUser = async (nameValue, totalValue, descValue, priceValue, categoryValue, fileName, file, imgUrl) => {
  const { error } = await supabase
    .from('task_school_1')
    .insert([
      { product_name: nameValue, total_product: totalValue, product_desc: descValue, price: priceValue, category: categoryValue, img_url: imgUrl },
    ])
    .select();
  uploadImageProduct(fileName, file)
  return error
}

const SelectAllProduct = async () => {
  let { data: task_school_1, error } = await supabase
    .from('task_school_1')
    .select('*')
  return { error, data: task_school_1 }
}

const DeleteProduct = async (id) => {
  const { error } = await supabase
    .from('task_school_1')
    .delete()
    .eq('id', id)
  return { error };
}

const DetailProduct = async (id) => {
  const { data, error } = await supabase
    .from('task_school_1')
    .select()
    .eq('id', id)

  if (!error && data.length > 0) {
    return data[0]
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Data not found!',
    })
    console.error(error);
    throw new Error(error.message)
  }
}


const updateProduct = async (id, nameValue, totalValue, descValue, priceValue, categoryValue, file, fileName, fileNameOld, imgUrl) => {
  const { error } = await supabase
    .from('task_school_1')
    .update({ product_name: nameValue, total_product: totalValue, product_desc: descValue, price: priceValue, category: categoryValue, img_url:imgUrl })
    .eq('id', id)
    .select()

    if (typeof file === 'object') {
      await deletImage(fileNameOld);
      await uploadImageProduct(fileName, file)
    }
  return { error }
}
export {
  InsertUser,
  DeleteProduct,
  SelectAllProduct,
  DetailProduct,
  getImage,
  updateProduct
}