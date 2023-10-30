import dbPool from "../utils/db.js"

const getDataAdmin = () => {
    const query = "SELECT id_admin, nm_admin, email_admin, password_admin, created_at FROM tb_admin";
    
    return dbPool.query(query);
}
const getDataProduk = () => {
    const query = "SELECT id_produk,nm_produk,stok_produk,harga_produk,foto_produk,desc_produk FROMM tb_produk";
    
    return dbPool.query(query);
}

const getDataPembeli = () => {
    const query = "SELECT id_pembeli,nm_pembeli,email_pembeli,password_pembeli,alamat_pembeli,telepon_pembeli FROMM tb_pembeli";
    
    return dbPool.query(query);
}

const getDataBelanja = () => {
    const query = "SELECT id_belanja,id_pembeli,id_produk,jlh_belanja,tggl_belanja,total_belanja FROMM tb_belanja";
    
    return dbPool.query(query);
}

// const createData = (name, email, password) => {
//     let createdAt = new Date();

//     const query = "INSERT INTO users(name, email, password, created_at) VALUES (?, ?, ?, ?)";
//     const values = [name, email, password, createdAt];

//     return dbPool.query(query,values);
// }

const createDataAdmin = (name, email, password) => {
        const query = "INSERT INTO tb_admin(nm_admin, email_admin, password_admin) VALUES (?, ?, ?)";
    const values = [name, email, password];

    return dbPool.query(query,values);
}

const createDataProduk = (namaProduk, stokProduk, hargaProduk,fotoProduk,descProduk) => {
    const query = "INSERT INTO tb_produk(nm_produk, stok_produk, harga_produk,foto_produk,desc_produk) VALUES (?, ?, ?,?,?)";
const values = [namaProduk, stokProduk, hargaProduk,fotoProduk,descProduk];

return dbPool.query(query,values);
}

const createDataPembeli = (namaPembeli, emailPembeli, passwordPembeli,alamatPembeli,teleponPembeli) => {
    const query = "INSERT INTO tb_pembeli(nm_pembeli, email_pembeli,password_pembeli, alamat_pembeli,telepon_pembeli) VALUES (?, ?, ?,?,?)";
const values = [namaPembeli, emailPembeli, passwordPembeli,alamatPembeli,teleponPembeli];

return dbPool.query(query,values);
}



const getDataById = (id) => {
    const query = "SELECT user_id, name, email, password, created_at FROM users WHERE user_id = ?";
    
    return dbPool.query(query, [id]);
}

const deleteData = (id) => {
    const query = "DELETE FROM users WHERE user_id = ?";
    
    return dbPool.query(query, [id]);
}

const getDataByEmailAdmin = (emailAdmin) => {
    const query = "SELECT id_admin, nm_admin, email_admin, password_admin FROM tb_admin WHERE email_admin= ?";
    
    return dbPool.query(query, [emailAdmin]);
}

const getDataByEmailPembeli = (emailPembeli) => {
    const query = "SELECT id_pembeli, nm_pembeli, email_pembeli, password_pembeli FROM tb_pembeli WHERE email_pembeli= ?";
    const values=[emailPembeli]
    return dbPool.query(query, values);
}

const updateDataProduk =(id)=>{
    const query= "UPDATE user SET nama=? WHERE id=?"
    const values=[id]

    return pool.query(query,values)
}

export { getDataAdmin, getDataProduk, getDataPembeli,createDataAdmin,createDataProduk, createDataPembeli,getDataById, deleteData, getDataByEmailPembeli,getDataByEmailAdmin,updateDataProduk}