---
title: Use Grafana MCP with Gemini and n8n
tags: ['MCP server', 'AI', 'Gemini', 'n8n', 'Grafana']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-08-11 21:08:13
image: 'banner.png'
---

Model Context Protocol (MCP) is extremely useful. AI assistant helps you decide when to use and how to use those connected tools, thus, we just need to configure them. After I integrated some MCP logging management systems on my several projects, it's greatly saved time for me.

In this article, I'm gonna to integrate [Grafana](https://github.com/grafana/mcp-grafana) with [Gemini CLI](https://github.com/google-gemini/gemini-cli) and [n8n](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/), chat on `Gemini CLI` and `n8n`, and let them invoke `Grafana MCP server`.

![structure](structure.png)

### TOC

<!-- more -->

### Prerequisites

I'll use these tools, so you prehaps need to install them first.

- [docker, docker compose](https://www.docker.com/get-started/)
- [Gemini CLI](https://www.docker.com/get-started/)
  - previous [post](../install-gemini-cli)
- [n8n docker compose](https://github.com/n8n-io/n8n-hosting/tree/main)
- [Grafana](https://grafana.com/)

There are many ways to setup Grafana MCP, so I'm gonna to connect Grafana MCP server by docker in Gemini CLI, and connect by binary file in n8n. However, I ran Grafana in docker on my localhost (http://host.docker.internal:9120), you can set to your Grafana service anyway.

### Grafana Service Account

Service account has a `token` can let MCP client connect and authenticate with Grafana, therefore we need to create a service account and generate a token for it. Let's get them step-by-step:

1. Click the menu on your left-hand,
2. Click `Administration`,
3. Click `Service accounts` under the `Users and access`,
4. Create a service account by `Add service account`,
5. Generate a token by `Add service account token`.
6. Copy your token!

![grafana1](./grafana1.jpg)
![grafana2](./grafana2.jpg)

Since you get the token and Grafana url, you can set them into Grafana MCP server environment vars now.

### Gemini CLI using Grafana MCP

Don't worry. It is quite simple if you remember my article about [Figma MCP](../use-figma-mcp-server-with-gemini-cli). I'll follow [this usage](use-figma-mcp-server-with-gemini-cli/) to use docker to connect `Gemini` and `Grafana`.

```json
"mcpServers": {
  "grafana": {
    "command": "docker",
    "args": [
      "run",
      "--rm",
      "-i",
      "-e",
      "GRAFANA_URL",
      "-e",
      "GRAFANA_API_KEY",
      "mcp/grafana",
      "-t",
      "stdio"
    ],
    "env": {
      "GRAFANA_URL": "http://host.docker.internal:9120",
      "GRAFANA_API_KEY": "YOUR_GRAFANA_SERVICE_ACCOUNT_TOKEN"
    }
  }
}
```

When I type `/mcp` on Gemini CLI, it shall list all tools. Besides, I can ask Gemini to `Summarize grafana board`, `"Docker Prometheus Monitoring" board summary`, or `query_prometheus rate(node_cpu_seconds_total{mode="system"}[5m])`.
![grafana-gemini](./grafana-gemini.jpg)

Now let's see how to use `Grafana` with `n8n`.

### N8n using Grafana mcp

I did not install docker into n8n container, so I deside to run `mcp-grafana` binary file directly.

> Download here: https://github.com/grafana/mcp-grafana/releases

Just run these command inside your container to install it.

```shell
$ wget https://github.com/grafana/mcp-grafana/releases/download/v0.6.2/mcp-grafana_Linux_x86_64.tar.gz
$ tar -xvzf mcp-grafana_Linux_x86_64.tar.gz
```

After that, n8n nodes should be able to run grafana by `/home/node/mcp-grafana` command. Before we try the command, we have to add `n8n-nodes-mcp` community node into n8n and setup ai-agent workflow. Let's take a look.
![community-node](./community-node.jpg)
![workflow](./workflow.jpg)

- AI Agent node:
  I set a system prompt `You are a helpful Grafana MCP assistant `, and then trigger by the `connected chat trigger node`.
- Google Gemini Chat Model:
  The important thing is the host of `Credential Google Gemini(PaLM) Api` should be `https://generativelanguage.googleapis.com`, and paste your [Gemini API key](https://aistudio.google.com/apikey) into `API Key` field.
- Simple Memory:
  `Context Window Length` is set to `10` because we need to communicate many times with assistant.
- MCP Client tool - listTools:
  Remember to use the `MCP client tool` we just downloaded from community. This node I set `Operation` to `List Tools`.
  ![mcp-client](./mcp-client.jpg)
  ![list-tools](./list-tools.jpg)
- MCP Client tool - executeTool:
  This node I set `Operation` to `Execute Tool`, and `Tool Name` to `{{ $fromAI('tool') }}`. You may attention to the green area that says `Let the model defines this parameter`, just click it!
  ![execute-tool](./execute-tool.jpg)
- Grafana MCP Credential:
  This credential is connected using `Command Line (STDIO)`, set command to `/home/node/mcp-grafana`, and set environment `GRAFANA_URL` and `GRAFANA_API_KEY`.
  ![mcp-credential](./mcp-credential.png)

Okay! Just try some prompts for this MCP:

> { "tool": "query_prometheus", "Tool_Parameters": { "datasourceUid": "PBFA97CFB590B2093", "expr": "rate(node_cpu_seconds_total{mode="system"}[5m])", "queryType": "range", "startTime": "now-1h", "endTime": "now", "stepSeconds": 60 } }

```
The Prometheus query returned time series data for the rate of system CPU usage over the last hour, sampled every 60 seconds, for 11 CPU cores (labeled 0 through 10).

Here is a summary of the data for each CPU core:

CPU 0:
  Latest Value: 0.0148
  Average Value: 0.0155
CPU 1:
  Latest Value: 0.0061
  Average Value: 0.0059
CPU 2:
  Latest Value: 0.0064
  Average Value: 0.0058
CPU 3:
  Latest Value: 0.0037
  Average Value: 0.0053
CPU 4:
  Latest Value: 0.0044
  Average Value: 0.0054
CPU 5:
  Latest Value: 0.0065
  Average Value: 0.0053
CPU 6:
  Latest Value: 0.0050
  Average Value: 0.0060
CPU 7:
  Latest Value: 0.0045
  Average Value: 0.0051
CPU 8:
  Latest Value: 0.0049
  Average Value: 0.0047
CPU 9:
  Latest Value: 0.0068
  Average Value: 0.0045
CPU 10:
  Latest Value: 0.0035
  Average Value: 0.0046
This data indicates the proportion of time each CPU core spent in "system" mode over 5-minute intervals. I can provide a more detailed analysis, create a visualization, or filter the data further if you need.

```

![grafana-n8n](./grafana-n8n.jpg)

### Conclusion

Cool! Model Context Protocol (MCP) is extremely useful because we can connect it with many AI agents at once. We don't write any codes to connect http-request or Grafana API,however, only few steps is needed and the service is connected by MCP clients!

If you like this post, please connect with me on LinkedIn and give me some encouragement. Thanks.
