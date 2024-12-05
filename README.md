# Pop-pup (WiP)

Pop-pup is a browser extension and website that brings daily adoptable animal photos directly to your screen. Whether you're looking to adopt a new furry friend or just want to brighten your day with adorable animal pictures, Pop-pup has you covered. Each day, a new adoptable animal is featured, giving users the opportunity to learn more about the animal and potentially adopt them.

## Website

The website is deployed and can be accessed at [https://pop-pup.netlify.app](https://pop-pup.netlify.app).


## Browser Extension

TBD
<!-- The browser extension can be installed from the Chrome Web Store (link to be provided). -->

## Features

- [x] **Deployment**: Server and client deployment.
- [x] **Scraper**: Collect information from local shelters.
- [x] **Google Authentication**: Log in with your Google account to save your preferences and get personalized recommendations.
- [ ] **Adoption Information**: Learn more about each animal and how to adopt them.
- [ ] **Updates Daily**: Get a new adoptable animal photo every day.
- [ ] **Responsive on Mobile**
- [ ] **Favourites**: Save pets as favourites to revisit.
- [ ] **Machine Learning Recommender**: A machine learning algorithm picks out personalized animal recommendations for you based on your preferences and interactions.
- [ ] **Browser Extension**: Easily access daily animal photos directly from your browser.

## Tech Stack

- **Frontend**:
  - Typescript, React, Vite, Tailwind CSS, Framer Motion
  
- **Backend**:
  - Python, Flask, Selenium, Requests, BeautifulSoup

- **Database**:
  - Google Firestore

- **Authentication**:
  - Google Firebase sign in

- **Deployment**: 
  - Vercel: backend
  - Netlify: frontend

## Local Installation

If you prefer to run the project locally, follow these steps:

### Website

1. Clone the repository:
    ```sh
    git clone https://github.com/yeojunh/pop-pup.git
    ```
2. Navigate to the frontend directory:
    ```sh
    cd pop-pup/frontend
    ```
3. Install the dependencies:
    ```
    yarn
    ```
4. Start the backend server:
    ```sh
    yarn start-api
    ```
5. Start the frontend server:
    ```sh
    vite
    ```
6. Start tailwind: 
    ```sh
    yarn tailwind
    ```
7. Open your browser and navigate to `http://localhost:3000`.
### Browser Extension
- TBD
<!-- ### Browser Extension

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/pop-pup.
2. Navigate to the frontend directory:
    ```sh
    cd pop-pup/frontend
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Build the extension:
    ```sh
    npm run build
    ```
5. Load the extension in your browser:
    - Open your browser's extension management page.
    - Enable "Developer mode".
    - Click "Load unpacked" and select the `dist` directory. -->

## Usage
- **Website**: Visit the website to see the daily featured animal and browse through previous days' animals.
- **Browser Extension**: TBD
<!-- Click on the extension icon to view the daily adoptable animal photo. -->


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions or feedback, feel free to reach out to me on [Linkedin](https://www.linkedin.com/in/yeojun/).

---
Thank you for using Pop-pup! We hope you enjoy the daily dose of adorable adoptable animals.