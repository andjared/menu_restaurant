const data = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    ingredients: ["flour", "milk", "butter", "nuts"],
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    ingredients: ["flour", "beef", "potato"],
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    ingredients: ["strawberries", "milk", "suggar"],
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    ingredients: ["eggs", "cheese", "flour"],
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    ingredients: ["flour", "eggs", "cheese", "mayo", "salad"],
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    ingredients: ["chocolate", "milk", "cacao"],
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    ingredients: ["cheese", "saussage", "eggs", "bacon"],
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    ingredients: ["flour", "cheese", "beef", "ham", "potato", "onions"],
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "dinner",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    ingredients: ["flour", "milk", "butter"],
  },
  {
    id: 10,
    title: "american dinner",
    category: "dinner",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    ingredients: ["flour", "potato", "beef", "mayo", "onions"],
  },
];
const menu = document.querySelector(".menu");
const btns = document.querySelectorAll(".btn");
const search = document.querySelector("input");
const markup = (img, title, price, desc, ingredients) => {
  return `<div class="card">
              <div class="img">
                <img src=${img} alt=${title} />
              </div>
              <div class="info">
                  <div class="title">
                    <div>
                        <p>${title} </p>
                    </div>
                    <div>
                        <span class="price">$${price}</span>
                    </div>
                  </div>
                   <div class="desc"> 
                     <p>${desc}</p>
                   </div>
                   <div> 
                     <span class="ingredients">ingredients: </span>
                    <ul class="ingredients-list">${ingredients} </ul>
                    </div>
                 </div>
              </div>
              </div>
         </div>`;
};
const searchByIngredients = (userInput) => {
  const allIngredients = data.map((item) => item.ingredients);

  //get matching ingreedients with user input substring
  const matchedIng = new Set();
  allIngredients.forEach((arr) => {
    const matches = arr.filter((ing) => ing.includes(userInput));
    if (matches.length) {
      matchedIng.add(matches.join(""));
    }
  });
  if (matchedIng.size > 0) {
    //if there is matches get food that contains those ingreedients
    const filteredFood = [];
    matchedIng.forEach((match) => {
      const newData = data.filter((item) => item.ingredients.includes(match));
      filteredFood.push(...newData);
    });

    const foodByIng = filteredFood.map((food) => {
      const { title, price, img, desc, ingredients } = food;
      return markup(img, title, price, desc, ingredients);
    });
    return foodByIng.join("");
  } else {
    let noMatches = `<div class="no-matches">
                          <p>Sorry, it looks like there is no food with that ingredient. Try something else. </p>
                    </div>`;
    menu.classList.add("no-match-menu");
    return (menu.innerHTML = noMatches);
  }
};
const getSelectedItems = (selectedCategory) => {
  const selected = data.filter((item) => item.category === selectedCategory);
  const items = selected.map((item) => {
    const { title, price, img, desc, ingredients } = item;
    const ingr = ingredients.map((ing) => `<li>${ing}</>`);
    return markup(img, title, price, desc, ingr);
  });
  return items.join("");
};

const getAllItems = () => {
  let categories = new Set();
  data.map((item) => {
    categories.add(item.category);
  });

  categories.forEach((category) => {
    menu.innerHTML += getSelectedItems(category);
  });
};
//display all items onload
window.addEventListener("DOMContentLoaded", () => {
  getAllItems();
});
//list items by category
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    search.value = "";
    const chosenCategory = e.target.innerHTML;
    if (chosenCategory === "all") {
      menu.innerHTML = "";
      getAllItems();
    } else {
      menu.innerHTML = getSelectedItems(chosenCategory);
    }
  });
});
//rerender on user input
search.addEventListener("keyup", (e) => {
  let userInput = e.target.value.trim().toLowerCase();
  if (userInput.length > 0 && userInput !== "") {
    menu.innerHTML = searchByIngredients(userInput);
  } else {
    menu.innerHTML = "";
    getAllItems();
  }
});
