import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import FormContainer from '../user/helper/FormContainer';
import { createCategory } from './helper/adminapicall';
import { Form, Button } from 'react-bootstrap'

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const {user,token} = isAutheticated();

    const goBack= () => (
        <div>
            <Link className='btn btn-dark my-3' to="/admin/dashboard">
                go back
            </Link>

        </div>
    )
    
    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)

        //backend request
        createCategory(user._id,token,{name})
        .then(data => {
            if(data.error)
            {
                    setError(error);
            }
            else{
                setError("");
                setSuccess(true);
                setName("");
            }
        })
    }

    const successMessage = () => {
        if(success){
            return <h5 className="alert alert-success mt-3">Category created successfully</h5>
        }
    };
    
    const warningMessage = () => {
        if(error){
            return <h5 className="alert alert-danger mt-3">Failed to create category</h5>
        }
    };

    const myCatogoryForm = () => (
        <FormContainer>
            <h1>Create Category</h1>
            <Form>
            {successMessage()}
            {warningMessage()}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                value={name}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' onClick={onSubmit} variant='primary'>
              Create Category
            </Button> 
            </Form>
        </FormContainer>
    )

    return (
        <>
            {goBack()}
            
            {myCatogoryForm()}

        </>
    )
}


export default AddCategory;