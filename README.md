[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Forks][forks-shield]][forks-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
-->



<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/Trojblue/SafeMap">
    <img src="docs/img/logo.png" alt="Logo" width="90" height="79">
  </a>

  <h3 align="center">SafeMap: one-shot covid-19 intelligence</h3>

  <p align="center">
    An awesome hackathon project!
    <br />
    <a href="https://devpost.com/software/safemap-jfxy7r?ref_content=user-portfolio&ref_feature=in_progress"><strong>View on Devpost »</strong></a>
    <br />
    <br />
    <a href="http://map.gkd.icu">View Demo</a>
    ·
    <a href="https://github.com/Trojblue/SafeMap/issues">Report Bug</a>
    ·
    <a href="https://github.com/Trojblue/SafeMap/issues">Request Feature</a>
  </p>

</p>



<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#Folder Structure">Folder Structure</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>




<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](http://map.gkd.icu)

SafeMap is a platform that aims to aid people in making daily commute decisions. We do this by integrating available data from various sources into a single point of view. This empowers the users to discover potential risk factors in their daily lives, and reduce exposure to the virus based on real-time risk statistics.

Project Highlights:
* Complete Frontend-Middleware-Backend stack, with RESTful and microservices framework
* Utilized a mix of public and home-grown APIs to get accurate data
* A unique combination of tech stacks for optimized runtime efficiency



### Built With

SafeMap is implemented using multiple frameworks, with multiple developers, using various programming languages.

- Frontend: [Leaflet.js](), [D3.js](), [Bootstrap](https://getbootstrap.com), [JQuery](https://jquery.com), [Google Maps API]()
- Middleware:  [Nginx](), [Flask](), [Swagger]()
- Backend: [Firebase](), [NodeJS](https://nodejs.dev/), [Python](), [Yarn](), [Google Compute Engine]()
- Ideation: [Figma](), [Sketch]()



<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Folder Structure

- `combined`: main folder of operation;  merging files and changing functions; used as git `/dev` branch

- `python-xxl`: the python KNN recommendation engine, implemented as a microservice
- other folders: status updates and stashes

### Prerequisites

You need `Node`, `yarn`, `python3.8` and the corresponding libraries for the project to run. 


### Installation

1. Get a Google Map API Key 
2. Clone the repo
   ```sh
   git clone https://github.com/Trojblue/SafeMap/
   ```
3. Install packages **using yarn**
   
   ```sh
   cd combined
   yarn
   ```
4. Install python dependencies
   ```JS
   cd ../python-xxl
   pip install -r requirements.txt
   ```



<!-- USAGE EXAMPLES -->
## Usage

The site can be run hosted or be used as an API service.

To run the repo as a website:

1. run `rec.py` in `/python-xxl`
2. run command `yarn start` in `/combined`
3. if you are running it in a hosted environment, make sure the `3000` and `5000` ports are open on the server.



_For more examples, please refer to the [Documentation](combined/readme.md)_



<!-- ROADMAP -->

## Roadmap

We are planning to keep expanding the website, and have long-term maintenance to keep it running. We welcome anyone to open pull request on GitHub, or sponsor our project. Moreover, our data visualization, map systems, and recommendation system are incorporated with with robust query systems for Toronto. We can easily expand our map to serve every city in the world.



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the GPL License. See `LICENSE` for more information.

<br>


## Acknowledgements

I want to thank everyone for providing us the opportunity to showcase this product. It's been great fun working on it, and I hope this can the world a little bit better, in this tough situation.





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/trojblue/SafeMap.svg?style=for-the-badge
[contributors-url]: https://github.com/Trojblue/SafeMap/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/trojblue/SafeMap.svg?style=for-the-badge
[forks-url]: https://github.com/Trojblue/SafeMap/network/members
[stars-shield]: https://img.shields.io/github/stars/trojblue/SafeMap.svg?style=for-the-badge
[stars-url]: https://github.com/trojblue/SafeMap.svg/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/trojblue/SafeMap/issues
[license-shield]: https://img.shields.io/github/license/trojblue/SafeMap.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/xinlei-andrew-xu-0b12ba181/
[product-screenshot]: docs/img/homepage.png






