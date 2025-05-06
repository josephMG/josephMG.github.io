---
title: Switching from vim to Neovim!
tags: ['fullstack', 'devops']
author: Joseph
category: review
image: 'banner.png'
publishDate: 2025-05-05 09:34:58
---

I've been using Vim for a long time and finally switched to Neovim. The initial thought of switching came after [the author of VIM passed away](https://en.wikipedia.org/wiki/Bram_Moolenaar#Illness_and_death) in August 2023, as I didn’t have the time to try other editors. After a year, “vibe coding” grew up, so I started thinking how to integrate AI into my editor and surveying how to use AI in Vim, which led to this journey.

### TOC

### Main differences

1. Tab vs. Buffer:

> ref: https://www.reddit.com/r/neovim/comments/13iy0p0/why_some_people_use_buffers_for_tabs_and_not_vim/

In vim, I used `vsp` or `tabnew` to open or edit a file and mapped `tabprevious` command with `Tab` key to [navigate between tabs](https://github.com/vim-airline/vim-airline). However, in Neovim, I used buffer instead of tabs and mapped `BufferLineCyclePrev` with `Shift + h` for [switching buffers](https://github.com/akinsho/bufferline.nvim).

2. coc vs. native lsp:

I configured many [coc](https://github.com/neoclide/coc.nvim) settings to support TypeScript and JavaScript language servers, including linting and Prettier on save, go-to definition or reference, and codelens. After using Neovim, I converted all of these settings to [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) and [mason](https://github.com/williamboman/mason.nvim?tab=readme-ov-file), among others.

3. Lua supports:

Although I’m not familiar with Lua, it allows me to write more readable configuration files using modules, functions, and tables (objects) for Neovim.

```lua
return {
  "akinsho/bufferline.nvim",
  version = "*",
  dependencies = "nvim-tree/nvim-web-devicons",
  opts = {
    options = {
      sort_by = "insert_at_end",
      numbers = "both",
      diagnostics_indicator = function (count, level, diagnostics_dict, context)
        local s = " "
        for e, n in pairs(diagnostics_dict) do
          local sym = e == "error" and " " or (e == "warning" and " " or " ")
          s = s .. n .. sym
        end
        return s
      end
    }
  },
  config = function (_, opts)
    vim.opt.termguicolors = true
    require("bufferline").setup(opts)
  end
}
```

4. AI supports:

Vibe coding! I found many plugins to integrate LLMs and finally selected three to use:

- [avante.nvim](https://github.com/yetone/avante.nvim)
  Let your Neovim be a Cursor AI IDE – it's undergoing rapid iterations and many exciting features will be added successively; it updates almost every day!
- [CodeCompanion](https://codecompanion.olimorris.dev/)
  CodeCompanion can customize workflows and prompts, and its `Action Palette` is a really useful tool.
- [gp.nvim](https://github.com/Robitx/gp.nvim)
  GP means GPT Prompt, and it's an Neovim AI plugin. It helps me write prompts through Neovim's [cmdline](https://github.com/folke/noice.nvim).

I usually switch between these plugins, and I'm still thinking about my 'vibe-way' to use them. Because of supporting [Ollama LLM](https://ollama.com/), all of them can be used offline.

For now, I've used Neovim for three months, and got to know Neovim. In my experience, Neovim is really more productive than vim.

### Reference

- [AI in Neovim](https://www.joshmedeski.com/posts/ai-in-neovim-neovimconf-2024/)
- [How to set up Neovim for coding React](https://www.youtube.com/watch?v=ajmK0ZNcM4Q)
- [ZazenCodes Neovim](https://www.youtube.com/watch?v=z9IgFRAVV9w&list=PLTPHo6vRHQ8qmDjONxkQl0ZQb4Otwc34V)
