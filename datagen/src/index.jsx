import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';

ReactDOM.render(
	<SplunkThemeProvider family="prisma" colorScheme="dark" density="comfortable">
    	<App/>
    </SplunkThemeProvider>
,document.getElementById('root'));

document.body.style.backgroundColor = "#111215";