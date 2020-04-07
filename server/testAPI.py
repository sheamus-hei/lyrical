# source: https://bigishdata.com/2016/09/27/getting-song-lyrics-from-geniuss-api-scraping/
# I borrowed this from a blog to data scrape lyrics bc genius API is dumb and doesn't include lyrics the absolute weirdos
import requests
from bs4 import BeautifulSoup

def lyrics_from_url(page_url):
  page = requests.get("https://genius.com/" + page_url)
  html = BeautifulSoup(page.text, "html.parser")
  #remove script tags that they put in the middle of the lyrics
  [h.extract() for h in html('script')]
  #at least Genius is nice and has a tag called 'lyrics'!
  lyrics = html.find("div", class_="lyrics").get_text() #updated css where the lyrics are based in HTML
  lyrics = lyrics.split('\n')
  return lyrics

# if __name__ == "__main__":
#   search_url = "Kendrick-lamar-humble-lyrics"
#   print(lyrics_from_url(search_url))