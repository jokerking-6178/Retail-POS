import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'
import { addCategory } from '../../Service/CategoryService'
import {AppContext} from '../../context/AppContext.jsx'

const CategoryForm = () => {

    const {setCategories, categories} = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
    })

    const onChangerHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]: value}))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(!image){
            toast.error("Select Image")
            return
        }
        setLoading(true)
        const formData = new FormData()
        formData.append("category", JSON.stringify(data))
        formData.append("file", image)
        try {
            const response = await addCategory(formData)
            if(response.status === 201){
                setCategories([...categories, response.data])
                toast.success("category added")
                setData({
                    name: "",
                    description: "",
                    bgColor: '#2c2c2c',
                })
                setImage(false)
            }
        } catch (error) {
            console.error(error)
            toast.error("error adding category")

        }finally{
            setLoading(false)
        }
    }


  return (
    <div className="item-form-container" style={{height: '100vh', overflowY: 'auto', overflowX: 'hidden'}}>
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form onSubmit={onSubmitHandler} >
                            <div className="mb-3">
                                <label htmlFor="image" className='from-label'>
                                    <img src={image ? URL.createObjectURL(image): assets.upload} alt="" width={48}/>
                                </label>
                                <input type="file" name="image" id="image" className='form-control' hidden onChange={(e) => setImage(e.target.files[0])}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className='form-label'>Name</label>
                                <input type="text" name="name" id="name" required value={data.name} onChange={onChangerHandler} placeholder='Category Name' className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className='form-label'>Description</label>
                                <textarea rows="5" type="description" name="description" id="description" value={data.description} onChange={onChangerHandler} placeholder='Write Content here ..' className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgColor" className='form-label'>Background Color</label>
                                <br />
                                <input type="color" name="bgColor" id="bgcolor" value={data.bgColor} onChange={onChangerHandler} placeholder='#ffffff'/>
                            </div>
                            <button type="submit" className='btn btn-warning w-100' disabled={loading}>{loading ? "Loading.." : "Submit"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryForm