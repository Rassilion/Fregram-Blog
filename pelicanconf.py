#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Rassilion'
SITENAME = u"Fregram Blog"
SITEURL = 'http://fregram.com/'
THEME = 'pelican-octopress-theme'
PATH = 'content'
FAVICON_FILENAME = 'favicon.ico'

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG = u'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = 'feeds/%s.atom.xml'

STATIC_PATHS = [
    'favicon.ico',
    'images',
    'extra/CNAME'
]

EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},}



PLUGIN_PATHS = ['pelican-plugins']
PLUGINS = ['summary','sitemap']

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

GITHUB_USER = 'rassilion'
GITHUB_REPO_COUNT = 5
GITHUB_SKIP_FORK = False
GITHUB_SHOW_USER_LINK = False

# RSS/Atom feeds
FEED_DOMAIN = SITEURL
FEED_ATOM = 'atom.xml'

AUTHORS_SAVE_AS = 'authors.html'
CATEGORIES_SAVE_AS = 'categories.html'
TAGS_SAVE_AS = 'tags.html'

SITEMAP = {
        'format': 'xml',
        'priorities': {
            'articles': 0.5,
            'indexes': 0.5,
            'pages': 0.5
        },
        'changefreqs': {
            'articles': 'monthly',
            'indexes': 'daily',
            'pages': 'monthly'
        }
    }
