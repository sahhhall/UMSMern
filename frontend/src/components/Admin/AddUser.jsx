import React, { useState } from 'react'
import Button from '../common/Button'
import UserAddModal from './UserAddModal'

const AddUser = ({refetch}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
          <Button text="Add User" onClick={()=> setShowModal(!showModal)}  bgColor="bg-black" textColor="text-white" />
          { showModal && <UserAddModal refetch={refetch} showModal={showModal} setShowModal={setShowModal} />}
    </>

  )
}

export default AddUser