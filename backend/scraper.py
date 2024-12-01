from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, ElementNotInteractableException, ElementClickInterceptedException
from bs4 import BeautifulSoup
import requests
import time

class Scraper: 
    def __init__(self): 
        self.urls = {
            "main": "https://spca.bc.ca/",
            "dog": "https://adopt.spca.bc.ca/type/dog/",
            "cat": "https://adopt.spca.bc.ca/type/cat/",
            "amphibian_exotic": "https://adopt.spca.bc.ca/type/amphibian-exotic/",
            "bird_exotic": "https://adopt.spca.bc.ca/type/bird-exotic/",
            "farm_animal": "https://adopt.spca.bc.ca/type/farm-animal/",
            "farm_animal_exotic": "https://adopt.spca.bc.ca/type/farm-animal-exotic/",
            "fish": "https://adopt.spca.bc.ca/type/fish/",
            "horse": "https://adopt.spca.bc.ca/type/horse/",
            "invertebrate": "https://adopt.spca.bc.ca/type/invertebrate/",
            "rabbit": "https://adopt.spca.bc.ca/type/rabbit/",
            "reptile_exotic": "https://adopt.spca.bc.ca/type/reptile-exotic/",
            "small_animal": "https://adopt.spca.bc.ca/type/small-animal/",
            "small_animal_exotic": "https://adopt.spca.bc.ca/type/small-animal-exotic/",
        }


    def fetch_dogs(self): 
        options = webdriver.ChromeOptions()
        options.add_argument("--headless=new")
        driver = webdriver.Chrome(options=options)

        html = ""
        try:
            # load the entire page 
            driver.get('https://adopt.spca.bc.ca/type/dog/')
            wait = WebDriverWait(driver, 5)
            while (True): 
                wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'ajax-load-more-query-button')))
                time.sleep(1) # wait for the button to be clickable. clicking immediately throws ElementNotInteractableException too early
                input_element = driver.find_element(By.CLASS_NAME, 'ajax-load-more-query-button')
                html = driver.page_source
                input_element.click()
        except (TimeoutException, ElementNotInteractableException) as e: 
            print("No more dogs to load.")
        except Exception as e: 
            print(f"Error loading dogs: {e}")
        finally: 
            driver.quit()
        
        # go through each dog 
        dogs_list = self.get_dogs_from_html(html)

        # add to database 

        return dogs_list 


    def get_dogs_from_html(self, html: str) -> list: 
        """Given the string of dog listings page, returns a list of dog listings.""" 
        dogs = []
        soup = BeautifulSoup(html, 'html.parser')
        cards_html = soup.find_all(class_='ybd-sb-pet-card-container')
        for card_html in cards_html: 
            dog_url = card_html.find('a', href=True)['href']
            dog_html = requests.get(dog_url).text
            dog_info = self.get_dog_info_from_html(dog_html)
            dogs.append(dog_info)
        return dogs


    def get_dog_info_from_html(self, html: str) -> dict: 
        """Given the string of a dog's page, returns a dictionary of dog info and adds dog to database."""
        soup = BeautifulSoup(html, 'html.parser')
        images = []

        # images 
        images_html = soup.find_all(class_='ybd-item-container')
        for image_html in images_html: 
            image_html = image_html.find('a', href=True)
            if image_html: 
                image_url = image_html['href']
                images.append(image_url)

        # details 
        info = {}
        info['name'] = soup.find(class_='pet-name').text

        self.add_dog_to_db(info)
        return info


    def add_dog_to_db(self, dog_info: dict): 
        """Adds dog to database."""
        pass