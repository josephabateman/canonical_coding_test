async function getData() {
  let response = await fetch(
    "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"
  );
  let data = await response.json();
  return data;
}
getData().then((data) => console.log(data));

getData().then((data) => {
  data.forEach((cardData) => {
    const rootDiv = document.getElementById("root");
    const cardContainer = document.createElement("div");
    cardContainer.classList = "card p-card col-4";

    //2 divs used to align items properly with flex
    const flexStart = document.createElement("div");
    flexStart.classList = "flex-start";
    const flexEnd = document.createElement("div");
    flexEnd.classList = "flex-end";

    //header text
    const heading = document.createElement("h2");
    heading.classList = "header-text";
    heading.innerText = cardData._embedded["wp:term"][1][0].name;
    flexStart.appendChild(heading);

    //break
    const headerBreak1 = document.createElement("hr");
    headerBreak1.classList = "u-sv1";
    flexStart.appendChild(headerBreak1);

    //image
    const image = document.createElement("img");
    image.src = cardData.featured_media;
    flexStart.appendChild(image);

    //title with link
    const title = document.createElement("h4");
    const titleLink = document.createElement("a");
    titleLink.href = cardData.link;
    titleLink.innerHTML = cardData.title.rendered;
    title.appendChild(titleLink);
    flexEnd.appendChild(title);

    //author with name inside <a> tag
    const authorName = cardData._embedded.author[0].name;
    const postDate = new Date(cardData.date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = postDate.toLocaleDateString("en-GB", options);
    const nameLink = document.createElement("a");
    nameLink.href = cardData._embedded.author[0].url;
    nameLink.innerHTML = authorName;
    const by = document.createTextNode("By ");
    const onDate = document.createTextNode(` on ${formattedDate}`);
    const par = document.createElement("p");
    par.appendChild(by);
    par.appendChild(nameLink);
    par.appendChild(onDate);
    par.classList = "block italic";
    flexEnd.appendChild(par);

    //break
    const headerBreak2 = document.createElement("hr");
    headerBreak2.classList = "u-sv1";
    flexEnd.appendChild(headerBreak2);

    //type of card
    const cardType = document.createElement("h4");
    cardType.innerText = cardData.type;
    cardType.classList = "uppercase";
    flexEnd.appendChild(cardType);

    //append the 2 flex divs inside card div and append card div to root div
    cardContainer.appendChild(flexStart);
    cardContainer.appendChild(flexEnd);
    rootDiv.appendChild(cardContainer);
  });
});
