[strongloop-website]: http://strongloop.com/

#loopback-example-rest-connector

- [Overview](https://github.com/strongloop/loopback-example-rest-connector#loopback-example-rest-connector)
- [Running the app](https://github.com/strongloop/loopback-example-rest-connector#running-the-app)
- [FAQ](https://github.com/strongloop/loopback-example-rest-connector#faq)

#Overview
This example demonstrates basic usage of `loopback-connector-rest`. There are
two servers in this project: `local-server` and `remote-server`. The remote server
simply serves up a simple REST API, while the local server fetches data using
this REST API.

#Running the application
1. Clone the application.
2. Start up the remote server `slc run external-server` from the project root.
3. Start up the local server `slc run local-server` from the project root.

You should see console messages on the local server. Verify the data has been
retrieved from the remote server by doing a GET request on Magazines in the
explorer or by running `curl localhost:3000/api/Magazines`.

#FAQ
The following are common questions related to using the REST connector.

- [How do you perform a GET request to a remote server](https://github.com/strongloop/loopback-example-rest-connector#how-do-you-perform-a-get-request-to-a-remote-server)

##How do you perform a GET request to a remote server?
In this example, we have a REST API exposed in [model-config.json](https://github.com/strongloop/loopback-example-rest-connector/blob/master/external-server/server/model-config.json#L31)
.

To make a request to the remote server, declare new datasource that uses the
REST connector in the local [datasources.json](https://github.com/strongloop/loopback-example-rest-connector/blob/master/local-server/server/datasources.json#L6-L20).

A few things to note in this file is the `connector` property's value is `rest` and
there is an `operations` property that takes an array of objects.

This object has two properties: `template` and `function`.

The `template` property contains `method` which is the HTTP method type to
perform the request with and `url` which is the URL to the remote resource.

The `function` property is the name of the property you will use to trigger the
request. For example, we name our property `find` because we will trigger the
request using `Magazine.find()...`.

The idea is to use [`find`](https://github.com/strongloop/loopback-example-rest-connector/blob/master/local-server/server/datasources.json#L16) to make a [`GET`](https://github.com/strongloop/loopback-example-rest-connector/blob/master/local-server/server/datasources.json#L12) request to a [`url`](https://github.com/strongloop/loopback-example-rest-connector/blob/master/local-server/server/datasources.json#L13) we specify.

---

[Back to top](https://github.com/strongloop/loopback-example-rest-connector#loopback-example-rest-connector)
