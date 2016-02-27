var express = require('express');
var app = express();
var url = require('url');
var request = require('request');

var slackRouter =  require('./routers/slack.js')
