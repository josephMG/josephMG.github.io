---
title: Use Figma MCP server with Gemini CLI
tags: ['Gemini', 'MCP server', 'AI', 'Figma']
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-07-31 05:49:43
image: 'banner.png'
---

In this article, I won't introduce what MCP is. Instead, I will explain how to set up the Figma MCP server and use Gemini as an MCP client to work with Figma. I will also show you how to run a prompt to get a Figma design with Gemini.

### TOC

<!-- more -->

### Figma MCP Introduction

Unlike other MCP servers that require you to install code to run them, with Figma, you only need to install the latest [Figma desktop app](https://www.figma.com/downloads/) and toggle on the MCP server from within the app. The Figma MCP server will then be installed on your host.

![install](./install.jpg)
![enable MCP](./enable-mcp.png)

After installation, you can try the link `http://127.0.0.1:3845/sse`, which should open in your browser with the following result.

![localhost](./localhost.png)

Now that we've successfully installed the Figma MCP server, I'll go ahead and set it up with Gemini.

> How to install Gemini? Just check this article: [Install Gemini CLI](../install-gemini-cli)

### Setup Gemini and Figma MCP server

If we open Gemini and type `/mcp`, we should see an empty MCP server list.
![empty-mcp](./empty-mcp.png)

Connecting Gemini with the Figma MCP server is quite simple. We just need to add the following setting to `~/.gemini/setting.json` or your project's settings file.

> Where is my setting.json? check this tutorial: [configuration](https://raw.githubusercontent.com/google-gemini/gemini-cli/refs/heads/main/docs/cli/configuration.md)

- **User settings file:**
  - **Location:** `~/.gemini/settings.json` (where `~` is your home directory).
  - **Scope:** Applies to all Gemini CLI sessions for the current user.
- **Project settings file:**
  - **Location:** `.gemini/settings.json` within your project's root directory.
  - **Scope:** Applies only when running Gemini CLI from that specific project. Project settings override user settings.
- **System settings file:**
  - **Location:** `/etc/gemini-cli/settings.json` (Linux), `C:\ProgramData\gemini-cli\settings.json` (Windows) or `/Library/Application Support/GeminiCli/settings.json` (macOS). The path can be overridden using the `GEMINI_CLI_SYSTEM_SETTINGS_PATH` environment variable.

Let's look at my `setting.json`. After configuring the settings, just type `/mcp` in the Gemini CLI again, and we'll see the configured MCP servers.

```json
{
  "theme": "GitHub",
  "selectedAuthType": "gemini-api-key",
  "mcpServers": {
    "Figma Dev Mode MCP": { "url": "http://127.0.0.1:3845/sse" }
  }
}
```

![figma-mcp](./figma-mcp.png)

So, we've connected Gemini with the Figma MCP server, and we can now use Gemini to communicate with Figma.

### Communicate With Figma

Before communicating, we have to open `Dev Mode` on Figma.

- Design mode:
  - ![./before-dev-mode](./before-dev-mode.png)
- Dev mode:
  - ![./after-dev-mode](./after-dev-mode.png)

The final step is to find your Figma file link by `right-click > copy link to selection`, paste the link into the Gemini CLI, and ask Gemini to do something with a prompt.
![copy](./copy.png)

Let's try this prompt:

> use figma download this link {YOUR_LINK} and save as image.svg

![get-image](./get-image.png)

All done. You can now use Gemini with the Figma MCP server, and you can let Gemini generate frontend code, a backend DB schema, or system user-story documents. Let's recall what we've done:

1. install the Figma app,
2. toggle on the Figma MCP server in the app,
3. use `Dev mode`,
4. set the Gemini mcpServers setting,
5. get the Figma file link, and
6. prompt Gemini.

If you like this post, please connect with me on LinkedIn and give me some encouragement. Thanks.

