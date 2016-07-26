Just a test
###########
:date: 2016-07-26 14:00
:tags: test, other
:category: random
:author: CharacterX

For a while, nothing has been written on this blog. Because of that, I forgot how to write. We are using files with .rst extension. I looked it up on the internet and i learnt that it stands for reStructuredText. Wikipedia has some examples on it. Here are some:

Section Header
==============

Subsection Header
-----------------


- A bullet list item
- Second item

  - A sub item

- Spacing between items creates separate lists

- Third item


1) An enumerated list item

2) Second item

   a) Sub item that goes on at length and thus needs
      to be wrapped. Note the indentation that must
      match the beginning of the text, not the 
      enumerator.

      i) List items can even include

         paragraph breaks.

3) Third item

#) Another enumerated list item

#) Second item



We can use images:

.. image:: dafuq.jpg


A sentence with links to Wikipedia_ and the `Linux kernel archive`_.

.. _Wikipedia: http://www.wikipedia.org/
.. _Linux kernel archive: http://www.kernel.org/


Another sentence with an `anonymous link to the Python website`__.

__ https://www.python.org/


::

  some literal text

This may also be used inline at the end of a paragraph, like so::

  some more literal text

.. code:: python

   print("A literal block directive explicitly marked as python code")
