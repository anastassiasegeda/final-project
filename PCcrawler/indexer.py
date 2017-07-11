#!/usr/bin/python3	indexer.py -d ./LookingGlass 5

import sys
import os
import re
import json
import math
import os.path
import imaplib
import email
import email
from UEAlite import stem_doc # added Oct 2015 DJS

from contextlib import closing
from selenium.webdriver import Firefox # pip install selenium
from selenium.webdriver.support.ui import WebDriverWait


# global declarations for docids, lengths, postings, vocabulary
docids = []
doclength = {}
postings = {}
vocab = []
summary = {}
fulltext = []

def main():
    # code for testing offline
    max_files = 64000;
    if len(sys.argv) == 1:
        print ('usage: ./indexer.py file | -d directory [maxfiles]')
        sys.exit(1)
    elif len(sys.argv) == 2:
        ilename = sys.argv[1]
    elif len(sys.argv) == 3:
        if re.match('-d', sys.argv[1]):
            dirname = sys.argv[2]
            dir_index = True
        else:
            print ('usage: ./indexer.py file | -d directory [maxfiles]')
            sys.exit(1)
    elif len(sys.argv) == 4:
        if re.match('\d+', sys.argv[3]):
            max_files = int(sys.argv[3])
        else:
            print ('usage: ./indexer.py file | -d directory [maxfiles]')
            sys.exit(1)
    else:
        print ('usage: ./indexer.py file | -d directory [maxfiles]')

    if len(sys.argv) == 2:
        index_file(filename)
    elif re.match('-d', sys.argv[1]):
        for filename in os.listdir(sys.argv[2]):
            if re.match('^_', filename):
                continue
            if max_files > 0:
                max_files -= 1
                filename = sys.argv[2]+'/'+filename
                index_file(filename)
            else:
                break
				
			
def index_file(filename):
            
        try:
            input_file = open(filename, 'r')
        except (IOError) as ex:
            print('Cannot open ', filename, '\n Error: ', ex)
        else:
            url = 'http://www.'+filename+'/'
            page_contents = input_file.read() # read the input file            
            #print (url, page_contents)
            make_index(url, page_contents)   
            input_file.close()

    
