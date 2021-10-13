const loader = document.querySelector(".loader");

// declare classes
const featured_article = document.querySelector('.featured_article'),
    article_section = document.querySelector('.article_section'),
    article_author = document.querySelector('.article_author'),
    article_date = document.querySelector('.article_date'),
    article_title = document.querySelector('.article_title');


// declar arrays 
let data = [],
    sections = [],
    unique_sections = [];
async function getData() {
    loader.style.visibility = "visible";
    loader.style.opacity = "1";
    let data1_business = await (await fetch('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=SSc16t4n5EolGZAF57jS5se2IYLN88GE')).json();
    let data1_technology = await (await fetch('https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=SSc16t4n5EolGZAF57jS5se2IYLN88GE')).json();
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
    let url = data[0];
    // featured_article.style.background = `background-image: url(\"${data[0].multimedia[0].url}\")`;
    console.log("url");
    console.log(url);
}

getFeaturedArticle()