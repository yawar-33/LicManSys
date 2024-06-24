import React, { useEffect, useState } from 'react'
import ErrorMessage from '../themes/ErrorMessage'
import apiCall from '../utils/apiservice';

interface BusinessDetails {
    name: string;
    email: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface PersonContactDetails {
    firstName: string;
    middleName: string;
    lastName: string;
    designation: string;
    emailAddress: string;
    mobile: string;
    username: string;
    password: string;
}

interface LicenseDetails {
    id: number;
}

interface SaveModal {
    id: number;
    businessDetails: BusinessDetails;
    personContactDetails: PersonContactDetails;
    licenseDetails: LicenseDetails;
}
interface LicenseTypes {
    licenseName: string;
    allowedLicense: number;
    id: number;
    isValidated: boolean;
    roleId: number;
}
const AddNewCustomer = (props: any) => {
    const { onClose, open } = props
    const [saveModal, setSaveModal] = useState<SaveModal>({
        id: 0,
        businessDetails: {
            name: "",
            email: "",
            mobile: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country: ""
        },
        personContactDetails: {
            firstName: "",
            middleName: "",
            lastName: "",
            designation: "",
            emailAddress: "",
            mobile: "",
            username: "",
            password: ""
        },
        licenseDetails: {
            id: 0
        }
    });
    const [licenseTypes, setLicenseTypes] = useState<LicenseTypes[]>([
        {
            licenseName: 'Choose option',
            allowedLicense: 0,
            id: 0,
            isValidated: false,
            roleId: 0,
        }
    ]);
    useEffect(() => {
        GetAllLicenseType()
    }, [])

    const GetAllLicenseType = async () => {
        setLicenseTypes([{
            licenseName: 'Choose option',
            allowedLicense: 0,
            id: 0,
            isValidated: false,
            roleId: 0,
        }]);
        apiCall('GET', 'admin/getlicensetypes').then((result) => {
            let data = [...licenseTypes]
            data = data.concat(result)
            setLicenseTypes(data);
        }).catch((err) => console.log(err))

    }

    // Handle change function for BusinessDetails
    const handleBusinessDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSaveModal(prevState => ({
            ...prevState,
            businessDetails: {
                ...prevState.businessDetails,
                [name]: value
            }
        }));
    };

