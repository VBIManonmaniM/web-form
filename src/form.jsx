import React, { Component } from 'react';
import Axios from 'axios';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

import Mail from '@material-ui/icons/Mail';
import ContactPhone from '@material-ui/icons/Phone';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';


import './form.css';

export class WebForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'Mano',
                phoneNo: '8898988877',
                emailId: 'manokrish6@gmail.com',
                jobTitle: 'Developer',
                resume: null
            },
            message: {
                errorStatus: false,
                text: ''
            },
            openBar: false
        };
    }

    clearForm = () => {
        this.setState({
            user: {
                name: '',
                phoneNo: '',
                emailId: '',
                jobTitle: '',
                resume: null
            },
            openBar: false
        });
    }

    validatePhoneNumber(phoneNo) {
        return phoneNo.match(/^\d{10}$/);
    }


    validateEmail(emailId) {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(emailId);
    }

    validateForm = () => {
        const { name, phoneNo, emailId, jobTitle, resume } = this.state.user;
        let message = 'Please enter a ';
        if (!name) {
            return 'Please enter a name';
        }

        if (!phoneNo) {
            return message + 'PhoneNo';
        }

        if (!this.validatePhoneNumber(phoneNo)) {
            return message + 'valid PhoneNo';
        }

        if (!emailId) {
            return message + 'Email Id';
        }

        if (!this.validateEmail(emailId)) {
            return message + 'valid Email Id';
        }

        if (!jobTitle) {
            return message + 'Job Title';
        }

        // if (!resume) {
        //     return 'Please upload a resume';
        // }

        return null;
    }

    saveForm = () => {
        const inValidKeyMessage = this.validateForm();
        if (inValidKeyMessage === null) {
            this.setState({
                openBar: true,
                message: {
                    errorStatus: false,
                    text: `Details added successfully !`
                }
            });
        } else {
            this.setState({
                openBar: true,
                message: {
                    errorStatus: true,
                    text: inValidKeyMessage
                }
            });
        }
    }

    handleChange = (key, value) => {
        const { user } = this.state
        this.setState({
            user: {
                ...user,
                [key]: value
            }
        }, () => {

        });
    }

    onClose = () => {
        this.setState({
            openBar: false
        });
    }

    render() {
        const { name, phoneNo, emailId, jobTitle, resume } = this.state.user;
        const { errorStatus, text } = this.state.message;
        return <Container maxWidth="sm">
            <Box m="1rem" display="flex" flexDirection="column">
                <TextField
                    id="name"
                    label="Name"
                    margin="normal"
                    onChange={(e) => {
                        this.handleChange('name', e.target.value);
                    }}
                    value={name}
                />
                <TextField
                    id="phoneNo"
                    label="Phone Number"
                    margin="normal"
                    value={phoneNo}
                    onChange={(e) => {
                        this.handleChange('phoneNo', e.target.value);
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <ContactPhone />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    required
                    id="emailId"
                    label="Email ID"
                    margin="normal"
                    value={emailId}
                    onChange={(e) => {
                        this.handleChange('emailId', e.target.value);
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Mail />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    error={!jobTitle}
                    id="jobTitle"
                    label="Job Title"
                    margin="normal"
                    onChange={(e) => {
                        this.handleChange('jobTitle', e.target.value);
                    }}
                    value={jobTitle}
                />
                <Box display="flex">
                    <input
                        accept="application/msword,application/pdf"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span">
                            Upload Resume
                        </Button>
                    </label>
                    <span style={{ marginTop: '0.4rem' }}>Mano.pdf</span>
                </Box>
                <div>
                    <Button variant="contained" onClick={this.clearForm}>
                        Clear
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.saveForm}>
                        Save
                    </Button>
                </div>
            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={this.state.openBar}
                autoHideDuration={3000}
            >
                <SnackbarContent
                    className={errorStatus ? 'error-message' : 'success-message'}
                    message={
                        <span id="client-snackbar" style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {errorStatus ? <ErrorIcon /> : <CheckCircleIcon />}
                            {text}
                        </span>
                    }
                    action={[
                        <IconButton onClick={this.onClose} key="close" aria-label="close" color="inherit">
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        </Container>
    }
}