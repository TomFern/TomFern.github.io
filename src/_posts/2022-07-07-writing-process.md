---
title: "My Writing Process"
date: "2022-07-09T07:00:00-03:00"
permalink: "/post/my-writing-process"
tags: "writing"
excerpt: "The process I use from research to publication in my work as a full-time technical writer"
---


I tend to have a more *suis generis* process for writing technical documents. With this I mean I don’t have too much of a structure when it’s time to type. I usually do an outline first (but not always) and then write, edit, cut, redit, recut until I have something that’s, at the very least, decent.

But lately I’ve been paying more attention to how I write and I’ve noted that I’m kind of following a process after all. After some though, I think I’m ready to formalize it a bit. For now, I’ll only name the steps:

- Research
- Sketch
- 1st draft
- 2nd draft
- 3rd draft
- Review
- Publish

Let me explain what happens in each one.

## Research

Any good article starts from good knowledge. This is probably my favorite part of the process as I don’t really need to worry about the writing. I just can learn interesting.

During this process I take notes, collect links, grab interesting paragraphs, see videos and presentations, save screenshots and try to learn a little bit of the people behind the tech (an often forgotten part of technical writing).

I keep track of everything with [Notion](https://www.notion.so/).

Once I think I know enough get started with the article is sketching time.

## Sketch

During this phase I create a tentative outline: write headers, describe the contents of each section, make notes of there diagrams will be needed and plan the ideas. I write all my articles in Markdown and use [pandoc](https://pandoc.org/) if I need to switch formats.

Before I start writing paragraphs I like to place a single sentence descring its main idea. It helps me keep focused and form an idea of how the article will flow from paragraph to paragran and section to section.

For most of the first phases of the writing [I use Vim as my primary text editor](https://tomfern.com/posts/10-vim-plugins-for-writers/), because it’s so easy to move large chunks of text around.

## 1st draft

The first draft is usually the hardest. If I’m lucky the work I did on the sketch will help me get over the first draft soon.

In this phase, guided by the ideas/paragraph flow, I flesh out each paragragh. I also design most diagrams, write their alt and caption texts. I do this here because a diagram with a good caption can save a lot of writing.

The first draft doesn’t have to be perfect, it rarely is any good in fact. The important part is fill the empty space with something to work with.

## 2nd draft

On the second draft I want to make sure:
- I haven’t missed something important.
- I’m writing accurately.
- I haven’t gone any rabbit holes.

So I go back to my reseach notes and compare what I’ve written with the facts. Having written about the topic I can understand my notes more deeply.

I add any missing details, do a little fact checking (usually do a more research), take out parts that aren’t needed.

By the second draft, I expect to have a more coherent article. So I go streamlining the text paragraph by paragraph section by section. I use [Grammarly](https://grammarly.com/) heavily at this point to correct and consolidate. I love Grammarly, its suggestions are usually spot on. Although, it’s a bit stubborn at times regarding word choices. There’s a lot of “this word is overused, use this one instead” that really makes no sense. But overall is a great tool.

## 3rd draft

By the third draft I can take a more panoramic view of the draft. I check if it flows well and make little adjustments. For that, I switch to [Typora](https://typora.io/) as it gives me the full rendering of the page with graphics.

I’m a strong believer of simple language so during this phase I use [Hemingway Editor](https://hemingwayapp.com/) to simplify complex sentences. In all honesty I wish I could write simple sentences from the get go. It would simplify things so much. Regardless, the Hemingway editor is great. It highlights complex sentences, and offers a few simpler alternative words.

I tend to rewrite a lot of paragraphs during this last draft. When I’m out of ideas or have difficulty finding different ways of expressing a though I use [Quillbot](https://quillbot.com/), a rephrasing engine, to get altenate versions and inspiration.

Before sending the draft to review do a pass with Google Docs. It’s surprising how good this humble word editor is at picking errors no other tool had.

## Review

I’m blesseed with having people who can review my draft. Doubly blessed with a technical reviewer that fact checks and offers insightful suggestions, and a proofreader that doesn’t let me get away with lazy writing. After the review process, the draft has reached a new level in quality.

## Publish

The last stretch involves preparing the draft for publication. I check that graphics all looking good, code is lined up, links are broken and everything is ready for publication.

Once published, it’s rinse and repeat with the next draft.

## Recap

Here’s how the process looks visually.

![The phases with a circular arrow mean the steps inside are to be repeated until ready to move on.](/images/writing-process.jpg)

Happy writing

-Tommy
