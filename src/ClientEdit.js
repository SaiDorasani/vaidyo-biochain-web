import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ClientEdit extends Component {

    payload = {
        userId: '',
        value: '',
        key: ''
    }

    emptyItem = {
        userId: '',
        data: ''
    };

    emtpyBlock = {
        userId: '',
        data: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            block: this.emtpyBlock
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const client = await (await fetch(`/biochain/patients/${this.props.match.params.id}`)).json();
            this.setState({item: client[0], block: this.emtpyBlock});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    // async handleSubmit(event) {
    //     event.preventDefault();
    //     const {item} = this.state;
    
    //     await fetch('/clients' + (item.id ? '/' + item.id : ''), {
    //         method: (item.id) ? 'PUT' : 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(item),
    //     });
    //     this.props.history.push('/clients');
    // }
async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    const {block} = this.state;
  
    this.payload.userId = item.userId;
    this.payload.value = item.value;
    this.payload.key = item.key;

    await fetch('biochain/bioblocks/create/' + item.username, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(this.payload),

    
    }).then(response => response.json).then(alert("Block added successfully!"), item.key = '', item.value = '', this.setState({item: item}));
    // this.props.history.push('/patients');
}

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Client' : 'Add Data to Biochain'}</h2>;
        const patientInformation = <h2>Patient Information</h2>

        return <div>
            <AppNavbar/>
            {patientInformation}
            <Container>
                <FormGroup>
                        <Label for="name"><b>First Name:</b></Label>
                        <Label for="name"> {item.firstName}</Label>
                </FormGroup>
                <FormGroup>
                        <Label for="name"><b>Last Name:</b></Label>
                        <Label for="name"> {item.lastName}</Label>
                </FormGroup>
                <FormGroup>
                        <Label for="name"><b>Date of Birth:</b></Label>
                        <Label for="name"> {item.dateOfBirth}</Label>
                </FormGroup>
                <FormGroup>
                        <Label for="name"><b>Username:</b></Label>
                        <Label for="name"> {item.username}</Label>
                </FormGroup>
                <FormGroup>
                        <Label for="name"><b>User ID:</b></Label>
                        <Label for="name"> {item.userId}</Label>

                </FormGroup>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Enter Key</Label>
                        <Input type="text" name="key" id="key " value={item.key|| ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>    
                    <FormGroup>
                        <Label for="email">Enter Value</Label>
                        <Input type="text" name="value" id="value" value={item.value || ''}
                               onChange={this.handleChange} autoComplete="value"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/clients">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ClientEdit);