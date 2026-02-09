import { Button, Label, Textarea, TextInput } from 'flowbite-react';
import './App.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Componnent from './Componnent';

function App() {
  let [enquiryList, setEnquiryList] = useState([])
  let [formData, setformData] = useState({
    name:'',
    email:'',
    phone:'',
    message:'',
    _id:''
  })

  let saveEnquiry = (e)=>{
    e.preventDefault();

    // let formData = {
    //   name : e.target.name.value,
    //   email : e.target.email.value,
    //   phone : e.target.phone.value,
    //   message : e.target.message.value
    // }
    if(formData._id){
      axios.put(`http://localhost:3000/website/api/update/${formData._id}`, formData)
      .then(()=>{
        toast.success('Enquiry Update Successfully');
        getEnquiry()
      })
      setformData({
        name:'',
        email:'',
        phone:'',
        message:''
      })
    }
    else{
      axios.post(`http://localhost:3000/website/api/insert`, formData)
    .then(()=>{
      toast.success('Enquiry Save Successfully')
      getEnquiry()
    })
      setformData({
        name:'',
        email:'',
        phone:'',
        message:''
      })
   }
    }
    
    let getEnquiry = ()=>{
      axios.get(`http://localhost:3000/website/api/view`)
      .then((res)=>{
        return res.data;
      })
      .then((finalData)=>{
        if(finalData.status){
          setEnquiryList(finalData.enquiryList)
        }
      })
    }
   
    let getValue = (e)=>{
      let inputName = e.target.name;
      let inputValue = e.target.value;
      let oldData = {...formData}

      oldData[inputName] = inputValue;
      setformData(oldData);
    }
    
    useEffect(()=>{
      getEnquiry()
    },[])

  return (
    <div className='max-w-7xl mx-auto py-10'>
      <h1 className='text-2xl font-bold text-center pb-3'>User Enquiry</h1>
      <div className='grid grid-cols-[30%_auto] gap-5'>
        <div className='bg-gray-100 p-3'>
          <ToastContainer />
          <h1 className='text-2xl py-2'>Enquiry Form</h1>
          <form onSubmit={saveEnquiry}>
          <div className="mb-2 block">
            <Label color='black'>Name</Label>
            <TextInput type="text" placeholder="enter your name" onChange={getValue} value={formData.name} name='name' required shadow color='gray'/>
          </div>
          <div className="mb-2 block">
            <Label color='black'>Email</Label>
            <TextInput type="text" placeholder="enter your email" onChange={getValue} value={formData.email} name='email' required shadow color='gray'/>
          </div>
          <div className="mb-2 block">
            <Label color='black'>Phone</Label>
            <TextInput type="text" placeholder="enter your phone" onChange={getValue} value={formData.phone} name='phone' required shadow color='gray'/>
          </div>
          <div className="mb-5 block">
            <Label color='black'>Message</Label>
            <Textarea id="comment" placeholder="Leave a comment..." onChange={getValue} value={formData.message} name='message' required rows={4} color='gray'/>
          </div>
          <Button className='cursor-pointer w-full' type="submit">{formData._id ? 'Update' : 'Submit'}</Button>
          </form>
        </div>
        <div className='bg-gray-100 p-3'>
          <h1 className='text-2xl py-2 pb-7'>Enquiry Tables</h1>
          <Componnent enquiryList = {enquiryList} setformData = {setformData} getEnquiry = {getEnquiry}/>
        </div>
      </div>
    </div>
  )
}

export default App