def clean_html(html):
    """
    Based on clean_html() from NLTK package.
    Remove HTML markup from the given string.
	
    :param html: the HTML string to be cleaned
    :type html: str
    :rtype: str
    
    (from: http://stackoverflow.com/questions/26002076, modified DJS)
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
    cleaned = re.sub(r"\r", " ", cleaned)
    cleaned = re.sub(r"\t", " ", cleaned) # added DJS
    cleaned = re.sub(r"[ ]+", " ", cleaned) # modified DJS
    
    # and blank lines - added DJS
    cleaned = re.sub(r"[ ]*\n", "\n", cleaned)
    cleaned = re.sub(r"\n+", "\n", cleaned)
    
    return cleaned.strip()
	
def write_index_files(n):
	# n can be 0,1
	# declare refs to global variables
	global docids
	global postings
	global vocab
	global doclength
	global  summary
	global fulltext
	# decide which files to open
	# there are 2 sets, written to on alternate calls
	if (n):
		nn = 1
	else:
		nn = 2
	# open files
	out_d = open('data/docids'+str(nn)+'.txt', 'w')
	out_l = open('data/doclength'+str(nn)+'.txt', 'w')
	out_v = open('data/vocab'+str(nn)+'.txt', 'w')
	out_p = open('data/postings'+str(nn)+'.txt', 'w')
	out_s = open('data/fsummary'+str(nn)+'.txt', 'w')
	out_t = open('data/text'+str(nn)+'.txt', 'w')
	# write to index files: docids, vocab, postings
	# use JSON as it preserves the dictionary structure (read/write treat it as a string)
	json.dump(docids, out_d)
	json.dump(doclength, out_l)
	json.dump(vocab, out_v)
	json.dump(postings, out_p, sort_keys=True)
	json.dump(summary, out_s)
	json.dump(fulltext, out_t)
	# close files
	out_d.close()
	out_l.close()
	out_v.close()
	out_p.close()
	out_s.close()
	out_t.close()
	
	d = len(docids)
	v = len(vocab)
	p = len(postings)
	print ('===============================================')
	print ('Indexing: ', d, ' docs ', v, ' terms ', p, ' postings lists written to file')
	print ('===============================================')
	
	return
	
def read_index_files():
    # declare refs to global variables
    global docids
    global postings
    global vocab
    global doclength
    global summary
    global fulltext
    nn = 1

    # reads existing data into index files: docids, lengths, vocab, postings etc

    in_d = open('data/docids'+str(nn)+'.txt', 'r', encoding="utf-8") # may need to add encoding='utf-8' to deal with different default encodings
    in_l = open('data/doclength'+str(nn)+'.txt', 'r', encoding="utf-8")
    in_v = open('data/vocab'+str(nn)+'.txt', 'r', encoding="utf-8")
    in_p = open('data/postings'+str(nn)+'.txt', 'r', encoding="utf-8")
    in_s = open('data/fsummary'+str(nn)+'.txt', 'r', encoding="utf-8")
    in_t = open('data/text'+str(nn)+'.txt', 'r', encoding="utf-8")
    
    docids = json.load(in_d)
    doclength = json.load(in_l)
    vocab = json.load(in_v)
    postings = json.load(in_p)
    summary = json.load(in_s)
    fulltext = json.load(in_t)

    in_d.close()
    in_l.close()
    in_v.close()
    in_p.close()
    in_s.close()
    in_t.close()
    
    return


def make_index(url, page_contents):
    # declare refs to global variables
    global docids		# contains URLs + docids
    global postings		# contains wordids + docids, frequencies
    global vocab		# contains words + wordids
    global doclength	# contains docids + lengths
    global summary      # title + summary + possible date strings
    global fulltext
    print ('===============================================')
    print ('make_index: url = ', url)
    #print ('make_index1: page_text = ', page_text) # for testing

    if(os.path.exists("data/docids1.txt")):#check if there are any docids saved, load the files in
       read_index_files()

       #Because promed is a SPA and its contents are dynamically generated by JS,
       #Instead of crawling the website it crawls messages (containing outbreaks)
       #From an email account
       #Another option is to use Selenium driver, see selenium example.py file
    if(re.findall('promedmail.org', url)):
        #Source: https://gist.github.com/robulouski/7441883
        M = imaplib.IMAP4_SSL('imap.gmail.com')
        rv, data = M.login('EMAIL', 'PASSWORD')

        print(rv, data)

        rv, mailboxes = M.list()
        if rv == 'OK':
            print("Mailboxes:")
            print(mailboxes)

        rv, data = M.select('Inbox')
        if rv == 'OK':
            print("Processing mailbox...\n")

            #rv, data = M.search(None, "ALL") #search(None, '(UNSEEN)')
            rv, data = M.search(None, '(UNSEEN)')
            if rv != 'OK':
                print("No messages found!")
                return

            for num in data[0].split():
                rv, data = M.fetch(num, '(RFC822)')
                if rv != 'OK':
                    print("ERROR getting message", num)
                    return

                msg = email.message_from_bytes(data[0][1])
                hdr = email.header.make_header(email.header.decode_header(msg['Subject']))

                msg = data[0][1]
                msg = msg.decode('utf-8')

                kk  = email.message_from_string(msg)

                #extract header+body as plain text
                for part in kk.walk():       
                    if part.get_content_type() == "text/plain":
                        body = part.get_payload(decode=True) 
                        body = body.decode()
                        body = body.split('See Also')[0]
                        urlp = 'promed'+str(hdr)
                        make_index(urlp, body)

            M.close()
        else:
            print("ERROR: Unable to open mailbox ", rv)
        M.logout()





    ### main steps ###
    # 1. add the url to the doclist (DJS Nov 2015) 
    # 	need to worry about duplicates that only differ in the protocol and www.
    # 	as these are not picked up by the crawler
    #
    # TBD 2016 solution replace with urlllib.parse
    domain_url = url
    if (re.search('https:..', url)):	# match and remove https://
        domain_url = re.sub('https://', '', url)
    elif (re.search('http:..', url)):	# match and remove http://
        domain_url = re.sub('http://', '', url)
    else:
        print ("make_index: no match for protocol url=", url)
        
    if (re.search('www\.', domain_url)):	# match and remove www.
        domain_url = re.sub('www\.', '', domain_url)
    
    #print ("\n make_index5 domain_url=", domain_url, '\n')
    
    ### append the url to the list of documents
    if (domain_url in docids): # return if we've seen this before
        return
    else:
        docids.append(domain_url)			# add url to docids table
        docid = docids.index(domain_url)	# get the docid
    print(docid)

    if (isinstance(page_contents, bytes)): # convert bytes to string if necessary
        page_contents = page_contents.decode('utf-8', 'ignore') # was decode('utf-8')
        
    words = clean_html(page_contents)
    splitText = words.split("\n")
    fulltext.append(" ".join(splitText));

    sentences = []
    dates = []

    for phrase in splitText:
        if(phrase.endswith('.') and not(re.findall('promed', url))):
            if(phrase not in sentences):
                if(phrase.count('.')>1):#check number of DOTS - split if more than 1 into sentences
                    p = phrase.split('.')
                    for p1 in p:
                        p1 = p1+'.'
                        sentences.append(p1)
                else:
                    sentences.append(phrase)

        if(re.search(r'\d', phrase)):
            if(phrase not in dates):
                sent = phrase.split('.')
                for p in sent:
                    numbers = sum(c.isdigit() for c in p)
                    if(numbers > 5):#>5 because it can be 20 March 2017 (6 digits), 20/03/2017 (8 digits) etc)
                        p = re.sub(r",", r"", p)#remove commas
                        if (not p in dates):
                            dates.append(p)

    for s in sentences:#remove some entries (empty string or only dot)
        if(len(s) < 2):
            sentences.remove(s)

    for d in dates:#remove some entries (empty string or only dot)
        if(len(d) < 2):
            dates.remove(d)


    #Find titleof the outbreak, specific for each website
    title = 'Title not found'       
    if(re.findall('who', domain_url)):
        title = re.findall('<h1.*?>(.+?)</h1>', page_contents)
       # print(title)
    elif(re.findall('promed', domain_url)):
        if(re.findall('>', url)):
            title = url.split('> ')[1]
        else:
            title = url.split('promed')[1]
        #print(title)
    elif(re.findall('wwwnc', domain_url)):
        title = re.findall('<h1.*?>(.+?)</h1>', page_contents)
       # print(title)

    if(re.findall('promed', url)):
        k = " ".join(splitText)
        summary[docid] = ({'title':title, 'sentences':k, 'dates': dates})
    else:
        summary[docid] = ({'title':title, 'sentences':sentences, 'dates': dates})

    ###################################################
    #############stemming##############################
    words = re.sub(r"(\w)'s", r"", words)# remove apostrophes
    words = re.sub(r",", r"", words)#remove commas
    words = re.sub(r"\.", r"", words)#remove dots
    words = re.sub(r"\?", r"", words)#remove ?
    words = re.sub(r";", r"", words)#remove ;
    words = re.sub(r":", r"", words)#remove :
    words = re.sub(r"\*", r"", words)#remove )
    words = re.sub(r"\(", r"", words)#remove (
    words = re.sub(r"\)", r"", words)#remove )
    #####  end of stemming and other processing   #####
    ###################################################

    # split the words string into a list of words
    wordlist = words.split()

    # store doclength
    doclength[docid] = len(wordlist)

    # add the vocab counts and postings
    for word in wordlist:
        # is the word in the vocabulary
        if (word in vocab):
            wordid = vocab.index(word)
        else:
            vocab.append(word)
            wordid = vocab.index(word)
        
        wordid = str(wordid)
        docid = str(docid)

        if (not wordid in postings):
            postings[wordid] = {}
        if (not docid in postings[wordid]):
            postings[wordid][docid] = wordlist.count(word)    
    write_index_files(1)
    return
# Standard boilerplate to call the main() function
if __name__ == '__main__':
    main()

    #python PCcrawler.py wwwnc.cdc.gov/travel/notices https://wwwnc.cdc.gov/travel/notices 100
    #python PCcrawler.py www.who.int http://www.who.int/csr/don/archive/country/en/ 100
    #python PCcrawler.py promedmail.org/post http://www.promedmail.org
