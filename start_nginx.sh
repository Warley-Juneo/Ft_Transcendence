#!/bin/sh
nginx -p $(shell pwd) -c nginx.conf -s reload

# ngrok: nginx
#     ngrok http --domain=transcendence.ngrok.app 8080