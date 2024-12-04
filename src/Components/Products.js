import React, { useState } from 'react'
import { Card, Table, Container, Form, Button, Row, Col } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa6'
import { IoEyeSharp } from 'react-icons/io5'

const Products = ({ onSubmit }) => {
  const [products, setProducts] = useState([
    { id: 1, product: '', price: '', qty: '', unit: '', tax: '' },
  ])
  const [errors, setErrors] = useState({})
  const [total, setTotal] = useState(0)

  const validateField = (field, value) => {
    if (field === 'product' && !value) return 'Product name is required.'
    if (field === 'price' && (!value || isNaN(value) || value <= 0))
      return 'Valid price is required.'
    if (field === 'qty' && (!value || isNaN(value) || value <= 0))
      return 'Valid quantity is required.'
    if (field === 'tax' && (!value || isNaN(value) || value < 0))
      return 'Valid tax percentage is required.'
    if (field === 'unit' && !value) return 'Unit selection is required.'
    return ''
  }

  const handleFieldChange = (field, value, productId) => {
    const newProducts = products.map((p) =>
      p.id === productId ? { ...p, [field]: value } : p
    )
    setProducts(newProducts)

    const errorMessage = validateField(field, value)

    setErrors({
      ...errors,
      [productId]: {
        ...errors[productId],
        [field]: errorMessage,
      },
    })
  }

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        product: '',
        price: '',
        qty: '',
        unit: '',
        tax: '',
      },
    ])
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))
    const newErrors = { ...errors }
    delete newErrors[id]
    setErrors(newErrors)
  }

  const calculateTotal = () => {
    const calculatedTotal = products.reduce((acc, product) => {
      const price = parseFloat(product.price) || 0
      const qty = parseFloat(product.qty) || 0
      const tax = parseFloat(product.tax) || 0
      const taxAmount = price * qty * (tax / 100)
      const subTotal = price * qty
      const total = subTotal + taxAmount
      return acc + total
    }, 0)
    setTotal(calculatedTotal)
  }

  const handleSave = () => {
    let isValid = true
    const newErrors = {}

    products.forEach((product) => {
      const productErrors = {}
      for (const field in product) {
        const errorMessage = validateField(field, product[field])
        if (errorMessage) {
          isValid = false
          productErrors[field] = errorMessage
        }
      }
      if (Object.keys(productErrors).length > 0) {
        newErrors[product.id] = productErrors
      }
    })

    if (!isValid) {
      setErrors(newErrors)
    } else {
      onSubmit()
      calculateTotal()
    }
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h5 className="Products">Products</h5>
          <Table bordered hover responsive className="custom-table">
            <thead
              className="custom-thead"
              style={{
                backgroundColor: '#f8f9fa',
                verticalAlign: 'middle',
                padding: '12px 10px',
              }}
            >
              <tr>
                <th>No</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Tax (%)</th>
                <th>Tax Amount</th>
                <th>Sub Total</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Enter product"
                      value={product.product}
                      onChange={(e) =>
                        handleFieldChange('product', e.target.value, product.id)
                      }
                    />
                    {errors[product.id]?.product && (
                      <div className="text-danger">
                        {errors[product.id]?.product}
                      </div>
                    )}
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={product.price}
                      onChange={(e) =>
                        handleFieldChange('price', e.target.value, product.id)
                      }
                    />
                    {errors[product.id]?.price && (
                      <div className="text-danger">
                        {errors[product.id]?.price}
                      </div>
                    )}
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Enter qty"
                      value={product.qty}
                      onChange={(e) =>
                        handleFieldChange('qty', e.target.value, product.id)
                      }
                    />
                    {errors[product.id]?.qty && (
                      <div className="text-danger">
                        {errors[product.id]?.qty}
                      </div>
                    )}
                  </td>
                  <td>
                    <Form.Select
                      value={product.unit}
                      onChange={(e) =>
                        handleFieldChange('unit', e.target.value, product.id)
                      }
                    >
                      <option>Select Unit</option>
                      <option value="kg">Kg</option>
                      <option value="litre">Litre</option>
                      <option value="piece">Piece</option>
                    </Form.Select>
                    {errors[product.id]?.unit && (
                      <div className="text-danger">
                        {errors[product.id]?.unit}
                      </div>
                    )}
                  </td>
                  <td>
                    <Form.Select
                      value={product.tax}
                      onChange={(e) =>
                        handleFieldChange('tax', e.target.value, product.id)
                      }
                    >
                      <option>Select Tax</option>
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </Form.Select>
                    {errors[product.id]?.tax && (
                      <div className="text-danger">
                        {errors[product.id]?.tax}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {(
                      product.price *
                      product.qty *
                      (product.tax / 100)
                    ).toFixed(2)}
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    $ {(product.price * product.qty).toFixed(2)}
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    $
                    {(
                      product.price * product.qty +
                      product.price * product.qty * (product.tax / 100)
                    ).toFixed(2)}
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #f58f8f',
                        borderRadius: '5px',
                        padding: '10px 10px',
                      }}
                    >
                      <MdDeleteForever
                        style={{
                          cursor:
                            products.length > 1 ? 'pointer' : 'not-allowed',
                          color: '#f58f8f',
                          fontSize: '16px',
                        }}
                        onClick={() =>
                          products.length > 1 && handleDeleteProduct(product.id)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            style={{
              background: 'white',
              border: '1px solid #48dd4d',
              color: '#48dd4d',
              fontSize: '16px',
            }}
            onClick={handleAddProduct}
          >
            <FaPlus className="plus-Button" />
            Add Item
          </Button>
        </Card.Body>
      </Card>

      <Row className="mt-3">
        <Col xs={6}>
          <h5>Total: ${total.toFixed(2)}</h5>
        </Col>
        <Col xs={6} className="text-end">
          <Button variant="secondary" className="me-2">
            <IoEyeSharp className="plus-Button" />
            Preview
          </Button>
          <Button
            style={{
              background: '#48dd4d',
              border: '1px solid #48dd4d',
              color: 'white',
              fontSize: '16px',
            }}
            onClick={handleSave}
          >
            <FaCheck className="plus-Button" />
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Products
