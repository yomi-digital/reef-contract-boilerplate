#!/bin/bash

echo "Purging chain data.."

reef-node purge-chain --dev -y

echo "Running Reef Node daemon."

reef-node --dev --base-path /tmp/reefnode --port 30333 --ws-port 9944 --rpc-port 9933 --rpc-methods Auto --rpc-cors all --rpc-external --ws-external --name ReefDev


cleanup ()
{
  kill -s SIGTERM $!
  exit 0
}

trap cleanup SIGINT SIGTERM

while [ 1 ]
do
  sleep 60 &
  wait $!
done