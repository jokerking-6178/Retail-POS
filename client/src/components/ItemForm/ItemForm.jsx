import React, { useContext, useState } from 'react'
import { assets} from '../../assets/assets'
import {AppContext} from '../../context/AppContext.jsx'
import toast from 'react-hot-toast'
import {addItem} from '../../Service/ItemService.js'

const ItemForm = () => {
    const {categories, setItemsData, itemsData, setCategories} = useContext(AppContext)
    const [image, setImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: "",
    })

    const onChangeHandler = (e) => {
        const value = e.target.value
        const name = e.target.name
        setData((data) => ({...data, [name]: value}))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append("item", JSON.stringify(data))
        formData.append("file", image)
        try {
            if(!image){
                toast.error("select image")
                return
            }
            const response = await addItem(formData)
            if(response.status === 201){
                setItemsData([...itemsData, response.data])
                setCategories((prev) => prev.map((category) => category.categoryId === data.categoryId ? {...category, items: category.items + 1} : category))
                toast.success("item added")
                setData({
                    name: "",
                    categoryId: "",
                    price: "",
                    description: "",
                })
                setImage(false)
            }else{
                toast.error("unable to add item")
            }
        } catch (error) {
            console.error("unable to add item")
            toast.error("unable to add item")
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className="item-form-container" style={{height: '100vh', overflowY: 'auto', overflowX: 'hidden'}}>
        <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-8 form-container">
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="image" className='from-label'>
                                <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={48}/>
                            </label>
                            <input type="file" name="image" id="image" className='form-control' onChange={(e) =>  setImage(e.target.files[0])} hidden/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className='form-label'>Name</label>
                            <input type="text" name="name" id="name" placeholder='Item Name' required value={data.name} onChange={onChangeHandler} className='form-control' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className='form-label'>Category</label> 
                            <select name="categoryId" id="categoryId" value={data.categoryId} required onChange={onChangeHandler} className='form-control'>
                                <option value="">--SELECT CATEGORY--</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.categoryId}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className='form-label'>Price</label>
                            <input type="number" name='price' id='price' className='form-control' required value={data.price} onChange={onChangeHandler} placeholder='&#8377;200.00'/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className='form-label'>Description</label>
                            <textarea rows="5" type="description" name="description" id="description" value={data.description} onChange={onChangeHandler} placeholder='Write Content here ..' className='form-control' />
                        </div>
                        <button type="submit" className='btn btn-warning w-100' disabled={loading}>{loading ? 'Loading' : 'Save'}</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ItemForm