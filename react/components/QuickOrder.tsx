import React, { useState, useEffect }  from 'react'
import { useMutation, useLazyQuery } from 'react-apollo'
import UPDATE_CART from '../graphql/updateCart.graphql'
import GET_PRODUCT from '../graphql/getProductBySku.graphql'


const QuickOrder = () => {
  const [inputText, setInputText] = useState("")
  const [search, setSearch] = useState("")

  const [getProductData, { data: product }] = useLazyQuery(GET_PRODUCT)
  const [addToCart] = useMutation(UPDATE_CART)

  const handleChange = (event: any) => {
    setInputText(event.target.value)
  }

  useEffect (()=>{
    if(!product) {
  /*     alert("ingresa algo  real por favor") */
    } else {
      console.log("mi producto ",product)
      // const { productId } = product.product
      let skuId = parseInt(inputText)
      addToCart ({
        variables : {
          salesChannel: "1",
          items : [
            {
              id: skuId,
              quantity: 1,
              seller: "1"
            }
          ]
        }
      })
      .then(() => {
        window.location.href = "/checkout"
      })
    }
  }, [product, search])

  const addProductToCart = () => {
    getProductData({
      variables : {
        sku: inputText
      }
    })
  }

  const searchProduct = (event:any) => {
    event.preventDefault();
    if(!inputText) {
      alert("ingresa algo por favor")
    } else {
      setSearch(inputText)
      addProductToCart()
    }
  }


  return (
    <div className='flex flex-column items-center'>
      <h2>Compra rápida de VTEX U</h2>
      <form onSubmit={searchProduct}>
        <div className='flex flex-column ma3'>
          <label htmlFor="sku">Ingresa el número de SKU</label>
          <input id="sku" type="text" onChange={handleChange} />
        </div>
        <input type="submit" value="añadir al carrito" />

      </form>
    </div>
  )
}

export default QuickOrder