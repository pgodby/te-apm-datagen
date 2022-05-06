# apm-demo
A microservices demo for Splunk Application Monitoring. This demo uses OpenTelemetry and auto-instrumentation to send trace/span data to APM.

## Requirements
- Docker
- Docker Compose

## Installation & Configuration
1. Clone the GitHub repository
```
git clone https://github.com/pgodby/apm-demo
cd apm-demo
```
2. In the **apm-demo** directory, create a new file named **apm.env**. In this file, enter the following key-value pairs to configure the demo for your Splunk APM realm. Replace the values listed below as follows:
- *< access_token >* = Enter a valid access token from your APM realm.
- *< realm >* = Enter your APM realm. For example: us1
- *< name >* = Enter a unique name for your deployment environment. This value can be used to filter for your specific microservices application in APM.
```
SPLUNK_ACCESS_TOKEN='<access_token>'
OTEL_EXPORTER_OTLP_ENDPOINT='https://ingest.<realm>.signalfx.com/v2/trace/otlp'
OTEL_RESOURCE_ATTRIBUTES='deployment.environment=<name>'
```

## Start the demo
In a terminal, execute the following command (in the **apm-demo** directory) to build and start the Dockerized application. Use *sudo* if your account has insufficient privileges.
```
docker-compose up --build
```

## Configure the demo
1. In a browser, visit the IP address of the server. If you are working on your own machine, visit *localhost*.
2. For each service, configure the desired HTTP response delay and the HTTP status code that should be returned. These values will apply to all requests received by the service.
3. At the top, choose a duration for the simulation. You can also alter the interval between HTTP requests. By default, the demo will make HTTP requests every 5 seconds for 15 minutes.
4. At the top, press the **play/start** button to start the demo.
5. Log in to Splunk Application Monitoring and filter for your environment. Review the services and explore the service map. If you increased the response delay or changed the HTTP status code for a specific service, it should now appear in red in the service map.

## Stop the demo
In the terminal where the docker containers were started, press **CTRL-C** to stop all of the containers.