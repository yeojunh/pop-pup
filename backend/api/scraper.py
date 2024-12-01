from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, ElementNotInteractableException, ElementClickInterceptedException
from bs4 import BeautifulSoup
import requests
from datetime import date, timedelta
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


    # doesn't work on vercel, might have to run locally only
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
            print("Loaded all dogs.")
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
            dog_info['url'] = dog_url
            dogs.append(dog_info)
        return dogs


    def get_dog_info_from_html(self, html: str) -> dict: 
        """Given the string of a dog's page, returns a dictionary of dog info and adds dog to database."""
        soup = BeautifulSoup(html, 'html.parser')
        info = self.initialize_info()
        images = []
        compatibility = self.initialize_compatibility()

        # images 
        images_html = soup.find_all(class_='ybd-item-container')
        for image_html in images_html: 
            image_html = image_html.find('a', href=True)
            if image_html: 
                image_url = image_html['href']
                images.append(image_url)

                # check if in foster or long term resident - they are not in the compatibility section
                flag_html = image_html.find(class_='infoster')
                if flag_html is None: 
                    continue
                foster_html = flag_html['src']
                if 'in-foster-flag' in foster_html:
                    compatibility['in_foster'] = 'Yes'
                elif 'long-term-flag' in foster_html:
                    compatibility['longterm_resident'] = 'Yes'
        info['images'] = images

        # name and description
        info['name'] = soup.find(class_='pet-name').text
        description_htmls = soup.find(class_='ybd-sb-content').find_all('p')
        for description_html in description_htmls: 
            info['description'] += description_html.text

        # about me
        details_htmls = soup.find_all(class_='ybd-sb-pet-details-block')
        about_htmls = details_htmls[0].find('ul').find_all('li')
        for about_html in about_htmls: 
            texts = about_html.find_all(text=True)
            if len(texts) < 2: 
                continue
            key = self.get_info_key(texts[0].strip())
            value = texts[1].strip()
            if key is None or value is None:
                continue
            info[key] = value
        info['since'] = date.today() - timedelta(int(info['since']))
        info['breed'] = self.parse_breed(info['breed'])
        info['colour'] = self.parse_colour(info['colour'])

        # compatibility 
        compatibility_htmls = details_htmls[1].find('ul').find_all('li')
        for compatibility_html in compatibility_htmls: 
            icon_html = compatibility_html.find('img')
            icon_text = icon_html['alt']
            icon_url = icon_html['src']
            key = self.get_compatibility_key(icon_text.strip())
            value = self.get_compatibility_value(icon_url)
            if key is None or value is None: 
                continue
            compatibility[key] = value
        if 'no_other_animals' in compatibility: 
            compatibility['ok_with_cats'] = 'No'
            compatibility['ok_with_dogs'] = 'No'
            del compatibility['no_other_animals']
        info['compatibility'] = compatibility

        self.add_dog_to_db(info)
        return info


    def get_compatibility_key(self, text: str) -> str:
        labels = {
            'Featured Animal': 'featured_pet',
            'Staff Pick': 'staff_pick',
            'House Trained': 'house_trained', 
            'Indoor Only': 'indoor_only',
            'Indoor / Outdoor': 'indoor_outdoor',
            'OK With Dogs': 'ok_with_dogs',
            'No Dogs': 'ok_with_dogs',
            'OK With Cats': 'ok_with_cats',
            'No Cats': 'ok_with_cats',
            'Lived With Kids': 'lived_with_kids',
            'No Small Children': 'lived_with_kids',
            'No Other Animals': 'no_other_animals',
            'Special Needs': 'special_needs',
            'Not Compatible With Livestock': 'ok_with_livestock',
        }

        if text in labels:
            return labels[text]


    def get_compatibility_value(self, text: str) -> str: 
        warning = "https://adopt.spca.bc.ca/wp-content/themes/adopt-theme/img/compat-warning.png"
        checkmark = "https://adopt.spca.bc.ca/wp-content/themes/adopt-theme/img/compat-checkmark.png"
        indoor_outdoor = "https://adopt.spca.bc.ca/wp-content/themes/adopt-theme/img/compat-indoor_outdoor.png"
        staff_pick = "https://adopt.spca.bc.ca/wp-content/themes/adopt-theme/img/compat-staff_pick.png"

        if text == warning: 
            return 'No'
        elif text == checkmark or text == indoor_outdoor or text == staff_pick: 
            return 'Yes'


    def get_info_key(self, text: str) -> str: 
        """
        Given a text, returns the info key of the detail.
        I am not sure if the detail is always in the same order. 
        This function is to ensure that the key is order-agnostic.
        """
        labels = {
            'Days in care:': 'since',
            'Approximate age:': 'age',
            'Pet Type:': 'pet_type',
            'Breed:': 'breed',
            'Colour:': 'colour',
            'Weight:': 'weight',
            'Sex:': 'sex',
            'Location:': 'location',
            'Animal ID:': 'id',
        }
        
        if text in labels: 
            return labels[text]


    def initialize_info(self): 
        return {
            'name': '',
            'description': '',
            'since': 0, 
            'age': 0,
            'pet_type': '',
            'breed': '',
            'colour': '',
            'weight': 0,
            'sex': '',
            'location': '',
            'id': 0,
            'compatibility': [],
            'url': '',
            'date_created': date.today(),
        }


    def initialize_compatibility(self): 
        return {
            'featured_pet': 'No',
            'staff_pick': 'No',
            'longterm_resident': 'No',
            'special_needs': 'No',
            'house_trained': 'Unknown',
            'indoor_only': 'Unknown',
            'indoor_outdoor': 'Unknown',
            'lived_with_kids': 'Unknown',
            'ok_with_cats': 'Unknown',
            'ok_with_dogs': 'Unknown',
            'special_fee': 'Unknown',
            'ok_with_livestock': 'Unknown',
        }

    
    def parse_breed(self, breed: str) -> list: 
        breeds = breed.split(' / ')
        return breeds 

    def parse_colour(self, colour: str) -> list: 
        colours = colour.split(' / ')
        return colours

    def add_dog_to_db(self, dog_info: dict): 
        """Adds dog to database."""
        pass