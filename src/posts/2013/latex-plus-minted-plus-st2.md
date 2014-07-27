---
title: "LaTeX + Minted + ST2"
date: 2013-04-24 08:11
tags: [LaTex]
template: post
draft: true
---

__NOTE__: This instruction is for OS X.

I use [Sublime Text 2][1] on OS X for almost every code-related tasks including LaTeX. Recently I finished a conference paper for NIME(New Interface for Musical Expression) and I needed some code listings in it. To achieve this features with ST2, I had to go through several steps:

1. Install [LaTexTool][2] Package with Package Control in ST2.

2. Install [Pygments][3] for your Python distribution. You might need to install [setuptools][5] as well. In my case, the version of Python was 2.7.1.

3. Install [minted][4] LaTeX package. I just used `make` to create `minted.sty` and put it into the paper directory.

4. Find the Sublime's build file for LaTeXTool at the path below and fix by adding the `-shell-escape` option as shown below. Otherwise building a PDF file from ST2 will be failed.

```bash
~/Library/Application\ Support/Sublime\ Text\ 2/Packages/LaTeXTools/LaTeX.sublime-build
```

```json
...
"cmd": ["latexmk", "-cd",
        "-e", "\\$pdflatex = 'pdflatex %O -interaction=nonstopmode -synctex=1 -shell-escape %S'",
        //"-silent",
        "-f", "-pdf"],
...
```

You will be able to use `minted` package with `listing` package in the TeX script.

```latex
\usepackage{listings}
\usepackage{minted}

\begin{document}
...
```

[1]: http://www.sublimetext.com/2
[2]: https://github.com/SublimeText/LaTeXTools
[3]: http://pygments.org/download/
[4]: https://github.com/gpoore/minted
[5]: https://pypi.python.org/pypi/setuptools