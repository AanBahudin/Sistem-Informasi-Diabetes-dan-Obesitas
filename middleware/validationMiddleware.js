import { body, validationResult } from "express-validator";
import { UnathorizedError, BadRequestError } from '../middleware/ErrorHandlerMiddleware.js'
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {  
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                const errorMessage = errors.array().map((error) => error.msg);
                
                if (errorMessage[0].startsWith('not authrorized')) {
                    throw new UnathorizedError('not authorized to access this route');
                }

                throw new BadRequestError(errorMessage)
            }
            next();
        }
    ]
}


// ============================        LOGIN & REGISTER      ============================================

export const validateLogin = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('Please provide email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .notEmpty()
        .withMessage('Please provide password')
        .isLength({ min: 6, max: 10 })
        .withMessage('Password min 6, max 10 characters')
])

export const validateRegister = withValidationErrors([
    body('nama')
        .notEmpty()
        .withMessage('Please provide name')
        .isLength({ min: 3, max: 30 })
        .withMessage('name must be mininum 3 characters and 30 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Please provide email')
        .isEmail()
        .withMessage('Email is not valid')
        .custom( async (email) => {
            const isUserExist = await User.findOne({email});
            if (isUserExist) {
                throw new BadRequestError('email already exist')
            }
        } ),
    body('password')
        .notEmpty()
        .withMessage('Please provide password')
        .isLength({min: 6, max: 15})
        .withMessage('Password min 6, max 10 characters'),
    body('jenisKelamin')
        .notEmpty()
        .withMessage('Jenis Kelamin tidak boleh kosong')
        .isIn(['Pria', 'Wanita'])
        .withMessage('Jenis kelamin tidak valid')
])


// ============================        MESSAGE         ============================================

export const validateMessage = withValidationErrors([
    body('firstName')
        .notEmpty()
        .withMessage('Please provide first name')
        .isLength({ min: 3 })
        .withMessage('first name is too short'),
    body('lastName')
        .notEmpty()
        .withMessage('Please provide last name')
        .isLength({ min: 3 })
        .withMessage('last name is too short'),
    body('email')
        .notEmpty()
        .withMessage('please provide email')
        .isEmail()
        .withMessage('invalid email format'),
    body('contact')
        .notEmpty()
        .withMessage('please provide phone number')
        .isInt()
        .withMessage('invalid contact informations')
        .isLength({ min: 10, max: 12 })
        .withMessage('invalid phone number'),
    body('message')
        .notEmpty()
        .withMessage('please provide message')
        .isLength({ min: 10, max: 300 })
        .withMessage('message is 10 & 300 characters long'),
])


// ============================        UPDATE USER         ============================================

export const validateUpdateUser = withValidationErrors([
    body('nama')
        .notEmpty()
        .withMessage('nama tidak boleh kosong')
        .isLength({ min: 3 })
        .withMessage('nama terlalu pendek'),
        body('email')
        .notEmpty()
        .withMessage('email tidak boleh kosong')
        .isEmail()
        .withMessage('format email salah'),
    body('beratBadan')
        .notEmpty()
        .withMessage('berat badan tidak boleh kosong')
        .isNumeric()
        .withMessage('berat badan harus angka')
        .isFloat({ min: 0 })
        .withMessage('berat badan tidak boleh dibawah 0'),
    body('tinggiBadan')
        .notEmpty()
        .withMessage('tinggi badan tidak boleh kosong')
        .isNumeric()
        .withMessage('tinggi badan harus angka')
        .isFloat({ min: 0 })
        .withMessage('tinggi badan tidak boleh dibawah 0'),
        body('kadarGula')
        .notEmpty()
        .withMessage('kadar gula tidak boleh kosong')
        .isNumeric()
        .withMessage('kadar gula harus angka')
        .isFloat({ min: 0 })
        .withMessage('kadar gula tidak boleh dibawah 0'),
    body('targetKesehatan')
        .notEmpty()
        .withMessage('isi target kesehatan')
        .isIn(['Menurunkan Berat Badan', 'Mempertahankan Berat Badan', 'Menaikkan Berat Badan'])
        .withMessage('target kesehatan tidak tersedia'),
    body('jenisDiet'),
    // body('photo'),     will be added leter
    body('jenisKelamin')
    .notEmpty()
        .withMessage('jenis kelamin tidak boleh kosong')
        .isIn(['Pria', 'Wanita'])
        .withMessage('jenis kelamin hanya boleh pria dan wanita'),
        body('tanggalLahir')
        .notEmpty()
        .withMessage('tanggal lahir tidak boleh kosong')
        .isDate()
        .withMessage('tanggal lahir tidak valid'),
    ])
    
    
// ============================        UPDATE USER         ============================================

export const validateNews = withValidationErrors([
    body('judulArtikel')
        .notEmpty()
        .withMessage('judul tidak boleh kosong')
        .isLength({ min: 10 })
        .withMessage('judul terlalu pendek'),
    body('tagArtikel')
        .notEmpty()
        .withMessage('tag tidak boleh kosong')
        .isLength({ min: 3 })
        .withMessage('tag terlalu pendek'),
    body('penyutingArtikel')
        .notEmpty()
        .withMessage('penyunting artikel tidak boleh kosong')
        .isLength({ min: 3 })
        .withMessage('penyunting artikel terlalu pendek'),
    body('jenisArtikel')
        .notEmpty()
        .withMessage('jenis tidak boleh kosong')
        .isIn(['Diabetes', 'Obesitas'])
        .withMessage('Jenis tidak tersedia'),
    body('tagar')
        .notEmpty()
        .withMessage('tagar tidak boleh kosong')
        .isLength({ min: 3 })
        .withMessage('tagar terlalu pendek'),
    body('referensi')
        .notEmpty()
        .withMessage('referensi tidak boleh kosong')
        .isLength({ min: 3 })
        .withMessage('referensi terlalu pendek'),
    body('editorContent')
        .notEmpty()
        .withMessage('konten tidak boleh kosong')
        .isLength({ min: 3 })
        .withMessage('konten terlalu pendek'),
])