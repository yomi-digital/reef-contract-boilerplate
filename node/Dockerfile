FROM ubuntu:20.04

EXPOSE 30333 9944 9933

RUN apt-get update && apt-get install -y wget
RUN wget https://github.com/reef-defi/reef-chain/releases/download/v10/reef-node
RUN chmod 777 ./reef-node
RUN mv ./reef-node /usr/local/bin

COPY run.sh /run.sh

RUN chmod +x run.sh

ENTRYPOINT ["/run.sh"]
