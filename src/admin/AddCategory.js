import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';


const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const {user,token} = isAutheticated();

    const goBack= () => (
        <div>
            <Link className='btn btn-light my-3' to="/admin/dashboard">
                go back
            </Link>

        </div>
    )
    
    const handleChage = (event) => {
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
            return <h4 className="text-success">Category created successfuly</h4>
        }
    };
    
    const warningMessage = () => {
        if(error){
            return <h4 className="text-success">Failed to create category</h4>
        }
    };

    const myCatogoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead"> Enter the category</p>
                <input 
                type="text"
                className="form-control my-3"
                onChange={handleChage}
                value={name}
                autoFocus
                required
                placeholder="For example summer"/>

                <button onClick={onSubmit} className="btn btn-outline-info">
                    Create Category
                </button>

            </div>
        </form>
    )

    return (
        <>
            {goBack()}
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {myCatogoryForm()}
                    
                    {successMessage()}
                    {warningMessage()}
                </div>
            </div>

        </>
    )
}


export default AddCategory;