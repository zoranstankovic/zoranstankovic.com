---
title: "How to set up nvm to work with fish shell?"
description: "In this post, we will see how to set up `nvm` to work with fish shell. After that, we will look at how to install and switch between Node.js versions using `nvm` commands."
date: 2019-11-30
image: "../../assets/images/posts/nvm-fish-shell.jpg"
tags: ["shell", "howTo", "terminal"]
draft: false
topic: "Shell"
type: article
---

Recently, I switched from oh-my-zsh to a [fish shell](https://fishshell.com/), and I didn’t regret it. Fish is a nice and user-friendly command-line shell. fish supports powerful features like syntax highlighting, autosuggestions, and tab completions that work, with nothing to learn or configure.
But when I tried to install nvm (Node Version Manager) I had a problem, the shell didn’t recognize the nvm command. After some investigation, I found the solution.
First, you need to install a [fisher](https://github.com/jorgebucaran/fisher). Fisher is a package manager for the fish shell. Download fisher.fish to your functions directory or any directory on your function path.

```bash
curl https://git.io/fisher --create-dirs -sLo ~/.config/fish/functions/fisher.fish
```

Your shell can take a few seconds before loading newly added functions. If the fisher command is not immediately available, launch a new session or replace the running shell with a new one.
After installing the fisher, you need to add the [Bass](https://github.com/edc/bass) package. Bass makes it easy-to-use utilities written for Bash in a fish shell. Using fisher:

```bash
fisher add edc/bass
```

Create a new fish file for nvm:

```bash
touch ~/.config/fish/functions/nvm.fish
```

And add fish function to it to load nvm:

```bash
function nvm
    bass source ~/.nvm/nvm.sh -- no-use ‘;’ nvm $argv
end
```

And you are ready-to-use NVM.

## How does NVM work?

If you want to download, compile, and install the latest release of node you just need to do this:

```bash
nvm install node # “node” is an alias for the latest version
```

To install a specific version of node:

```bash
nvm install 10.10.0 # or 8.9.1, etc.
```

Important to know is that the first version installed becomes the default. New shells start with the default version of node.
To set a default Node version in any new shell, use the alias ‘default’:

```bash
nvm alias default [version of node] # e.g.
nvm alias default 12.13.1
```

If you want to use a specific version of NodeJS for your project, you can specify the NodeJS version inside of `.nvmrc` file inside of your project e.g. `12.13.1` and then activate it using `nvm use` command in your shell.