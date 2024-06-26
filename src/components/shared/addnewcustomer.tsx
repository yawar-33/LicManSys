import React, { FocusEvent, useEffect, useState } from 'react'
import ErrorMessage from '../themes/ErrorMessage'
import apiCall from '../utils/apiservice';
import Alert from '../themes/Alerts';

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

interface Errors {
    businessName?: string;
    firstName?: string;
    emailAddress?: string;
    username?: string;
    password?: string;
    licenseId?: string;
}

interface ApiResponseMessage {
    message: string;
    type: 'success' | 'danger';
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
    const [errors, setErrors] = useState<Errors>({});

    const [apiResMessage, setAPIResMessage] = useState<ApiResponseMessage | null>(null);

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
        apiCall('GET', 'admin/getlicensetypes', null).then((result) => {
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

    const validate = (): boolean => {
        const errors: Errors = {};

        if (!saveModal.businessDetails.name) errors.businessName = "Business name is required";
        if (!saveModal.personContactDetails.firstName) errors.firstName = "Contact person's first name is required";
        if (!saveModal.personContactDetails.emailAddress) errors.emailAddress = "Contact person's email is required";
        if (!saveModal.personContactDetails.username) errors.username = "Contact person's username is required";
        if (!saveModal.personContactDetails.password) errors.password = "Contact person's password is required";
        if (saveModal.licenseDetails.id <= 0) errors.licenseId = "License type is requird";

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const validateField = (name: string, value: string | number): void => {
        const fieldErrors: Errors = { ...errors };

        switch (name) {
            case 'name':
                fieldErrors.businessName = value ? '' : "Business name is required";
                break;
            case 'firstName':
                fieldErrors.firstName = value ? '' : "Contact person's first name is required";
                break;
            case 'emailAddress':
                fieldErrors.emailAddress = value ? '' : "Contact person's email is required";
                break;
            case 'username':
                fieldErrors.username = value ? '' : "Contact person's username is required";
                break;
            case 'password':
                fieldErrors.password = value ? '' : "Contact person's password is required";
                break;
            case 'id':
                fieldErrors.licenseId = value ? '' : "License type is requird";
                break;
            default:
                break;
        }

        setErrors(fieldErrors);
    };



    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
    };
    const handleAddCustomerModal = () => {
        if (validate()) {
            // Proceed with save operation
            console.log('Form is valid, proceeding with save', saveModal);
            apiCall('POST', 'admin/createupdatebusinessandcustomer', saveModal).then((res) => {
                console.log(res)
                setAPIResMessage({ message: 'Data added successful', type: 'success' });
                onClose()
            }).catch((err) => {
                console.log(err)
                setAPIResMessage(err.message)
                setAPIResMessage({ message: err.message || 'Operation failed', type: 'danger' });
                onClose()
            })
        } else {
            console.log('Form is invalid, show errors to the user');
            setAPIResMessage({ message: 'Fill All Required Fields', type: 'danger' });
        }
    };
    console.log('errors', errors)
    return (
        <React.Fragment>
            {apiResMessage?.message && <Alert message={apiResMessage?.message} type={apiResMessage?.type} />}
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
                                            className={`form-control ${errors.businessName && `parsley-error`}`}
                                            name="name"
                                            value={saveModal.businessDetails.name}
                                            onChange={handleBusinessDetailsChange}
                                            onBlur={handleBlur}
                                        />

                                        {errors.businessName && <ErrorMessage message={errors.businessName} />}


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
                                            className={`form-control ${errors.firstName && `parsley-error`}`}
                                            name="firstName"
                                            value={saveModal.personContactDetails.firstName}
                                            onChange={handlePersonContactDetailsChange}
                                        />
                                        {errors.firstName && <ErrorMessage message={errors.firstName} />}

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
                                            className={`form-control ${errors.emailAddress && `parsley-error`}`}
                                            name="emailAddress"
                                            value={saveModal.personContactDetails.emailAddress}
                                            onChange={handlePersonContactDetailsChange}
                                        />
                                        {errors.emailAddress && <ErrorMessage message={errors.emailAddress} />}

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
                                            className={`form-control ${errors.username && `parsley-error`}`}
                                            name="username"
                                            value={saveModal.personContactDetails.username}
                                            onChange={handlePersonContactDetailsChange}
                                        />
                                        {errors.username && <ErrorMessage message={errors.username} />}

                                    </div>
                                    <div className='col-md-4 col-sm-4 '>
                                        <label htmlFor="password">Password :</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className={`form-control ${errors.password && `parsley-error`}`}
                                            name="password"
                                            value={saveModal.personContactDetails.password}
                                            onChange={handlePersonContactDetailsChange}
                                        />
                                        {errors.password && <ErrorMessage message={errors.password} />}
                                    </div>
                                </div>
                                <h6>License Details</h6>
                                <div className="row">
                                    <div className="col-md-6 col-sm-3 ">
                                        <label htmlFor='type'>License Types</label>
                                        <select
                                            className={`form-control ${errors.licenseId && `parsley-error`}`}
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
                                        {errors.licenseId && <ErrorMessage message={errors.licenseId} />}

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
        </React.Fragment>

    )
}

export default AddNewCustomer