    // Handle change function for PersonContactDetails
    const handlePersonContactDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSaveModal(prevState => ({
            ...prevState,
            personContactDetails: {
                ...prevState.personContactDetails,
                [name]: value
            }
        }));
    };

    // Handle change function for LicenseDetails
    const handleLicenseDetailsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value, id } = e.target;
        setSaveModal(prevState => ({
            ...prevState,
            licenseDetails: {
                ...prevState.licenseDetails,
                [name]: value
            }
        }));
    };
    const handleAddCustomerModal = () => {
        console.log('save', saveModal)
    }
    return (
        <div className="modal fade bs-example-modal-lg"
            tabIndex={-1} role="dialog" aria-hidden="true"
            style={{ display: open && "block", opacity: open && "1" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">Add New Customer</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={onClose}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body custom-scroll">
                        <form id="demo-form">
                            <h6>Bussiness Details</h6>
                            <div className='row'>

                                <div className='col-md-6 col-sm-6 '>
                                    <label htmlFor="name">Full Name * :</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control parsley-error"
                                        name="name"
                                        value={saveModal.businessDetails.name}
                                        onChange={handleBusinessDetailsChange}
                                    />
                                    <ErrorMessage message="Name is required" />


                                </div>
                                <div className='col-md-6 col-sm-6 '>
                                    <label htmlFor="email">Email * :</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control "
                                        name="email"
                                        value={saveModal.businessDetails.email}
                                        onChange={handleBusinessDetailsChange}
                                    />

                                </div>

                                <div className='col-md-6 col-sm-6 '>
                                    <label htmlFor="mobile">Contact :</label>
                                    <input
                                        type="text"
                                        id="mobile"
                                        className="form-control"
                                        name="mobile"
                                        value={saveModal.businessDetails.mobile}
                                        onChange={handleBusinessDetailsChange}
                                    />
                                </div>
                                <div className='col-md-6 col-sm-6 '>
                                    <label htmlFor="address">Address :</label>
                                    <input
                                        type="text"
                                        id="address"
                                        className="form-control"
                                        name="address"
                                        value={saveModal.businessDetails.address}
                                        onChange={handleBusinessDetailsChange}
                                    />
                                </div>
                                <div className='col-md-3 col-sm-3 '>
                                    <label htmlFor="country">Country :</label>
                                    <input
                                        type="text"
                                        id="country"
                                        className="form-control"
                                        name="country"
                                        value={saveModal.businessDetails.country}
                                        onChange={handleBusinessDetailsChange}
                                    />
                                </div>
                                <div className='col-md-3 col-sm-3 '>
                                    <label htmlFor="city">City :</label>
                                    <input
                                        type="text"
                                        id="city"
                                        className="form-control"
                                        name="city"
                                        value={saveModal.businessDetails.city}
                                        onChange={handleBusinessDetailsChange}
                                    />
                                </div>
                                <div className='col-md-3 col-sm-3 '>
                                    <label htmlFor="state">State :</label>
                                    <input
                                        type="text"
                                        id="state"
                                        className="form-control"
                                        name="state"
                                        value={saveModal.businessDetails.state}
                                        onChange={handleBusinessDetailsChange}
                                    />
                                </div>
                                <div className='col-md-3 col-sm-3 '>
                                    <label htmlFor="zip">ZipCode :</label>
                                    <input
                                        type="text"
                                        id="zip"
                                        className="form-control"
                                        name="zip"
                                        value={saveModal.businessDetails.zip}
                                        onChange={handleBusinessDetailsChange}
                                    />
                                </div>
                            </div>

                            <h6>Contact Person Details</h6>
                            <div className='row'>
                                <div className='col-md-4 col-sm-4 '>
                                    <label htmlFor="firstName">First Name * :</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="form-control"
                                        name="firstName"
                                        value={saveModal.personContactDetails.firstName}
                                        onChange={handlePersonContactDetailsChange}
                                    />
                                </div>

                                <div className='col-md-4 col-sm-4 '>
                                    <label htmlFor="middleName">Middle Name * :</label>
                                    <input
                                        type="text"
                                        id="middleName"
                                        className="form-control"
                                        name="middleName"
                                        value={saveModal.personContactDetails.middleName}
                                        onChange={handlePersonContactDetailsChange}
                                    />
                                </div>

                                <div className='col-md-4 col-sm-4 '>
                                    <label htmlFor="lastName">Last Name * :</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="form-control"
                                        name="lastName"
                                        value={saveModal.personContactDetails.lastName}
                                        onChange={handlePersonContactDetailsChange}
                                    />
                                </div>

                                <div className='col-md-4 col-sm-4 '>
                                    <label htmlFor="emailAddress">Email * :</label>
                                    <input
                                        type="text"
                                        id="emailAddress"
                                        className="form-control"
                                        name="emailAddress"
                                        value={saveModal.personContactDetails.emailAddress}
                                        onChange={handlePersonContactDetailsChange}
                                    />
                                </div>
                                <div className='col-md-4 col-sm-4 '>
                                    <label htmlFor="designation">Designation * :</label>
                                    <input
                                        type="text"
                                        id="designation"
                                        className="form-control"
                                        name="designation"
                                        value={saveModal.personContactDetails.designation}
                                        onChange={handlePersonContactDetailsChange}
                                    />
                                </div>
                                <div className='col-md-4 col-sm-4 '>
                                    <label htmlFor="mobile">Mobile :</label>
                                    <input
                                        type="text"
                                        id="mobile"
                                        className="form-control"
                                        name="mobile"
                                        value={saveModal.personContactDetails.mobile}
                                        onChange={handlePersonContactDetailsChange}
                                    />
                                </div>
                                <div className='col-md-4 col-sm-4 '>
                                    <label htmlFor="username">User Name :</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        name="username"
                                        value={saveModal.personContactDetails.username}
                                        onChange={handlePersonContactDetailsChange}
                                    />
                                </div>
                                <div className='col-md-4 col-sm-4 '>
                                    <label htmlFor="password">Password :</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        name="password"
                                        value={saveModal.personContactDetails.password}
                                        onChange={handlePersonContactDetailsChange}
                                    />
                                </div>
                            </div>
                            <h6>License Details</h6>
                            <div className="row">
                                <div className="col-md-6 col-sm-3 ">
                                    <label htmlFor='type'>License Types</label>
                                    <select
                                        className="form-control"
                                        value={saveModal.licenseDetails.id}
                                        name='id'
                                        id='id'
                                        onChange={handleLicenseDetailsChange}
                                    >
                                        {licenseTypes.map((item) => {
                                            return (
                                                <option key={item.id} value={item.id}>
                                                    {item.licenseName}{item.id !== 0 && ` (${item.allowedLicense})`}
                                                </option>
                                            )
                                        })}

                                    </select>
                                </div>
                            </div>
                        </form>


                    </div>
                    <div className="modal-footer">
                        <button type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleAddCustomerModal}>Save changes</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddNewCustomer