#!/usr/bin/python3 -tt

import re
import sys


def clean_html(html):
# from: http://stackoverflow.com/questions/26002076, modified DJS
    """
    Copied from NLTK package.
    Remove HTML markup from the given string.

    :param html: the HTML string to be cleaned
    :type html: str
    :rtype: str
    """
    # First we remove inline JavaScript/CSS:
    cleaned = re.sub(r"(?is)<(script|style).*?>.*?(</\1>)", "", html.strip())
    # Then we remove html comments. This has to be done before removing regular
    # tags since comments can contain '>' characters.
    cleaned = re.sub(r"(?s)<!--(.*?)-->[\n]?", "", cleaned)
    # Next we can remove the remaining tags:
    cleaned = re.sub(r"(?s)<.*?>", " ", cleaned)
    # Deal with whitespace
    cleaned = re.sub(r"&nbsp;", " ", cleaned)
    cleaned = re.sub(r"\t", " ", cleaned) # added DJS
    cleaned = re.sub(r"[ ]+", " ", cleaned) # modified DJS
    # and blank lines - added DJS
    cleaned = re.sub(r"[ ]*\n", "\n", cleaned)
    cleaned = re.sub(r"\n+", "\n", cleaned)
    
    return cleaned.strip()

def main():
  if len(sys.argv) != 2:
    print ('usage: ./clean.py file')
    sys.exit(1)

  filename = sys.argv[1]
  try:
    input_file = open(filename, 'r')
  except (IOError) as ex:
    print('Cannot open ', filename, '\n Error: ', ex)
  else:
    html = input_file.read()
    #if (isinstance(html, bytes)): # convert bytes to string if necessary
    #  html = html.decode('utf-8')
    cleaned = clean_html(html)
    
    m = re.search('\w+', filename)
    outfile = m.group()
    if outfile:
      output_file = open(outfile+ '.txt', 'w')
    else:
      output_file = open('cleaned.txt', 'w')
    
    print(cleaned, file=output_file)
  finally:
  	input_file.close()
    
    
if __name__ == '__main__':
  main()
