#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *

SITEURL = 'http://blog.fregram.com'
RELATIVE_URLS = False


DELETE_OUTPUT_DIRECTORY = True

# Following items are often useful when publishing

DISQUS_SITENAME = "fregramblog"
GOOGLE_UNIVERSAL_ANALYTICS = "UA-3893406-11"
GOOGLE_ANALYTICS_DISPLAY_FEATURES=False
GOOGLE_UNIVERSAL_ANALYTICS_COOKIEDOMAIN="auto"
