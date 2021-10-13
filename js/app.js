const loader = document.querySelector(".loader");

// declare classes
const featured_article = document.querySelector('.featured_article'),
    article_section = document.querySelector('.article_section'),
    article_author = document.querySelector('.article_author'),
    article_date = document.querySelector('.article_date'),
    article_title = document.querySelector('.article_title'),
    topArticles = document.querySelector('.topArticles');


// declar arrays 
let data = [],
    sections = [],
    unique_sections = [];
async function getData() {
    loader.style.visibility = "visible";
    loader.style.opacity = "1";
    // let data1_business = await (await fetch('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=SSc16t4n5EolGZAF57jS5se2IYLN88GE')).json();
    let data1_business = await (await fetch('https://raw.githubusercontent.com/Anan014/news_site1-1.0/main/json/business.json')).json();

    // let data1_technology = await (await fetch('https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=SSc16t4n5EolGZAF57jS5se2IYLN88GE')).json();
    let data1_technology = await (await fetch('https://raw.githubusercontent.com/Anan014/news_site1-1.0/main/json/technology.json')).json();

    // let data1_automobiles = await (await fetch('https://api.nytimes.com/svc/topstories/v2/automobiles.json?api-key=SSc16t4n5EolGZAF57jS5se2IYLN88GE')).json();
    data = data1_business.results.concat(data1_technology.results);
    loader.style.visibility = "hideen";
    loader.style.opacity = "0";
    return data;
}

async function printData() {
    data = await getData();
    data.forEach(element => {
        sections.push(element.section)
    });
    unique_sections = sections.filter(onlyUnique);
    console.log("data", data);
    console.log("sections", sections);
    console.log("unique_sections", unique_sections);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

printData();

async function getFeaturedArticle() {
    data = await getData()
    let url = data[0].multimedia[0].url,
        date = new Date(Date.parse(data[0].published_date));
    featured_article.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url("${url}")`;
    featured_article.style.backgroundPosition = `center center`;
    // featured_article.style.filter = `brightness(90%)`;
    article_section.innerHTML = `${data[0].section.toUpperCase()}`;
    article_author.innerHTML = `${data[0].byline}`;
    article_date.innerHTML = `${date.toUTCString()}`;
    article_title.innerHTML = `${data[0].title}`;
}

getFeaturedArticle();

async function getTopArticles() {
    data = await getData();
    for (let i = 1; i <= 4; i++) {
        let date = new Date(Date.parse(data[i].published_date));
        document.querySelector(`.top${i}Art .topArtImg`).style.backgroundImage = `url("${data[i].multimedia[0].url}")`;
        document.querySelector(`.top${i}Art .topArtImg`).style.backgroundSize = `cover`;
        document.querySelector(`.top${i}Art .article_section`).innerHTML = `${data[i].section.toUpperCase()}`;
        document.querySelector(`.top${i}Art .article_author`).innerHTML = `${data[i].byline}`;
        document.querySelector(`.top${i}Art .article_date`).innerHTML = `${date.toUTCString()}`;
        document.querySelector(`.top${i}Art .article_title`).innerHTML = `${data[i].title}`;
    }
}

getTopArticles();