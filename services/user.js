import {getDataById, createDataAdmin,createDataProduk,createDataPembeli, getDataByEmailPembeli, getDataByEmailAdmin, getDataPembeli,getDataAdmin,updateDataProduk} from "../repositories/users.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_ACCESS_TOKEN = 'kelas.com';
const SECRET_REFRESH_TOKEN = 'backend';

export const createAdmin =async (request, response, next) => {
    try {
        let name = request.body.nama;
        let email = request.body.email;
        let password = request.body.password;
        let saltRound = 10;
        bcrypt.hash(password,saltRound, async (error, hashedPass) => {
            let [result] = await createDataAdmin(name, email,hashedPass);
    
            if (result.insertId > 0) {
                successResponse(response, "success create user", result.insertId)
            } else {
                errorResponse(response, "failed create user", 500)
            }
        })
        
    } catch (error) {
        next(error);
    }
}

export const createPembeli =async (request, response, next) => {
    try {
        let namaPembeli = request.body.nama;
        let emailPembeli = request.body.email;
        let passwordPembeli = request.body.password;
        let alamatPembeli = request.body.alamat;
        let teleponPembeli = request.body.telepon;

        let saltRound = 10;
        bcrypt.hash(passwordPembeli,saltRound, async (error, hashedPass) => {
            let [result] = await createDataPembeli(namaPembeli, emailPembeli,hashedPass,alamatPembeli,teleponPembeli);
    
            if (result.insertId > 0) {
                successResponse(response, "success create user", result.insertId)
            } else {
                errorResponse(response, "failed create user", 500)
            }
        })
        
    } catch (error) {
        next(error);
    }
}

export const createProduk =async (request, response, next) => {
    try {
        let namaProduk= request.body.namaProduk;
        let stokProduk = request.body.stokProduk;
        let hargaProduk = request.body.hargaProduk;
        let fotoProduk = request.body.fotoProduk;
        let descProduk = request.body.descProduk;
     
         
            let [result] = await createDataProduk(namaProduk,stokProduk,hargaProduk,fotoProduk,descProduk);
    
            if (result.affectedRows>0) {
                successResponse(response, "success create produk")
            } else {
                errorResponse(response, "failed create user", 500)
            }
        } catch (error) {
        next(error);
    }
}




export const getPembeli = async (request, response, next) => {
    try {
        let [result] = await getDataPembeli();
        console.log(request.claims);

        if (result.length > 0) {
            successResponse(response, "success", result)
        } else {
            errorResponse(response, "data not found", 404)
        }
    } catch (error) {
        next(error);
    }
    
}

export const getAdmin = async (request, response, next) => {
    try {
        let [result] = await getDataAdmin();
        console.log(request.claims);

        if (result.length > 0) {
            successResponse(response, "success", result)
        } else {
            errorResponse(response, "data not found", 404)
        }
    } catch (error) {
        next(error);
    }
    
}

export const getUserDetail = async (request, response, next) => {
    try {
        let id = request.params.id;
        let [result] = await getDataById(id);

        if (result.length > 0) {
            successResponse(response, "success", result[0]);
        } else {
            errorResponse(response, `user dengan id ${id} tidak ditemukan`, 404)
        }
    } catch(error) {
        next(error)
    }
    
}




export const authPembeli = async (request, response, next) => {
    try {
        let emailPembeli= request.body.email;
        let passwordPembeli = request.body.password;
        let [result] = await getDataByEmailPembeli(emailPembeli);
        console.log(result)
        if (result.length > 0) {
            let user = result[0];
            bcrypt.compare(passwordPembeli, user.password_pembeli, (error, isValid) => {
                if (isValid) {
                    let payload ={
                        user_id: user.id_pembeli, 
                        name: user.nm_pembeli,
                        email:user.email_pembeli
                    }
                    let accessToken = jwt.sign(payload, SECRET_ACCESS_TOKEN, {expiresIn:'15m'})
                    let refreshToken = jwt.sign(payload, SECRET_REFRESH_TOKEN, {expiresIn:'30m'})
                    let data = {
                        access_token: accessToken, 
                        refresh_token: refreshToken,
                    }
                    successResponse(response, "success", data);
                } else {
                    errorResponse(response, "email dan password salah!", 401)
                }
            })
            
        } else {
            errorResponse(response, `email dan password salah!`, 401)
        }
    } catch(error) {
        next(error)
    }
    
}

export const authAdmin = async (request, response, next) => {
    try {
        let emailAdmin= request.body.email;
        let passwordAdmin = request.body.password;
        let [result] = await getDataByEmailAdmin(emailAdmin);
        
        if (result.length > 0) {
            let user = result[0];
            bcrypt.compare(passwordAdmin, user.password_admin, (error, isValid) => {
                if (isValid) {
                    let payload ={
                        id_admin: user.id_admin, 
                        nm_admin: user.nm_admin,
                        email_admin:user.email_admin
                    }
                    let accessToken = jwt.sign(payload, SECRET_ACCESS_TOKEN, {expiresIn:'15m'})
                    let refreshToken = jwt.sign(payload, SECRET_REFRESH_TOKEN, {expiresIn:'30m'})
                    
                    let data = {
                        access_token: accessToken, 
                        refresh_token: refreshToken,
                    }
                    successResponse(response, "success", data);
                } else {
                    errorResponse(response, "email dan password salah!", 401)
                }
            })
            
        } else {
            errorResponse(response, `email dan password salah!`, 401)
        }
    } catch(error) {
        next(error)
    }
    
}

export const tokenValidation = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (accessToken) {
        jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error, payload) => {
            if(error) {
                errorResponse(response, error.message, 403)
            } else {
                request.claims = payload;
                next()
            }
        })
    } else {
        errorResponse(response, "invalid request, authorization header not found!!")
    }
}

export const editProduk = async (request,response,next) => {
    console.log(request)
    try{
        let id = request.params.id
        let nama = request.body.nama;
        let stok = request.body.stok;
        let harga = request.body.harga;
        let [result] = await updateDataProduk(id,nama,stok,harga);
        
        if (result.affectedRows > 0) {
            console.log(result);
            successResponse(response, "update berhasil")
        } else {
            errorResponse(response, "failed update user", 500)
        }
    }catch (error) {
        next(error);
    }
}
