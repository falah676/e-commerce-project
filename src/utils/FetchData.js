import { DetailProduct, getImage, getUserData, getUserProfile } from "../supabase/CrudSupabase";

const getDetailProduct = async (setData, id) => {
  const productData = await DetailProduct(id);
  setData(productData);
};

const getImageUrl = async (setImg, fileName) => {
  console.log(fileName);
  const image = getImage(fileName);
    setImg(image.publicUrl)
  }
  
  const getUserLogin = async (setloading) => {
    const { user } = await getUserData();
      if (user) {
        window.location.replace('/admin')
        setloading(false)
      } else {
          window.location.replace('/login')  
      }

      console.log(user);
  }

  const getUserAdmin = async (id, setloading) => {
    const {profiles, error} =  await getUserProfile(id)
    console.log(profiles, error);
  }
  export{
    getDetailProduct,
    getImageUrl,
    getUserLogin,
    getUserAdmin
  }