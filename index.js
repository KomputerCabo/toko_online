import * as UserService from '../toko_online/services/user.js'
import express from 'express';



const port = 8080;
const host = "localhost";

const app = express();

app.use(express.json());
app.post("/admins", UserService.createAdmin);
app.post("/produks",UserService.createProduk)
app.post("/pembelis",UserService.createPembeli)
app.get("/pembelis",UserService.tokenValidation,UserService.getPembeli)
app.get("/admins",UserService.tokenValidation,UserService.getAdmin)
app.put("/produks",UserService.editProduk)

app.post("/login", UserService.authPembeli);
app.post("/admins/login", UserService.authAdmin);


app.listen(port, host, () => {
    console.log(`Server berjalan di http://${host}:${port}`);
});