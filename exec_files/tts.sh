#!/bin/bash

text=$1

lang=$2

if [ -f "./tts.wav" ]; then
    rm "./tts.wav"
fi

curl --location --request POST 'https://hackapi.reverieinc.com/tts' --header 'token: d4b6f130928765eaa5cf9c632f7c7eca55f3fb5d' \
--header 'Content-Type: application/json' \
--data-raw "{ \"text\": \"$text\", \"lang\": \"$lang\"}" >> tts.wav

open tts.wav