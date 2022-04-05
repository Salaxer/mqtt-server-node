/*
 * Copyright 2021 HiveMQ GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var mqtt = require('mqtt')
const express = require("express");
const { createServer } = require("http");

const port = 3000;
const app = express();
const httpServer = createServer(app);

httpServer.listen(port, () => {
  console.log(`MQTTserver running at http://localhost:${port}/`);
});

var options = {
  host: '0070dab94b6e4df894cff18d9cd6aa81.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'Salaxer',
  password: 'mn!eFdYJ2gVes4k'
}

//initialize the MQTT client
var client = mqtt.connect(options);
var topic = "message";

// prints a received message
client.on('message', function(topic, message) {
  console.log(String.fromCharCode.apply(null, message)); // need to convert the byte array to string
});

// reassurance that the connection worked
client.on('connect', () => {
  console.log('Connected!');
});

// prints an error message
client.on('error', (error) => {
  console.log('Error:', error);
});

// subscribe and publish to the same topic
client.subscribe(topic);
client.publish(topic, 'Hello, this message was received!');
client.publish(topic, 'Hi!');