#!/bin/bash

name=$1
email=$2

curl --location --request GET "https://hackapi.reverieinc.com/token?email=$email" >> "../tokens/${name}_token.json"