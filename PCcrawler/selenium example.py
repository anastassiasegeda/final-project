#!/usr/bin/env python
from contextlib import closing
from selenium.webdriver import Firefox # pip install selenium
from selenium.webdriver.support.ui import WebDriverWait


def main():
    url = "http://www.promedmail.org/post/498"

    # use firefox to get page with javascript generated content
    #downside - opens Firefox browser for every document (link) - slow
    with closing(Firefox()) as browser:
        browser.get(url)
        # wait for the page to load
        WebDriverWait(browser, timeout=3).until(
            lambda x: x.find_element_by_id('preview'))
     # store it to string variable
        page_source = browser.page_source
    print(page_source.encode('utf-8'))


if __name__ == '__main__':
    main()