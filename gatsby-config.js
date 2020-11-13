module.exports = {
  siteMetadata: {
    siteTitle: 'Fregram Blog',
    siteDescription:
      'Fregram Blog, unmotivated authors and unfinished projects ...',
    siteImage: '/banner.png', // main image of the site for metadata
    siteUrl: 'https://blog.fregram.com/',
    pathPrefix: '/',
    siteLanguage: 'en',
    ogLanguage: `en_US`,
    author: 'Rassilion', // for example - 'Ivan Ganev'
    authorDescription: '', // short text about the author
    avatar: '/avatar.png',
    twitterSite: '', // website account on twitter
    twitterCreator: '', // creator account on twitter
    social: [
      {
        icon: `github`,
        url: `https://github.com/Rassilion/`
      }
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-theme-chronoblog',
      options: {
        uiText: {
          // ui text fot translate
          feedShowMoreButton: 'show more',
          feedSearchPlaceholder: 'search',
          cardReadMoreButton: 'read more →',
          allTagsButton: 'all tags'
        },
        feedItems: {
          // global settings for feed items
          limit: 50,
          yearSeparator: true,
          yearSeparatorSkipFirst: true,
          contentTypes: {
            links: {
              beforeTitle: '🔗 '
            }
          }
        },
        feedSearch: {
          symbol: '🔍'
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Fregram Blog`,
        short_name: `Fregram`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#3a5f7d`,
        display: `standalone`,
        icon: `src/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-3893406-11'
      }
    },
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
                      'content:encoded': edge.node.html.replace(
                        /<style((.|\n|\r)*?)<\/style>/gi,
                        ''
                      )
                    },
                    {
                      tags:
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
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `fregramblog`
      }
    }
  ]
};
