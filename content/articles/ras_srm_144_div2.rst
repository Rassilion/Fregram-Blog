TC SRM144 DIV2 200pts Python
#############################

:date: 2014-03-15 22:28
:tags: topcoder, python, srm, 200, point
:category: TopCoder
:author: Rassilion

Problem wants us to convert seconds integer to Hour:Minute:Second string format.

.. code-block:: python

	#class, function names and variables were given in the problem.
	class Time(object):
	def whatTime(self, seconds):
		#I divided seconds by 3600 because 1 hour is 3600 second.
		h = seconds / 3600
		#I divided remaining from hour by 60
		m = (seconds % 3600) / 60
		#I find remaining from seconds division by 60 because everything that can be divisible by 60 will be used by hour and minute
		s = (seconds % 60)
		#Put them in H:M:S string format
		return str(h)+":"+str(m)+":"+str(s)