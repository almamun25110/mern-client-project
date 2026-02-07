import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { toast } from "react-toastify";

export default function Componnent({enquiryList, getEnquiry, setformData}) {
  //delete
  let deleteRow = (delId)=>{
    axios.delete(`http://localhost:3000/website/api/delete/${delId}`)
    .then((res)=>{
      console.log(res);
      toast.warning('successfully deleted');
    })
    getEnquiry()
  }
  //edit
  let editRow = (editId)=>{
    axios.get(`http://localhost:3000/website/api/single/${editId}`)
    .then((res)=>{
      let editRes = res.data;
      setformData(editRes.enquiryList[0]);
    })
  }
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>#</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>Edit</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">

          {enquiryList.length >= 1 ? 
            enquiryList.map((items, index)=>{
              return(
              <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </TableCell>
                <TableCell>{items.name}</TableCell>
                <TableCell>{items.email}</TableCell>
                <TableCell>{items.phone}</TableCell>
                <TableCell>{items.message}</TableCell>
                <TableCell>
                <a href="#" onClick={()=>editRow(items._id)} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Edit
                </a>
                </TableCell>
                <TableCell>
                <a href="#" onClick={()=>deleteRow(items._id)} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Delete
                </a>
              </TableCell>
            </TableRow>
              )
            })
            :
            <TableRow>
              <TableCell>
              No Data Found
              </TableCell>
            </TableRow>
        }

        </TableBody>
      </Table>
    </div>
  )
}
