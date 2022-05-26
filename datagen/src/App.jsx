import React from 'react';
// Splunk UI
import Button from '@splunk/react-ui/Button';
import CardLayout from '@splunk/react-ui/CardLayout';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import DL from '@splunk/react-ui/DefinitionList';
import Heading from '@splunk/react-ui/Heading';
import Number from '@splunk/react-ui/Number';
import StaticContent from '@splunk/react-ui/StaticContent';
// Splunk UI Icons
import Clear from '@splunk/react-icons/Clear';
import Play from '@splunk/react-icons/Play';
import Stop from '@splunk/react-icons/Stop';
// Custom Data and Components
import Service from './Service';
// Utilities
require('isomorphic-fetch');

// timers!
let clockInterval = null;
let dataInterval = null;

// microservices!
const services = ["ad","cart","catalog","checkout","payment"];

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            delay: 10,
            duration: 15,
            timer: 900
        };
    }

    delaySelected = (e, {value}) => {
        this.stop();
        this.setState({delay: value});
    };

    durationSelected = (e, {value}) => {
        this.stop();
        this.setState({duration: value, timer: value * 60});
    };

    startClicked = async (e) => { this.start(); }
    stopClicked = async (e) => { this.stop(); }
    clearClicked = async (e) => { this.clear(); }

    start = () => {
        const { delay } = this.state;
        clockInterval = setInterval(this.clockTick, 1000);
        dataInterval = setInterval(this.dataTick, delay * 1000);
    }

    stop = () => {
        clearInterval(clockInterval);
        clearInterval(dataInterval);
    }

    clear = async () => {
        const { duration } = this.state;
        this.stop();
        await this.setState({timer: duration * 60, count: 0});
    }

    clockTick = () => {
        const { timer } = this.state;
        if (timer <= 0) {
            this.clear();
        } else {
            this.setState({timer: timer - 1});
        }
    }

    dataTick = () => {
        const { count } = this.state;
        this.setState({count: count + 1});
        fetch(`http://${window.location.href}:8080/api`);
    }

    render() {
        const { count, delay, duration, timer } = this.state;

        const clock = new Date(timer * 1000).toISOString().substr(11,8);

        const cards = services.map((service) =>
            <Service key={service} service={service}/>
        );

        return(<div style={{ margin: 25 }}>
        	<ColumnLayout>
                <ColumnLayout.Row>
                    <ColumnLayout.Column span={12}>
                        <Heading level={4}>TE Datagen</Heading>
                        <Heading>Splunk Application Performance Monitoring</Heading>
                        <Heading level="ss">Microservices HTTP Requests Simulation</Heading>
        			</ColumnLayout.Column>
        		</ColumnLayout.Row>
                <ColumnLayout.Row>
                    <ColumnLayout.Column span={3}>
                        <ControlGroup label="" labelWidth={0}>
                            <StaticContent>Delay (s)</StaticContent>
                            <Number step={10} min={10} max={30} value={delay} onChange={this.delaySelected} style={{width:'75px'}} />
                            <StaticContent>Duration (m)</StaticContent>
                            <Number step={15} min={15} max={120} value={duration} onChange={this.durationSelected} style={{width:'75px'}} />
                        </ControlGroup>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={3}>
                        <ControlGroup label="" labelWidth={0}>
                            <Button icon={<Play/>} appearance="secondary" onClick={this.startClicked}/>
                            <Button icon={<Stop/>} appearance="secondary" onClick={this.stopClicked}/>
                            <Button icon={<Clear/>} appearance="secondary" onClick={this.clearClicked}/>
                            <StaticContent></StaticContent>
                            <DL termWidth={175}>
                                <DL.Term>Time Remaining</DL.Term>
                                <DL.Description><span style={{color:'#3F95FA'}}>{clock}</span></DL.Description>
                                <DL.Term>Number of Simulations</DL.Term>
                                <DL.Description><span style={{color:'#3F95FA'}}>{count}</span></DL.Description>
                            </DL>
                        </ControlGroup>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={6}/>
                </ColumnLayout.Row>
        		<ColumnLayout.Row>
                    <ColumnLayout.Column span={12}>
                        <CardLayout cardMinWidth={375} style={{width:'100%'}}>{cards}</CardLayout>
        			</ColumnLayout.Column>
        		</ColumnLayout.Row>
        	</ColumnLayout>
        </div>);
    }
}

export default App;
