from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, ElementNotInteractableException, ElementClickInterceptedException
from bs4 import BeautifulSoup
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime
import time
import re
import os

class Scraper: 
    def __init__(self): 
        temp_file = '/tmp/google_application_credentials.json'
        f = open(temp_file, "w")
        f.write(os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_RAW'))
        f.close()
        cred = credentials.Certificate(temp_file)
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()
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


    def fetch_all_animals(self):
        all_animals = []
        all_animals.extend(self.fetch_animal(self.urls['dog'], 'dog'))
        all_animals.extend(self.fetch_animal(self.urls['cat'], 'cat'))
        all_animals.extend(self.fetch_animal(self.urls['amphibian_exotic'], 'exotic amphibian'))
        all_animals.extend(self.fetch_animal(self.urls['bird_exotic'], 'exotic bird'))
        all_animals.extend(self.fetch_animal(self.urls['farm_animal'], 'farm animal'))
        all_animals.extend(self.fetch_animal(self.urls['farm_animal_exotic'], 'exotic farm animal'))
        all_animals.extend(self.fetch_animal(self.urls['fish'], 'fish'))
        all_animals.extend(self.fetch_animal(self.urls['horse'], 'horse'))
        all_animals.extend(self.fetch_animal(self.urls['invertebrate'], 'invertebrate'))
        all_animals.extend(self.fetch_animal(self.urls['rabbit'], 'rabbit'))
        all_animals.extend(self.fetch_animal(self.urls['reptile_exotic'], 'exotic reptile'))
        all_animals.extend(self.fetch_animal(self.urls['small_animal'], 'small animal'))
        all_animals.extend(self.fetch_animal(self.urls['small_animal_exotic'], 'small exotic animal'))
        return all_animals


    def fetch_dogs(self): 
        return self.fetch_animal(self.urls['dog'], 'dog')


    def fetch_cats(self): 
        return self.fetch_animal(self.urls['cat'], 'cat')


    def fetch_other_animals(self): 
        animals = []
        animals.extend(self.fetch_animal(self.urls['amphibian_exotic'], 'exotic amphibian'))
        animals.extend(self.fetch_animal(self.urls['bird_exotic'], 'exotic bird'))
        animals.extend(self.fetch_animal(self.urls['farm_animal'], 'farm animal'))
        animals.extend(self.fetch_animal(self.urls['farm_animal_exotic'], 'exotic farm animal'))
        animals.extend(self.fetch_animal(self.urls['fish'], 'fish'))
        animals.extend(self.fetch_animal(self.urls['horse'], 'horse'))
        animals.extend(self.fetch_animal(self.urls['invertebrate'], 'invertebrate'))
        animals.extend(self.fetch_animal(self.urls['rabbit'], 'rabbit'))
        animals.extend(self.fetch_animal(self.urls['reptile_exotic'], 'exotic reptile'))
        animals.extend(self.fetch_animal(self.urls['small_animal'], 'small animal'))
        animals.extend(self.fetch_animal(self.urls['small_animal_exotic'], 'small exotic animal'))
        return animals


    def add_default_animal(self): 
        animal_info = self.initialize_info()
        animal_info['compatibility'] = self.initialize_compatibility()
        self.add_animal_to_db(animal_info)


    def retrieve_default_animal_from_db(self) -> dict:  
        animal = self.retrieve_animal_from_db('0000')
        return animal


    def add_test_animal(self):
        animal = self.initialize_info()
        animal['compatibility'] = self.initialize_compatibility()
        animal['name'] = 'Ginger'
        animal['description'] = 'Meet Ginger! He\'s a stinky dog who loves to play fetch.'
        animal['since'] = datetime.datetime.now(tz=datetime.timezone.utc) - datetime.timedelta(10)
        animal['age'] = 5
        animal['pet_type'] = 'Dog'
        animal['breed'] = ['Labrador Retriever', 'Beagle']
        animal['colour'] = ['Yellow', 'White']
        animal['weight'] = '50 lbs'
        animal['sex'] = 'Male'
        animal['location'] = 'Vancouver'
        animal['id'] = '0001'
        animal['url'] = ''
        animal['images'] = []
        animal['compatibility']['ok_with_dogs'] = 'Yes'
        animal['compatibility']['ok_with_cats'] = 'No'
        animal['compatibility']['ok_with_livestock'] = 'Unknown'
        animal['compatibility']['house_trained'] = 'Yes'
        animal['compatibility']['indoor_only'] = 'No'
        animal['compatibility']['indoor_outdoor'] = 'Yes'
        animal['compatibility']['lived_with_kids'] = 'No'
        animal['compatibility']['special_needs'] = 'No'
        animal['compatibility']['featured_pet'] = 'Yes'
        animal['compatibility']['staff_pick'] = 'No'
        animal['compatibility']['bonded'] = 'Yes'
        animal['compatibility']['in_foster'] = 'Yes'
        animal['compatibility']['adoption_pending'] = 'Yes'
        animal['compatibility']['longterm_resident'] = 'No'
        self.add_animal_to_db(animal)

    def get_test_animal(self): 
        animal = self.retrieve_animal_from_db('0001')
        return animal

    def fetch_animal(self, url: str, animal: str) -> list: 
        """Given the URL of the animal listings page, returns a list of animal listings."""
        options = webdriver.ChromeOptions()
        options.add_argument("--headless=new")
        driver = webdriver.Chrome(options=options)
        html = ""

        try:
            # load the entire page 
            driver.get(url)
            wait = WebDriverWait(driver, 5)
            while (True): 
                wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'ajax-load-more-query-button')))
                time.sleep(1) # wait for the button to be clickable. clicking immediately throws ElementNotInteractableException too early
                input_element = driver.find_element(By.CLASS_NAME, 'ajax-load-more-query-button')
                html = driver.page_source
                input_element.click()
        except (TimeoutException, ElementNotInteractableException) as e: 
            print(f"Loaded all {animal}s.")
        except Exception as e: 
            print(f"Error loading {animal}s: {e}")
        finally: 
            driver.quit()
        
        animals_list = self.get_animals_from_html(html)
        return animals_list 


    def get_animals_from_html(self, html: str) -> list: 
        """Given the string of dog listings page, returns a list of animal listings.""" 
        animals = []
        soup = BeautifulSoup(html, 'html.parser')
        cards_html = soup.find_all(class_='ybd-sb-pet-card-container')
        for card_html in cards_html: 
            animal_url = card_html.find('a', href=True)['href']
            animal_html = requests.get(animal_url).text
            animal_info = self.get_animal_info_from_html(animal_html)
            animal_info['url'] = animal_url
            animals.append(animal_info)
        return animals


    def get_animal_info_from_html(self, html: str) -> dict: 
        """Given the string of an animal's page, returns a dictionary of animal info and adds the animal to database."""
        soup = BeautifulSoup(html, 'html.parser')
        info = self.initialize_info()
        compatibility = self.initialize_compatibility()

        # images 
        images_html = soup.find_all(class_='ybd-item-container')
        info['images'] = self.get_animal_images_from_html(images_html)

        # name
        name_text = soup.find(class_='pet-name').text        
        info['name'] = self.parse_animal_name(name_text, compatibility)

        # description
        description_htmls = soup.find(class_='ybd-sb-content').find_all('p')
        for description_html in description_htmls: 
            info['description'] += description_html.text

        # about me
        details_htmls = soup.find_all(class_='ybd-sb-pet-details-block')
        self.parse_animal_details(details_htmls, info)

        # compatibility 
        compatibility_htmls = details_htmls[1].find('ul').find_all('li')
        self.parse_animal_compatibility(compatibility_htmls, compatibility)
        info['compatibility'] = compatibility

        self.add_animal_to_db(info)
        return info


    def add_animal_to_db(self, animal_info: dict): 
        """Adds an animal to database."""
        doc_ref = self.db.collection('animals').document(animal_info['id'])
        doc_ref.set(animal_info)


    def retrieve_animal_from_db(self, id: str) -> dict: 
        """Retrieves an animal from the database."""
        animal = self.db.collection('animals').document(id).get().to_dict()
        return animal


    def get_animal_images_from_html(self, images_html: str) -> list: 
        """ Given the string of an animal's page, returns a list of image URLs."""
        images = []
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
        return images


    def parse_animal_name(self, name: str, compatibility: dict) -> str: 
        """Given the name of an animal, returns the name of the animal. If the name includes compatibility indicators, it will also update the compatibility dictionary."""
        # 'adoption pending' or 'pending adoption' in name
        parsed = name
        if parsed.lower().find('adoption') != -1: 
            name_raw = re.split("adoption", parsed, flags=re.IGNORECASE)[0].strip()
            parsed = re.split("pending", name_raw, flags=re.IGNORECASE)[0].strip()[:-1] if name_raw.find('pending') != -1 else name_raw[:-1].strip()
            compatibility['adoption_pending'] = 'Yes'

        # 'in foster' in name
        if parsed.lower().find('in foster') != -1:
            name_raw = re.split("in foster", parsed, flags=re.IGNORECASE)[0].strip()
            parsed = name_raw[:-1].strip() # remove last char which is a special character
            compatibility['in_foster'] = 'Yes'

        # 'bonded to' in name
        if parsed.lower().find('bonded') != -1:
            name_raw = re.split("bonded", parsed, flags=re.IGNORECASE)[0].strip()
            parsed = name_raw[:-1].strip()
            compatibility['bonded'] = 'Yes'
        return parsed


    def parse_animal_details(self, details_htmls: list, info: dict): 
        """Given the details of an animal, updates the animal info dictionary."""
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
        info['since'] = datetime.datetime.now(tz=datetime.timezone.utc) - datetime.timedelta(int(info['since']))
        info['breed'] = self.parse_breed(info['breed'])
        info['colour'] = self.parse_colour(info['colour'])


    def parse_animal_compatibility(self, compatibility_htmls: list, compatibility: dict):
        """Given the compatibility of an animal, updates the compatibility dictionary."""
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
        if text.find('warning') != -1: 
            return 'No'
        elif text.find('checkmark') != -1 or text.find('indoor-outdoor') != 1 or text.find('staff_pick') != -1: 
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
            'since': datetime.datetime.now(tz=datetime.timezone.utc),
            'age': 0,
            'pet_type': '',
            'breed': [],
            'colour': [],
            'weight': '',
            'sex': '',
            'location': '',
            'id': '0000',
            'compatibility': [],
            'url': '',
            'images': [],
            'date_created': datetime.datetime.now(tz=datetime.timezone.utc),
        }


    def initialize_compatibility(self): 
        return {
            'bonded': 'No',
            'in_foster': 'No', 
            'adoption_pending': 'No',
            'featured_pet': 'No',
            'staff_pick': 'No',
            'special_needs': 'No',
            'house_trained': 'Unknown',
            'indoor_only': 'Unknown',
            'indoor_outdoor': 'Unknown',
            'lived_with_kids': 'Unknown',
            'ok_with_cats': 'Unknown',
            'ok_with_dogs': 'Unknown',
            'ok_with_livestock': 'Unknown',
            'longterm_resident': 'No',
        }

    
    def parse_breed(self, breed: str) -> list: 
        breeds = breed.split(' / ')
        return breeds 

    def parse_colour(self, colour: str) -> list: 
        colours = colour.split(' / ')
        return colours