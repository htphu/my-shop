const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes')
const productVariantRoutes = require('./routes/productVariant.routes') 
const productOptionRoutes = require('./routes/productOption.routes')
const imageRoutes = require('./routes/image.routes')
const skuRoutes = require('./routes/sku.routes')
const statusRoutes = require('./routes/status.routes')
const orderRoutes = require('./routes/order.routes')
const reviewRoutes = require('./routes/review.routes')
const authenRoutes = require('./routes/authen.routes');


global.__basedir = __dirname;
const port = process.env.PORT;
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use('/public/uploads', express.static('./public/uploads'));

productRoutes(app);
productVariantRoutes(app);
productOptionRoutes(app);
imageRoutes(app);
skuRoutes(app);
statusRoutes(app);
reviewRoutes(app);
authenRoutes(app);
orderRoutes(app);
userRoutes(app);

app.listen(port,()=>{
    console.log('RESTful API server started on: ' + port);
});