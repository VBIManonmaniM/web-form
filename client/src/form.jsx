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
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import Mail from '@material-ui/icons/Mail';
import ContactPhone from '@material-ui/icons/Phone';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';


import './form.css';

export class WebForm extends Component {
    constructor(props) {
        super(props);
        this.refreshCount = this.getRefreshCount();
        this.state = {
            user: {
                name: '',
                phoneNo: '',
                emailId: '',
                jobTitle: '',
                resume: null
            },
            message: {
                errorStatus: false,
                text: ''
            },
            openBar: false,
            showLoading: false
        };
    }

    getRefreshCount = () => {
        const refreshCount = Number(document.cookie.split("=")[1]);
        if (!isNaN(refreshCount)) {
            document.cookie = `refreshCount=${refreshCount + 1};`;
            return refreshCount + 1;
        } else {
            document.cookie = 'refreshCount=1;';
            return 1;
        }
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

        if (!resume) {
            return 'Please upload a resume';
        }

        return null;
    }

    saveForm = async () => {
        const { user } = this.state;
        const inValidKeyMessage = this.validateForm();
        if (inValidKeyMessage === null) {
            try {
                let payload = new FormData();
                for (const key in user) {
                    payload.append(key, user[key]);
                }
                this.setState({
                    showLoading: true
                });
                const data = await Axios.post(`${window.location.href}addUserDetails`, payload);
                this.setState({
                    showLoading: false
                });
                let message = '', errorStatus;
                if (data.status === 201) {
                    errorStatus = false;
                    message = `Details added successfully !`;
                } else if (data.data.message === 'dberror') {
                    errorStatus = true;
                    message = `DB Error`;
                }
                this.setState({
                    openBar: true,
                    message: {
                        errorStatus: errorStatus,
                        text: message
                    }
                });
            } catch (e) {
                this.setState({
                    showLoading: false
                });
                this.setState({
                    openBar: true,
                    message: {
                        errorStatus: true,
                        text: `Server error !`
                    }
                });
            }
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
        if (this.state.message.errorStatus) {
            this.setState({
                openBar: false
            });
        } else {
            this.clearForm();
        }
    }

    render() {
        const { name, phoneNo, emailId, jobTitle, resume } = this.state.user;
        const { errorStatus, text } = this.state.message;
        return <Container maxWidth="sm">
            <Paper style={{ marginTop: '2rem', padding: '1rem' }}>
                <Box m="1rem" display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="flex-end">
                        <span>Visit count : <b>{this.refreshCount}</b></span>
                    </Box>
                    <TextField
                        id="name"
                        required
                        label="Name"
                        margin="normal"
                        onChange={(e) => {
                            this.handleChange('name', e.target.value);
                        }}
                        value={name}
                    />
                    <TextField
                        id="phoneNo"
                        required
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
                        required
                        id="jobTitle"
                        label="Job Title"
                        margin="normal"
                        onChange={(e) => {
                            this.handleChange('jobTitle', e.target.value);
                        }}
                        value={jobTitle}
                    />
                    <Box mt="0.7rem" display="flex">
                        <input
                            accept="application/msword,application/pdf"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            onChange={(e) => {
                                this.handleChange('resume', e.target.files[0]);
                            }}
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span">
                                Upload Resume
                        </Button>
                        </label>
                        <span style={{ marginTop: '0.4rem' }}>{resume ? resume.name : ''}</span>
                    </Box>
                    <Box display="flex" mt='1rem' justifyContent="flex-end">
                        {this.state.showLoading ? <CircularProgress /> : null}
                        <Button style={{ marginLeft: '0.4rem' }} variant="contained" onClick={this.clearForm}>
                            Clear
                        </Button>
                        <Button style={{ marginLeft: '0.4rem' }} variant="contained" color="primary" onClick={this.saveForm}>
                            Save
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.openBar}
                    onClose={this.onClose}
                    autoHideDuration={2000}
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
            </Paper>
        </Container>
    }
}