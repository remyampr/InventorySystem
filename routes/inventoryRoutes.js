const express = require("express");
const router = express.Router();

let products = [
  {
    id: 1,
    name: "Apple",
    price: 3.5,
    stock: 100,
    description: "Fresh red apples.",
  },
  {
    id: 2,
    name: "Rice",
    price: 1.2,
    stock: 500,
    description: "Premium quality basmati rice.",
  },
  {
    id: 3,
    name: "Milk",
    price: 0.9,
    stock: 200,
    description: "Full cream milk.",
  },
  {
    id: 4,
    name: "Bread",
    price: 1.5,
    stock: 50,
    description: "Whole grain bread.",
  },
  {
    id: 5,
    name: "Eggs",
    price: 0.2,
    stock: 1000,
    description: "Farm fresh eggs.",
  },
];

// get
router.get("/", (req, res) => {
  res.status(200).json(products);
});

// get one product
router.get('/:id',(req,res)=>{
  const {id}=req.params;
  const searchProduct=products.find((product)=> product.id === parseInt(id));
  if (!searchProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(searchProduct);
})

// post
router.post("/", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// put
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((product) => product.id === parseInt(id));

  if (index != -1) {
    products[index].name = req.body.name;
    products[index].price = req.body.price;
    products[index].stock = req.body.stock;
    products[index].description = req.body.description;
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not fund", id: id, index: index });
  }
});

// patch
router.patch("/:id",(req,res)=>{
  const { id } = req.params;
  const index = products.findIndex((product) => product.id === parseInt(id));
  if(index != -1){
    const updatedProduct={...products[index],...req.body}
    products[index]=updatedProduct
    res.status(200).json({message:`product updated `,product:updatedProduct});
  } else {
    res.status(404).json({ message: "Product not fund", id: id, index: index });
  }
})

// delete
router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    productToRemove=products.find((product)=>product.id === parseInt(id));
    if(!productToRemove){
      res.status(404).json({message:`product not in stock`})
    }
    products=products.filter((product)=>{ return product.id !== parseInt(id) })
    res.status(202).send();
})

module.exports = router;
