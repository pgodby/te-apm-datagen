import React from 'react';
// Splunk UI
import Button from '@splunk/react-ui/Button';
import Card from '@splunk/react-ui/Card';
import DL from '@splunk/react-ui/DefinitionList';
import Number from '@splunk/react-ui/Number';
import Select from '@splunk/react-ui/Select';
// Splunk UI Icons
import Clear from '@splunk/react-icons/Clear';
import Save from '@splunk/react-icons/Save';
// Utilities
require('isomorphic-fetch');

class Service extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code:200,
            delay:0
        };
    }

    componentDidMount() {
        this.setState({host: window.location.hostname});
        this.resetData();
    }

    codeSelected = (e, {value}) => {
        this.setState({code: value});
    };

    delaySelected = (e, {value}) => {
        this.setState({delay: value});
    };

    resetClicked = async (e) => {
        await this.resetData();
        await this.saveData();
    }

    saveClicked = async (e) => {
        await this.saveData();
    }

    resetData = async (e) => {
        await this.setState({code:200, delay:0});
    };

    saveData = async (e) => {
        const { code, delay } = this.state;
        const { service } = this.props;
        const url = `http://localhost:8080/config?service=${service}&code=${code}&delay=${delay}`;
        const r = await fetch(url);
        console.log(r);
    };

    render() {
        const { code, delay, host } = this.state;
        const { service } = this.props;

        const codes = [200,201,301,401,404,500];
        const options = codes.map((code,i) => 
            <Select.Option key={service.name+code} label={code.toString()} value={code} />
        );

        return(<div style={{ margin: 25 }}>
        	<Card>
                <Card.Header title={service} />
                <Card.Body>
                    <DL>
                        <DL.Term>Response Code</DL.Term>
                        <DL.Description>
                            <Select value={code} onChange={this.codeSelected} style={{width:'125px'}}>{options}</Select>
                        </DL.Description>
                        <DL.Term></DL.Term><DL.Description></DL.Description>
                        <DL.Term>Response Delay</DL.Term>
                        <DL.Description>
                            <Number min={0} max={5} value={delay} onChange={this.delaySelected} style={{width:'125px'}} />
                        </DL.Description>
                        <DL.Term></DL.Term><DL.Description></DL.Description>
                    </DL>
                    <Button label="Save" icon={<Save/>} appearance="flat" onClick={this.saveClicked}/>
                    <Button label="Reset" icon={<Clear/>} appearance="secondary" onClick={this.resetClicked}/>
                </Card.Body>
            </Card>
        </div>);
    }
}

export default Service;
