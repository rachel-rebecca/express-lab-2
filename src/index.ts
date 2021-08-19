import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes/routing";


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views/images'))
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(routes);

const port = 3001;

app.listen(port, () => {
    console.log(`listening on ${port}`);
})