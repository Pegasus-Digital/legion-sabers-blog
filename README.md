# Next.js + Payload monorepo starter

This code was cloned from the official public demo of [Payload CMS](https://github.com/payloadcms/payload) and changed to accomodate [Pegasus](https://github.com/pegasus-digital) patterns.

Use this code to start websites, blogs, or applications that need a CMS. This repo includes a fully-working backend, admin panel, and a beautifully designed, production-ready frontend.

- [Next.js + Payload](#nextjs--payload-monorepo-starter)
  - [Quick Start](#quick-start)
    - [Clone](#clone)
      - [Local installation steps:](#local-installation-steps)
      - [Running on a Server:](#running-on-a-server)
  - [Stack](#stack)
    - [Next.js](#nextjs-front-end)
    - [PayloadCMS](#payload-back-end)
      - [Collections](#collections)
      - [Globals](#globals)
  - [Features](#features)
    - [Access control](#access-control)
    - [Premium Content](#premium-content)
    - [Comments](#comments)
    - [Layout Builder](#layout-builder)
    - [Draft Preview](#draft-preview)
    - [SEO Plugin](#seo)
    - [Redirects](#redirects)

## Quick Start

To spin up this example locally or on a server, follow these steps:

### Clone

You can clone this repo to your own computer/server and play around super easily.

To do so, you'll need the following software:

- Yarn or NPM - **yarn may be easier to set up because it solves packages conflicts easier**
- NodeJS version 10+
- A MongoDB Database - **IMPORTANT: you need to have MongoDB running locally, or in a server in order to test this repo locally.**

#### Local installation steps:

**1. Clone the repo by running the following command at your terminal:**

```bash
git clone git@github.com:pegasus-digital/next-payload-mono
```

**2.Navigate to folder and install dependencies**

Type `cd ./next-payload-mono` and then `yarn install` to add all required dependencies.

**3.Duplicate the example `.env` file and fill in your own values**

Type `cp .env.example .env` in your terminal to make a copy of the example `.env` file, and then edit that file to fill in your own values.

Typically, the only line that you'll need to change within your new `.env` for local development is the `DATABASE_URI` value.

**4.Fire up the development server**

Finally, type `yarn dev` to start up the server and see it in action!

#### Running on a Server

**1.Same steps as above up until No.3**

On your server terminal, you should follow the same steps as above, cloning the repo and changing enviroinment variables to your own, after that you are ready to continue in the next step.

**2.Build and Serve**

Type `yarn build` in the terminal, following by `yarn serve`.

This should fire up the server and host it under the `SERVER_URL` variable `.env` if you have setted up the DNS correctly.

**3.Process Manager**

Use a process manager such as [PM2](https://pm2.keymetrics.io/) to keep the expresss server running on the machine.

## Stack

### Next.js Front-end

Designed with the [Pegasus-ui]() package, this repo includes a production-ready front-end built with the [Next.js App Router](https://nextjs.org), served right alongside Payload in a single Express server. This makes is so that it can be deployed simultaneously and host them in a single server instance.

- [App Router](https://nextjs.org)
  - Next.js version: ^14
- [Pegasus UI](https://pegasusds.com.br)
  - Using Pegasus Components Library
- [GraphQL](https://graphql.org)
  - GraphQL queries for interfacing with the back-end
- [TypeScript](https://www.typescriptlang.org)
  - Fully type-safe
- [Tailwind](https://www.tailwindcss.com)
- [Payload Admin Bar](https://github.com/payloadcms/payload-admin-bar)
  - For use in [Draft Mode](#draft-preview)
- Autentication
  - Based on payloadCMS users

### Payload Back-end

The PayloadCMS config is tailored specifically to the needs of most websites. This project is pre-configured in the following ways:

#### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- ##### Users (Authentication)

  Users are auth-enabled and encompass both admins and regular users based on the value of their `roles` field. Only `admin` users can access your admin panel to manage your website whereas `user` can authenticate on your front-end to leave [comments](#comments) and read [premium content](#premium-content) but have limited access to the platform. See [Access Control](#access-control) for more details.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- ##### Posts

  Posts are used to generated blog posts, news articles, or any other type of content that is published over time. All posts are layout builder enabled so you can generate unique layouts for each post using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Posts are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

  Users can also leave comments on posts if they are logged in. Then, editors can log in to review and approve comments before they are published. See [Comments](#comments) for more details.

  Posts can also restrict access to content or digital assets behind authentication, see [Premium Content](#premium-content) for more details.

- #### Comments (Collection)

  Comments are used to allow logged-in users to leave comments on posts. Comments are draft-enabled so admins can review and approve them before they are published to your website, see [Comments](#comments) for more details.

- ##### Projects

  Projects are used to showcase your work. All projects are layout builder enabled so you can generate unique layouts for each project using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Projects are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

- ##### Pages

  All pages are layout builder enabled so you can generate unique layouts for each page using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Pages are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

- ##### Media

  This is the uploads enabled collection used by pages, posts, and projects to contain media like images, videos, downloads, and other assets.

- ##### Categories

  A taxonomy used to group posts or projects together. Categories can be nested inside of one another, for example "News > Technology". See the official [Payload Nested Docs Plugin](https://payloadcms.com/docs/plugins/nested-docs) for more details.

#### Globals

See the [Globals](https://payloadcms.com/docs/configuration/globals) docs for details on how to extend this functionality.

- `Header`

  The data required by the header on your front-end like nav links.

- `Footer`

  Same as above but for the footer of your site.

## Features

### Access control

Basic role-based access control is setup to determine what users can and cannot do based on their roles, which are:

- `admin`: They can access the Payload admin panel to manage your site. They can see all data and make all operations.
- `user`: They cannot access the Payload admin panel and can perform limited operations based on their user (see below).

This applies to each collection in the following ways:

- `users`: Only admins and the user themselves can access their profile. Anyone can create a user but only admins can delete users.
- `posts`: Everyone can access published posts, but only admins can create, update, or delete them. Some posts may also have content that is only accessible to users who are logged in. See [Premium Content](#premium-content) for more details.
- `projects`: Everyone can access published projects, but only admins can create, update, or delete them.
- `pages`: Everyone can access published pages, but only admins can create, update, or delete them.
- `comments`: Everyone can access published comments, but only admins can access draft comments. Users can create new comments but they will be saved as drafts until an admin approves them.

For more details on how to extend this functionality, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs.

### Premium Content

Posts can optionally restrict access to content or digital assets behind authentication. This will ensure that only members of your site can access the full post data and its resources. To do this, a `premiumContent` field is added to the `posts` collection with `read` access control set to check for an authenticated user on the request. Every time a user requests a post, this will only return data to those who have access to it:

```ts
{
  name: 'premiumContent',
  label: 'Premium Content',
  type: 'blocks',
  access: {
    read: isLoggedIn,
  },
  fields: [
    // content
  ]
}
```

### Comments

Users can leave comments on posts for editors to review and approve before they are published to the website. To do this, a `comments` collection is added with `drafts` set to `true` so that all comments are saved as drafts and inaccessible until an admin approves them. Each comment references a single `user` and a `doc` for cross reference. To leave a comment you must be logged-in, and to publish a comment you must has the role `admin`.

### Layout Builder

Create unique page, post, or project layouts for any type of content using a powerful layout builder. This repo comes pre-configured with the following layout building blocks:

- Hero
- Content
- Media
- Call To Action

### Draft Preview

All posts, projects, and pages are draft-enabled so you can preview them before publishing them to your website. To do this, these collections use [Versions](https://payloadcms.com/docs/configuration/collections#versions) with `drafts` set to `true`. This means that when you create a new post, project, or page, it will be saved as a draft and will not be visible on your website until you publish it. This also means that you can preview your draft before publishing it to your website. To do this, we automatically format a custom URL which redirects to your front-end to securely fetch the draft version of your content.

Since the front-end of this demo is statically generated, this also means that pages, posts, and projects will need to be regenerated as changes are made to published documents. To do this, we use an `afterChange` hook to regenerate the front-end when a document has changed and its `_status` is `published`.

For more details on how to extend this functionality, see the official [Draft Preview Example](https://github.com/payloadcms/payload/tree/main/examples/draft-preview).

### SEO

This demo comes pre-configured with the official [Payload SEO Plugin](https://github.com/payloadcms/plugin-seo) for complete SEO control from the admin panel. All SEO data is fully integrated into the front-end website that comes with this demo. See [Website](#website) for more details.

### Redirects

If you are migrating an existing site or moving content to a new URL, you can use the `redirects` collection to create a proper redirect from old URLs to new ones. This will ensure that proper request status codes are returned to search engines and that your users are not left with a broken link. This demo comes pre-configured with the official [Payload Redirects Plugin](https://github.com/payloadcms/plugin-redirects) for complete redirect control from the admin panel. All redirects are fully integrated into the front-end website that comes with this demo. See [Website](#website) for more details.

### Cache

Although Next.js includes a robust set of caching strategies out of the box, Payload Cloud proxies and caches all files through Cloudflare using the [Official Cloud Plugin](https://github.com/payloadcms/plugin-cloud). This means that Next.js caching is not needed and is disabled by default. If you are hosting your app outside of Payload Cloud, you can easily reenable the Next.js caching mechanisms by removing the `no-store` directive from all fetch requests in `./src/app/_api` and then removing all instances of `export const dynamic = 'force-dynamic'` from pages files, such as `./src/app/(pages)/[slug]/page.tsx`. For more details, see the official [Next.js Caching Docs](https://nextjs.org/docs/app/building-your-application/caching).
