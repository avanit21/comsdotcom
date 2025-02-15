import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { getOrders} from "./helper/adminapicall"
import { Row, Col, Table, Button } from 'react-bootstrap';

const ManageOrders = () => {

    const [orders, setOrders] = useState([]);

    const {user,token} = isAutheticated();

    const preload = () => {
        getOrders(user._id,token).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
              console.log(data)
                setOrders(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    

    return (
        <>
      <h2 className="mb-4 text-center">Orders</h2>
      <Link className='btn btn-dark my-3' to={`/admin/dashboard`}>
        go back
      </Link>
      
      <Table striped bordered responsive className='table-sm'>
            <thead>
              <tr>
                <th className="text-center">NAME</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return(
                <tr key={index}>
                  <td className="text-center py-4">{order.user.name}</td>
                  <td className="text-center">
                  <Link
                    to={`/admin/order/detail/${order._id}`}
                  >
                  <Button className="brn-sm">Order detail</Button>
                </Link>
                  </td>
                <td className="text-center">
                  <Link
                  to={`/admin/orderstatus/update/${order._id}`}>
                    <Button className="brn-sm">Update Status</Button>
                  </Link>
                  </td>
                  </tr>
                )
              })}
            </tbody>
      </Table>

          
    </>
    )
}

export default ManageOrders;