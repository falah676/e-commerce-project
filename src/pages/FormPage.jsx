import React, { useEffect, useState } from 'react'
import useInput from '../hooks/useInput'
import { InsertUser, updateProduct } from '../supabase/CrudSupabase';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../Components/LoadingComponent'
import { getDetailProduct } from '../utils/FetchData';
import { v4 as uuidv4 } from 'uuid';
const FormPage = () => {
  const [initializing, setInitializing] = useState(true);
  const { id } = useParams();
  const idNumber = Number(id);
  const isEdit = !isNaN(idNumber);
  const [nameValue, handleNameValue, setNameValue] = useInput('')
  const [stockValue, handleStockValue, setStockValue] = useInput('');
  const [priceValue, handlePriceValue, setPriceValue] = useInput('');
  const [categoryValue, handleCategoryValue, setCategoryValue] = useInput('');
  const [descValue, handleDescValue, setDescValue] = useInput('');
  const [imgValue, setImgValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(() => {
    isEdit ? getDetailProduct(setData, idNumber) : setInitializing(false)
  }, [isEdit])
  useEffect(() => {
    if (data) {
      setNameValue(data.product_name)
      setPriceValue(data.price)
      setStockValue(data.total_product)
      setCategoryValue(data.category)
      setDescValue(data.product_desc);
      setTimeout(() => (
        setInitializing(false)
        ), 2000)
    }
  }, [data])
  const handleImageValue = (e) => setImgValue(e.target.files[0])
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let imgUrl;
    if (!nameValue || !priceValue || !categoryValue || !stockValue || descValue.length < 30 || !descValue || !imgValue) {
      alert("error");
      return;
    }
    if (imgValue) {
      imgUrl = uuidv4()
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Image is not found",
        showConfirmButton: false,
        timer: 1500,
      })
      return;
    }
    if (!imgUrl) {
      console.log(imgUrl);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong when trying to upload the image!'
      })
      setIsLoading(false)
      return;
    }
    if (isEdit) {
      const {error} = await updateProduct(idNumber, nameValue, stockValue, descValue, priceValue, categoryValue);
      if (!error) {
        Swal.fire({
          icon: "success",
          title: `Data berhasil disimpan`,
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/')
      } else {
        Swal.fire({
          icon: "error",
          title: `${error.message}`
        })
        setIsLoading(false);
        return;
      }
        } else {
      const imageName = categoryValue + '/' + imgUrl
      const insert = await InsertUser(nameValue, stockValue, descValue, priceValue, categoryValue, imageName, imgValue, imgUrl)
      console.log(imgUrl);
      if (!insert) {
        Swal.fire({
          icon: "success",
          title: `Data berhasil disimpan`,
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/')
      } else {
        Swal.fire({
          icon: "error",
          title: `${insert.message}`
        })
        setIsLoading(false);
        return;
      }
    }
  }
  console.log(isEdit);
  if (initializing) {
    return <LoadingComponent />
  }
  return (
    <section className='flex justify-center items-center py-9 px-5'>
      <div className='p-10 rounded-md w-full'>
        <h2 className='text-xl text-center mb-5 uppercase'>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Product Name</span>
            </div>
            <input required disabled={isLoading} value={nameValue} onChange={handleNameValue} type="text" placeholder="Type here" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Product Price</span>
            </div>
            <input required disabled={isLoading} value={priceValue} onChange={handlePriceValue} type="number" placeholder="Type here" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Stock Product</span>
            </div>
            <input required disabled={isLoading} value={stockValue} onChange={handleStockValue} type="number" placeholder="Type here" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Category Product</span>
            </div>
            <select disabled={isLoading} className="select select-bordered" onChange={handleCategoryValue} value={categoryValue}>
              <option disabled selected value="selected">Pick one</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
            </select>
          </label>

            { 
            !isEdit&&
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Choose Photo</span>
            </div>
            <input type="file" className="file-input file-input-bordered w-full" accept="image/*" onChange={handleImageValue}/>
          </label>
            }

          <label className="form-control">
            <div className="label">
              <span className="label-text">Desciption</span>
            </div>
            <textarea disabled={isLoading} onChange={handleDescValue} className="textarea textarea-bordered h-24" placeholder="Description" defaultValue={descValue}></textarea>
          </label>
          {isLoading ?
            <div className='mt-5 flex gap-3 justify-end'>
              <button className="btn btn-xs md:btn-sm  btn-error" disabled>
                <span className="loading loading-spinner"></span>
                loading
              </button>
              <button className="btn btn-xs md:btn-sm  btn-success" disabled>
                <span className="loading loading-spinner"></span>
                loading
              </button>

            </div>
            :
            <div className='mt-5 flex gap-3 justify-end'>
              <button type='reset' className="btn btn-xs md:btn-sm btn-outline btn-error">Reset</button>
              <button type='submit' className="btn btn-xs md:btn-sm btn-success btn-outline">Submit</button>
            </div>
          }
        </form>
      </div>
    </section>
  )
}

export default FormPage