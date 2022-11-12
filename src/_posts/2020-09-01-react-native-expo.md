---
title: React Native and Expo
date: "2020-09-01T23:46:37.121Z"
permalink: "/post/react-native-and-expo"
tags: react
excerpt: Imagine my hapiness when I found about a project that lets me code for mobile without leaving the command line.
---

I’ve started my career as a backend developer. Pretty early on, I had to get familiar the console and chose Vim as my main editor. Afterwards, as a sysadmin and dba I lived in ssh sessions. It’s great, I love it, but when it’s time to switch to the frontend I struggle.

Imagine my hapiness when I found about a project that lets me code for mobile without leaving the command line.

## React Native and Expo

React Native is a Facebook project that converts Javascript into native Android and iOS code. Using one language for both platforms is definetly enticing and conventient.

Expo is an official React Native project that lets you do without full featured IDEs like Android Studio.

https://expo.io/

Curious about how it worked, I tried it for a few days and here’s the result.

## Setting Up

We only need Node.js to get started:

```bash
$ npm install -g expo-cli
$ expo init
? Choose a template: (Use arrow keys)
----- Managed workflow -----
❯ blank                 a minimal app as clean as an empty canvas
blank (TypeScript)    same as blank but with TypeScript configuration
tabs                  several example screens and tabs using react-navigation
----- Bare workflow -----
minimal               bare and minimal, just the essentials to get you started
minimal (TypeScript)  same as minimal but with TypeScript configuration
$ npm install
```

<!--
$ npm install --save-dev

$ npm install --save-dev jest
-->

## Running

Running the application is as easy as:

```bash
$ npm run start
```

The command starts a bunch of processes, including a local dashboard running on `localhost:19002`.

The quickest way of viewing the application is by scanning the QR code with your phone and running it on the physical device.

Additionally, you can run the application in a virtual device if you have installed the emulator (Android Studio and avd)

<!-- - Web?
-->

## Building

The Expo platform offers a cloud build service. Compiling an Android package is as easy as:

```bash
$ expo build:android
```

After a few minutes, you’ll find the signed APK from the website, ready to upload to the Play Store.

## Ejecting

The Expo build service is nice but it can get inflexible. I’d like to be able to do End-to-End testing, and manage the project entirely in my CI/CD workflow instead of depending on 3rd parties.

Fortunately, Expo can create native Android and iOS projects that are will feel familiar to mobile developers.

To get these files, we must eject the project. The price we pay is that we no longer can build it from the Expo service:

```bash
$ expo eject
? How would you like to eject your app?
Read more: https://docs.expo.io/versions/latest/expokit/eject/ (Use arrow keys)
❯ Bare: I'd like a bare React Native project.
ExpoKit: I'll create or log in with an Expo account to use React Native and the Expo SDK.
Cancel: I'll continue with my current project structure.
```

Of course, Expo may not be the best alternative for every case: https://docs.expo.io/versions/latest/introduction/why-not-expo/

The `android` directory can be opened by Android Studio. We can compile an APK with gradle and run the project in an emulator as usual.

## Summary

Expo is a nice alternative to full-featured IDEs. We can prototype pretty quickly a mobile project and when it’s time for more serious work. We can get a good Android project.

