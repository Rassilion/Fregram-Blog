---
title: Gatsby Update!
slug: gatsby-update
date: 2020-11-13
tags: ['project', 'gatsby', 'blog', 'finished' ]
category: project 
author: Rassilion 
description: OMG Finally completed something 
---

After all these years, Finally a meaningful post. Not a markdown cheat-sheet, not a teaser/update about forgotten half completed project (although ["teaser" project](../new-post-teaser) had three upgrades after that post, I never find time to write about.) With this post again I'm plaining to motivate myself to write regularly, hopefully this time I will be successful. So let's start.

# Why Change? Why Gatsby?
Old blog was based off [Pelican Static Site Generator](https://blog.getpelican.com/) (Old Blog source can be found in the [source branch](https://github.com/Rassilion/Fregram-Blog/tree/source)). I don't used much but it was rock solid, after 3 years still working and in usable form. Although I'm not sure what can go wrong in a static site but, you'll never know.

So why the change? Mainly to write this post. Also old style was getting really old, I didn't change much but new style look minimal and modern I think? (I'm not good at designing). Another problem was that I haven't dealt with python in a long time, and I'm not motivated to edit 4-5 year old python project. So as a solution decided to move blog something new. For a small project (of course half completed project) I played with [Hugo](https://gohugo.io/), It was really fast as claimed but Go was not for me. Then I saw [Gatsby](https://www.gatsbyjs.com/) a new Hype in the static site scene (like 2 years ago), It had every popular buzz word at the time *React*, *performance*, *scalability*. I was ready to join Hype-Train and play with Gatsby but there was no opportunity (AKA to lazy to do hobby projects). But now I'm ready to join. Also at work I'm using Typescript and React so it was easy to join on train (probably the main reason) 

# How?
I'm not going to write as detailed a tutorial, cause Gatsby has enough documents and tutorials. Only going to explain some tips and tricks I used.

### Theme/Starter
I used [Gatsby Starter Chronoblog](https://github.com/Chronoblog/gatsby-theme-chronoblog) template with minimal edits. With shadowing and override features, It was fairly easy.

### Multiple Authors (sort of)
Old blog was combined effort with my friend, I think there is only 1 post from him but I wanted to preserve it.

first we need to add `author` field to  post frontmatter. So override `postQuery` in post template with creating `src\gatsby-theme-chronoblog\templates\post.js` file

```js
import { graphql } from 'gatsby';

import Post from 'gatsby-theme-chronoblog/src/components/post';

export default Post;

export const postQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      excerpt
      frontmatter {
        category
        author
        title
        date
        description
        tags
        cover {
          childImageSharp {
            fluid(maxWidth: 768, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
              presentationWidth
              presentationHeight
              src
            }
            resize(width: 768) {
              src
            }
          }
        }
      }
      fields {
        slug
      }
      body
    }
  }
`;
```

Now we have author metadata but we need to display it in website, For this Chronoblog has a `post-footer.mdx`.

create post-footer component in `src\gatsby-theme-chronoblog\post-footer.mdx`. Then we can easily access global site configuration and post data from component props. So I added a hack with default Chronoblog components, if post has different author than site author it displays author name from post frontmatter, else it's uses beautiful default `AuthorBanner` component from Chronoblog. Of course with this approach guest authors banner pretty dull looking but for now its good enough.

```jsx
<div>
{props.postData.frontmatter.author && 
props.postData.frontmatter.author !== props.siteMetadata.author ? 
    <AuthorBanner>
        <div>
            <AuthorBannerHeading>{props.postData.frontmatter.author}</AuthorBannerHeading>
        </div>
    </AuthorBanner>
    :
    <AuthorBanner></AuthorBanner>
}</div>
```

### Disqus comments
I think there better solutions but old blog was using and I'm to lazy to migrate 4 old comments to a new system.

There a plugin `gatsby-plugin-disqus`

add disqus to plugins configuration in `gatsby-config.js`
```js
plugins: [
    ...,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `yourshortname`
      }
    }
]
```

then add `Disqus` component to post-footer component in `src\gatsby-theme-chronoblog\post-footer.mdx` to show comments

```jsx
import { Disqus } from 'gatsby-plugin-disqus';

