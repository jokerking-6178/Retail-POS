import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { deleteItem } from '../../Service/ItemService'
import toast from 'react-hot-toast'
import './itemList.css'

const ItemList = () => {
  const {itemsData, setItemsData} = useContext(AppContext)
  const [searchterm, setSearchTerm] = useState("")
  const filteredItems = itemsData.filter((item) => {
    return item.name.toLowerCase().includes(searchterm.toLowerCase())
  })

  const removeItem = async (itemId) => {
    try {
      const response = await deleteItem(itemId)
      if(response.status === 204){
        const updatedItems = itemsData.filter(item => item.itemId !== itemId)
        setItemsData(updatedItems)
        toast.success("item delete")
      }else{
        toast.error("unable to delete")
      }
    } catch (error) {
      console.error(err)
      toast.error("unable to delete")
    }
  }

  return (
    <div className="category-list-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}>
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input type="text" name="keyword" id="keyword" value={searchterm} placeholder='search by keywoard' className='form-control' onChange={(e) => setSearchTerm(e.target.value)} />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredItems.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div style={{marginRight: '15px'}}>
                  <img src={item.imgUrl} alt="item.name" className="item-image"/>
                </div>
                <div className="flex-grow-1">
                  <h6 className='mb-1 text-white'>{item.name}</h6>
                  <p className="mb-0 text-white">
                    Category: {item.categoryName}
                  </p>
                  <span className="mb-0 text-block rounded-pill text-bg-warning">&#8377;{item.price}</span>
                </div>
                <div>
                  <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.itemId)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemList