var express = require('express');
var app = express();
var cors = require('cors')
const http = require('http').createServer(app);
/*app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
  
  });*/

app.use(cors())
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost'; 
var port = 8080;
 
// La variable mongoose nous permettra d'utiliser les fonctionnalités du module mongoose.
var mongoose = require('mongoose'); 
// Ces options sont recommandées par mLab pour une connexion à la base
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
 
//URL de notre base
var urlmongo = "mongodb://localhost:27017/mydb";
// Nous connectons l'API à notre base de données
mongoose.connect(urlmongo, {useNewUrlParser: true, useUnifiedTopology: true}, options);
 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion à la base OK"); 
});
var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Le modèle de données :
var productsSchema = mongoose.Schema({
    name: String, 
    type: String, 
    price: Number,
    rating: Number, 
    warranty_years: Number,
    available: String 
}); 
 
var Products = mongoose.model('Products', productsSchema);


//creation de la route
var myRouter = express.Router(); 
myRouter.route('/')
.all(function(req, res, next){ 
      res.json({message : "Bienvenue sur  API ", methode : req.method});
});
myRouter.route('/products')
.get(function(req, res, next){ 
	Products.find(function(err, products){
        if (err){
            res.send(err); 
        }
        res.json(products);  
    }); 
})
.post(function(req, res, next){
    console.log(req.body)
      var products = new Products();
      products.name = req.body.name;
      products.type = req.body.type;
      products.price = req.body.price;
      products.rating = req.body.rating;
      products.warranty_years = req.body.warranty_years;
      products.available = req.body.available;
      products.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message : 'le produit est maintenant stockée en base de données'});
        console.log("le produit est maintenant stockée en base de données");
      }); 
});

myRouter.route('/products/:products_id')
.get(function(req, res, next){ 
            Products.findById(req.params.products_id, function(err, products) {
            if (err)
                res.send(err);
            res.json(products);
        });
}) 
.put(function(req, res, next){ 
    console.log(req.body)
    Products.findById(req.params.products_id, function(err, products) {
        console.log(products.name);
        if (err){
            res.send(err);
        }
        products.name = req.body.name;
        products.type = req.body.type;
        products.price = req.body.price;
        products.rating = req.body.rating;
        products.warranty_years = req.body.warranty_years;
        products.available = req.body.available;
        products.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message : 'Bravo, mise à jour des données OK'});
            console.log("le produit est maintenant mise a jour en base de données");
        });                
    });
})
.delete(function(req, res, next){ 
 
    console.log(req.body);
    Products.remove({_id: req.params.products_id}, function(err, products){
        if (err){
            res.send(err); 
        }
        res.json({message:"Bravo, produit supprimée"});
        console.log("le produit est maintenant supprimée en base de données");
    }); 
    
});

app.use(myRouter);   
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});
 
