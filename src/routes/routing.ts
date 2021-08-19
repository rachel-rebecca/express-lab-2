import express from "express";



const routes = express.Router()

const specialPizzas = [
    {name:"Pepper & pepperoni",id: 1, price:15.00}, 
    {name:"Jalapeno Pineapple", id: 2, price:12.00}, 
    {name:"Greek Pizza", id: 3, price:13.00}
]

const toppings = ["Pepperoni", "Sausage", "Chicken", "Mushroom", "Olive", "Green Pepper", "Onion", "Jalapeno", "Feta", "Pineapple"];

routes.get('/', (req, res) =>{ 
    
    res.render("home", {specialPizzas})
 
})


routes.get("/pizza/:id", (req, res) => {
    const id: number = Number(req.params.id);
    let pizza = specialPizzas.find(pizza => pizza.id === id);
    let page = "pizza" + req.params.id;
    res.render(page, pizza);
})

routes.get("/custom", (req, res) => {
    res.render("custom", {toppings});
})

routes.post("/confirmation", (req, res) => {
    console.log(req.body)
    let size = req.body.size;
    let toppingCount: number = Number(req.body.toppingCount);
    let glutenFreeCrust = !!req.body.glutenFreeCrust;
    let specialInstructions = req.body.specialInstructions;
    let price: any = 0;

    if(size === "Small") {
        price = 7 + (toppingCount * .5);    
    }

    if(size === "Medium"){
        price = 10 + toppingCount;
    }

    if(size === "Large"){
        price = 12 + (toppingCount * 1.25);
    }

    if(glutenFreeCrust === true) {
        price = price + 2; 
    }

    let freeDelivery = price >= 15;
    
    res.render("confirmation", {size, toppingCount, glutenFreeCrust, specialInstructions, price, freeDelivery})
})

routes.get("/review", (req, res) => {
    res.render("review");
})

routes.post("/thanks", (req, res) => {
    console.log(req.body)
    let name = req.body.name;
    let comment = req.body.comment;
    let rating = req.body.rating;
    res.render("thanks", {name, comment, rating});
})

routes.get("/public", (req, res) => {
    res.render("public")
})

export default routes;

/**
 * can set variables inside routes.get
 * ex: const daily = "cherry" 
 * res.render('file', {daily})
 * ==> <p>{{daily}} </p>
 * or 
 * pass through entire object and link key names
 * ex: res.render('file', {name:"Jerry",state:"New York"})
 * <p>Welcome, {{name}} from {{state}}</p>
 * or
 * send whole object into render then call object properties using dot notations
 */

/**
 * arrays can be declared inside routes.get
 * can call in res.render('file', {array})
 * in hbs:
 * <ul>
 * {{#each array}}
 * <li>{{this}}</li>
 * {{/each}}
 * 
 * can link <a href="/"> 
 * 
 * // let pets = [
    //     {name: "Bo", fame:"The Obamas"},
    //     {name: "Toto", fame:"Wizard of Oz"},
    //     {name:"Dart", fame:"Stranger Things"}
    // ]
 */