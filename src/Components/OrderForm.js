import React, { useState } from 'react'
import { Form, Container, Button, Alert } from 'react-bootstrap'
import { MdDateRange } from 'react-icons/md'
import Products from './Products'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OrderForm = () => {
  const [expectedDate, setExpectedDate] = useState('')
  const [poDate, setPoDate] = useState('')
  const [poType, setPoType] = useState('')
  const [warehouse, setWarehouse] = useState('')
  const [supplier, setSupplier] = useState('')
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDateChange = (e) => {
    setExpectedDate(e.target.value)
  }

  const handlePoDateChange = (e) => {
    setPoDate(e.target.value)
  }

  const handleFormSubmit = () => {
    const newErrors = {}

    if (!poType) newErrors.poType = 'PO Type is required.'
    if (!poDate) newErrors.poDate = 'PO Date is required.'
    if (!expectedDate) newErrors.expectedDate = 'Expected Date is required.'
    if (!warehouse) newErrors.warehouse = 'Warehouse is required.'
    if (!supplier) newErrors.supplier = 'Supplier is required.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setShowSuccess(false)
    } else {
      setErrors({})
      setShowSuccess(true)
      toast.success('Form submitted successfully!', {
        style: {
          backgroundColor: 'green',
          color: 'white',
        },
      })
      console.log('Form submitted successfully with the following data: ', {
        poType,
        poDate,
        expectedDate,
        warehouse,
        supplier,
      })
    }
  }

  return (
    <>
      <Container>
        <h3 className="mb-3 mt-3">Create Purchase Order</h3>

        <Form onSubmit={handleFormSubmit}>
          <div className="d-flex gap-3">
            <Form.Group className="mb-3 w-50" controlId="poType">
              <Form.Label>PO Type</Form.Label>
              <Form.Select
                value={poType}
                onChange={(e) => setPoType(e.target.value)}
                isInvalid={!!errors.poType}
              >
                <option value="">Select PO Type</option>
                <option value="1">Type 1</option>
                <option value="2">Type 2</option>
                <option value="3">Type 3</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.poType}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 w-50" controlId="poNumber">
              <Form.Label>PO Number</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder="4568sdfaklz565asdssd"
              />
            </Form.Group>
          </div>

          <div className="d-flex gap-3 mt-4">
            <Form.Group className="mb-3 w-50" controlId="warehouse">
              <Form.Label>Warehouse</Form.Label>
              <Form.Select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                isInvalid={!!errors.warehouse}
              >
                <option value="">Select Warehouse</option>
                <option value="1">Warehouse 1</option>
                <option value="2">Warehouse 2</option>
                <option value="3">Warehouse 3</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.warehouse}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 w-50" controlId="poDate">
              <Form.Label>PO Date</Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control
                  type="date"
                  value={poDate}
                  onChange={handlePoDateChange}
                  isInvalid={!!errors.poDate}
                />
                <Button
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    borderRadius: '0 4px 4px 0',
                    height: '100%',
                    padding: '0 10px',
                    border: 'none',
                    outline: 'none',
                    background: '#48dd4d',
                  }}
                  onClick={() => document.getElementById('poDate').showPicker()}
                >
                  <MdDateRange color="white" />
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.poDate}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="d-flex gap-3 mt-4">
            <Form.Group className="mb-3 w-50" controlId="expecteddate">
              <Form.Label>Expected Date</Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control
                  type="date"
                  value={expectedDate}
                  onChange={handleDateChange}
                  isInvalid={!!errors.expectedDate}
                />
                <Button
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    borderRadius: '0 4px 4px 0',
                    height: '100%',
                    padding: '0 10px',
                    border: 'none',
                    outline: 'none',
                    background: '#48dd4d',
                  }}
                  onClick={() =>
                    document.getElementById('expecteddate').showPicker()
                  }
                >
                  <MdDateRange color="white" />
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.expectedDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 w-50" controlId="supplier">
              <Form.Label>Supplier</Form.Label>
              <Form.Select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                isInvalid={!!errors.supplier}
              >
                <option value="">Select Supplier</option>
                <option value="1">Supplier 1</option>
                <option value="2">Supplier 2</option>
                <option value="3">Supplier 3</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.supplier}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </Form>
      </Container>
      <ToastContainer />
      <Products onSubmit={handleFormSubmit} />
    </>
  )
}

export default OrderForm
