---
title: "10 Vim Plugins for Writers"
date: "2019-12-15T14:04:00-03:00"
permalink: "/post/vim-for-writers"

tags: writing vim
excerpt: "A text editor is so much more than mere software."
image: /images//writing.jpg
---

![](/images//writing.jpg)

I still remember the first time I came in contact with Vim; it was during my very first job. It was a part-time gig in a government office. A few months in, they decided to go open-source full in. Out the window went Windows and in came Linux. At the time, I was doing PHP development, and I was sorry to have to let go of my dear Dreamweaver.

I decided that if I had to work on Linux, I would go all the way, no compromises for me. That meant getting used to working on the console and learning Vim.

When one of the resident Linux gurus walked by my seat and saw my screen, he said, “Are you using Vi? Maybe you’re not so useless after all.” (Funny story, I came across him on facebook the other day. Now that he’s bald, he doesn’t look intimidating at all).

Lately, I’ve been writing a lot. I found that armed with the right plugins, Vim is a great tool writing:

- **vim-pencil**: my favorite writing plugin. [Vim-pencil](https://github.com/reedes/vim-pencil) brings a ton of nice things like navigation aids, smarter undo based on punctuation, and proper soft wrapping.
- **vim-ditto**: [ditto](https://github.com/dbmrq/vim-ditto) highlights repeated words in a paragraph, just what I need to avoid repeating words all the time.
- **vim-goyo**: a Writeroom lookalike for Vim, [goyo](https://github.com/junegunn/goyo.vim) removes all distracting elements like modeline and line numbers.
- **vim-colors-pencil**: an elegant, low contrast [colorscheme](https://github.com/reedes/vim-colors-pencil) geared towards writing.
- **vim-litecorrect**: [litecorrect](https://github.com/reedes/vim-litecorrect) automatically corrects common typing errors like “teh” instead of “the”.
- **vim-lexical**: combined spellchecker and thesaurus. [Vim-lexical](https://github.com/reedes/vim-lexical) lets me navigate between spell errors with `]s`, `[s` and quickly find synonyms with `<leader> t`
- **vim-textobj-sentence**: a [plugin](https://github.com/reedes/vim-textobj-sentence) for better sentence navigation. I can move between sentences with `(` and `)`, I can cut a sentence with `dis`. Depends on [vim-textobj-user](https://github.com/kana/vim-textobj-user).
- **vim-textobj-quote**: this [plugin](https://github.com/reedes/vim-textobj-quote) smartly creates “quotes” so I don’t have to.
- **ALE**: the [Asynchronous Lint Engine](https://github.com/dense-analysis/ale) is a polyglot analysis tool that is not limited to code. It supports a bunch of style checkers like [proselint](http://proselint.com/) and [LanguageTool](https://languagetool.org/).
- **vim-orgmode**: I’ll admit that, before I saw the errors of my ways, I communed with [the one that should not be named](https://https://www.gnu.org/software/emacs/). During the time I used Emacs, I never fully switched away from Vim, that alone should have told me something.

For my labors, I gained something invaluable: I found [Org mode](https://orgmode.org/). For me, Org-mode is the most intuitive and straightforward way of interacting with text. This filetype [plugin](https://github.com/jceb/vim-orgmode) only implements a subset of all its features, but even so, it’s good enough for my purposes.

While not Vim-related, I also find these tools irreplaceable in my workflow:

- [pandoc](https://pandoc.org/): a command-line markup converter. Supports dozens of formats, including Org-mode and markdown. I usually write in Org and then export to the target type.
- [TitleCase.pl](https://daringfireball.net/projects/titlecase/TitleCase.pl): John Gruber’s title case Perl script. I haven’t found a good native Title Case plugin for Vim, so I just use a `!TitleCase.pl` filter.
- [grip](https://github.com/joeyespo/grip): view local Markdown files with GitHub renderer. I use it to preview how my files will look before pushing them.

<!--
- Grammarly: a life saver, I love it so much I subscribed to the premium plan. Even on the free tier, it’s so good to spot common mistakes other checkers will miss. It not perfect, but works well with markdown and org-mode content.
- [Hemingway App](http://www.hemingwayapp.com/): I’m trying this one out. It marks words and sentences that can be
-->

<!--
I don’t think I’m going to move away from Vim anymore. I tried most of the other editors: Visual Studio Code, Atom, Sublime Text, Eclipse, and lots more. They just don’t feel as satisfying to work with as Vim.
-->

Happy writing!

Tomas