<Disqus
config={{
url: props.siteMetadata.siteUrl + props.postData.fields.slug,
title: props.postData.frontmatter.title,
id: props.postData.id
}}
/>
```

### Travis auto build and deploy to github pages
>Automation is god send!

First we need ghpages tool, run `npm install gh-pages --save-dev` in project dir to add it. Then a deploy script for Travis, we can use npm scripts

add this to `scripts` in `package.json` (of course update repo url to your repo)
```js
    "travis-deploy": "gatsby build --prefix-paths && gh-pages -d public -r https://$GH_TOKEN@{yourgitrepo}",
```

then create a `travis.yml`
```yml
language: node_js
before_script:
  - npm install -g gatsby-cli
node_js:
  - "10"
deploy:
  provider: script
  script: npm i --quiet && npm run travis-deploy
  skip_cleanup: true
  on:
    branch: v2
```

We are ready to connect our repo to travis. After connecting repo don't forget to add your github auth token `GH_TOKEN` in Travis Environment Variables settings. Then we are done, now every time you push a change to repo travis will build and push to gh-pages branch.

### Dev.to cross posting dream
>Yeah I don't post much, but I want those sweet views.

So Dev.to supports RSS import, It should be easy right? No It won't easy. Because of code highlighting or Chronoblog theme; RSS html output is full off inline styles, so Dev.to's html to markdown converter freaks out and displays bunch of empty html tags in markdown. To fix it first I tried to give raw markdown output in RSS but rendering `mdx` pain in the butt and also looks like Dev.to only supports html in RSS. So for now I removed `style` tags and css classes from html output, yeah probably it will break RSS readers but who is using them? (a controversial topic maybe?)

of course gatsby has RSS feed plugin

add RSS feed plugin plugins configuration in `gatsby-config.js`
```js
{
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
            {
              site {
                siteMetadata {
                  siteTitle
                  siteDescription
                  siteUrl
                  site_url: siteUrl
                  description siteDescription
                  title: siteTitle
                }
              }
            }
          `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  author: edge.node.frontmatter.author,
                  title: edge.node.frontmatter.title,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    {
                      'content:encoded': edge.node.html
                        .replace(/<style((.|\n|\r)*?)<\/style>/gi, '')
                        .replace(/class="(.*?)"/gi, '')
                    },
                    {
                      tags:
                        edge.node.frontmatter.tags &&
                        edge.node.frontmatter.tags.join(',')
                    },
                    {
                      category:
                        edge.node.frontmatter.tags &&
                        edge.node.frontmatter.tags.join(',')
                    }
                  ]
                });
              });
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { fields: { type: { eq: "posts" } } }
                ) {
                    edges {
                        node {
                            excerpt
                            html
                          id
                          fields {
                            slug
                            type
                          }
                          frontmatter {
                            author
                            title
                            date
                            link
                            draft
                            tags
                          }
                          body
                        }
                      }
                    
                }
              }
              `,
            output: '/rss.xml',
            title: `Fregram Blog`
          }
        ]
      }
    }
```

Probably half of tags in the RSS is useless but I did not found a good document about it, so left all of them. Main magic happens in `serialize` function using regex replace removes style tags and css classes from html, If you have a working configuration you only need to add this change.

```js
edge.node.html
    .replace(/<style((.|\n|\r)*?)<\/style>/gi, '')
    .replace(/class="(.*?)"/gi, '')
```

also for tags support you need to comma separated list so add these too

```js
{
tags:
    edge.node.frontmatter.tags &&
    edge.node.frontmatter.tags.join(',')
},
{
category:
    edge.node.frontmatter.tags &&
    edge.node.frontmatter.tags.join(',')
}
```


# In Conclusion
>Everything is better and I'm happy

To tell the truth it's not much different from old Pelican setup, maybe more modern. Like with `mdx` and shadowing gatsby look more easy to customize, but as a `Static Website Generator` I think they are same. Of course if you are using or interested in React and graphql (although you don't see react much, it's mostly hidden especially using themes) it's good weekend project. 
