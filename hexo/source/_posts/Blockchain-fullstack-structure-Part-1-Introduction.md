---
layout: blog
title: Blockchain fullstack structure - Part 1 - Introduction
date: 2022-07-31 07:28:30
tags: ["Blockchain", "Fullstack", "Solidity", "Hardhat", "Golang", "Reactjs", "Next.js"]
author: Joseph
photos: ["logo.png"]
categories: ["Joseph", "Blockchain"]
---

Recently, I ogranized a template of my blockchain fullstack project, including a Hardhat Solidity, Golang backend, and React js frontend. Does it need golang backend? Actually, I'm not sure. But there is a [post](https://soliditydeveloper.com/solidity-overview-2020) said:

> Server: 
> Even though you have your smart contracts as backend, often times a Dapp will still have an additional traditional server running. Not always, but probably more often than you think.

So, I combined Harhat, Golang gin, and Next.js to my [dApp-structure](https://github.com/josephMG/dApp-structure) github repo, added some basic, simple interaction from Next.js to Blockchain, and from Golang to Blockchain.

<!-- more -->

### Prerequisite
- [Docker / Docker compose](https://www.docker.com/): Each project is dockerized, so you have to install docker first.
- [Gnu parallel](https://www.gnu.org/software/parallel/man.html): At the root project, I run docker in each project parallelly by `parallel`


### Project structure
Now, let's look at my project structure first.
![project structure](project-structure.png)

Here I have:
- `Makefile`: to make frontend, backend, and hardhat docker-compose run.
- `backend`: to put Golang gin project, and I use [go clean architecture](https://github.com/wesionaryTEAM/go_clean_architecture).
- `frontend`: to put Next.js react project.
- `hardhat`: to put Hardhat solidity project.
- `run_abigen.sh`: to generate Golang file from Hardhat to backend.

As you see, there's nothing special at the root. Because my host is MacOS, I can use `http://docker.for.mac.localhost` to connect each docker container. I just need to think how to run each project's dockerfile at the root, thus I create `Makefile` and call `parellel` to run `docker-compose` for each child folders.

```Makefile
SUBDIRS = hardhat backend frontend
CURRENT_DIR := $(shell pwd)

define FOREACH
    for DIR in $(SUBDIRS); do \
        echo "=============  $(1) > $(CURRENT_DIR)/$$DIR"; \
        cd $(CURRENT_DIR)/$$DIR && $(1); \
    done
endef

all: build up
clean: down stop-rm-volume prune

up:
  parallel -j3 --lb 'cd ${PWD}/{} ; docker-compose --ansi always up' ::: $(SUBDIRS)

build:
  $(call FOREACH, docker-compose build)

down:
  $(call FOREACH, docker-compose down)

stop-rm:
  $(call FOREACH, docker-compose rm -sf)

stop-rm-volume:
  $(call FOREACH, docker-compose rm -sfv)

prune:
  docker system prune -af
```

`make up` run `docker-compose` parallelly, so that each subproject can run at the same time. `make build`, `make down`, `make stop-rm`, and `make stop-rm-volume` run `docker-compose` for each subproject in succession in order to generate an beautiful output.

![output](output.jpg)
Let's see the outpue of `make up`, and it shows each docker-compose result simultaneously.

Then, I introduce the `run_abigen.sh` file.
```shell
#!/bin/bash

read -p 'Input solidity json filename in your hardhat/data/abi folder (e.g.: Greeter): ' FILENAME

docker run -v $(pwd)/hardhat:/sources -v $(pwd)/backend:/targets ethereum/client-go:alltools-stable abigen \
  --abi=sources/data/abi/$FILENAME.json \
  --type $FILENAME \
  --pkg contracts \
  --out=targets/contracts/$FILENAME.go
```

It's not too hard. I use [hardhat-abi-exporter](https://www.npmjs.com/package/hardhat-abi-exporter) in hardhat to get ABI json, so I can use abigen docker to transfer ABI json to Go module. That's all this file does.

Next time I will introduce each project's setting. If you have any advice or question, please feel free to let me know.

### References
- Github: [dApp-structure](https://github.com/josephMG/dApp-structure)
