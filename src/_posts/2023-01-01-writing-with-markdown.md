---
title: "Writing Posts in Markdown"
date: "2023-01-01T00:00:00-03:00"
permalink: "/post/writing-in-markdown"
tags: writing
excerpt: "This is how I organize my writing projects."
image: /images/gutenberg.jpg
---

TLDR; you can find the templates I use for writing at my [writing repository](https://github.com/TomFern/writing-templates).

---

My [very first writings](/post/what-got-me-writing) were done in Org-mode for Emacs. [org-mode](https://orgmode.org/) is a beat of a format for the Emacs text editor. With it, you can take notes, track time, organize projects, make to-do lists, and write blog posts.

I loved working with org-mode. But, since no one uses it, I had to convert my lovely org files into Markdown or Word to get a review or share a publishable package.

The conversion itself was fine. [Pandoc](https://pandoc.org/) is quite capable of parsing org files. The nag was that I had two juggle org and Markdown formats in my head. Too many times, I found myself adding org directives in Markdown and wondering why it didn't work. Eventually, I decided to ditch org and move to Markdown for good.

## Org-mode includes

The thing I loved most about org (for writing, at least) was its ability to use includes. I can add an `#+INCLUDE` directive, and Emacs/pandoc would expand the contents of that file into the main document. For example, with org, I could do this:

```org-mode
* My Title

Check out this awesome code:

#+INCLUDE: "./example.js" src javascript
```

Having code in separate files makes it very easy to copy/paste the text into tools like Grammarly or Hemingway Editor.

## Adding includes to Markdown

Markdown, unfortunately, does not have includes. With meant that I had to mix code and text on the same file. I didn't want to do that. Was there any way of adding includes to Markdown?

After some Googling around, I found [m4](https://www.gnu.org/software/m4/), a macro processor that has an [include directive](https://www.gnu.org/software/m4/manual/html_node/Include.html). To use this feature on Markdown, we must first change the default quotation marks by adding this at the top of the main Markdown file:

{% raw  %}
    changequote(`{{', `}}')
{% endraw %}

This enables me to write my code sample on a separate file, e.g., `example.js`:

    ```javascript
    console.log("Hey!")
    ```

And expand its contents by adding this line in my main Markdown file:

{% raw  %}
    include({{example.js}}
{% endraw %}

To render the expanded Markdown, we call m4 like this:

```bash
m4 -E -I./ main-post.md > expanded-post.md
```

The `-I` argument points to the include folder. So, this:

{% raw  %}
    changequote(`{{', `}}')

    # My Title

    Check out this awesome code:

    include({{example.js}}
{% endraw %}

Renders as:

    # My Title

    Check out this awesome code:

    ```javascript
    console.log("Hey!")
    ```

## Putting everything together

Over time, I put together small Makefiles that use this technique in conjunction with pandoc to convert my flavor of Markdown into plain Markdown, Word, or plain text. You can check the templates I use in my [writing repository](https://github.com/TomFern/writing-templates).

Happy writing!

-Tommy
