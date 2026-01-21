import User from './user.model.js';
import Municipality from '../municipality/municipality.models.js';
import { getTenantDb } from '../../config/dynamicDb.js';
import { getTenantUserModel } from '../tenant/tenant.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Böyle bir kullanıcı bulunamadı!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre!' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'Hesabınız devre dışı bırakıldı!' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' }
        );

        return res.status(200).json({
            status: 'success',
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Sunucu hatası oluştu.' });
    }
};


export const createTenantUser = async (req, res) => {
    try {
        const { fullName, tcNumber, password, municipalityId } = req.body;
        const muni = await Municipality.findByPk(municipalityId);
        if (!muni) return res.status(404).json({ message: "Belediye bulunamadı" });

        const tenantSequelize = getTenantDb(
            muni.dbName, 
            muni.dbUser, 
            muni.dbPassword
        );

        const TenantUser = getTenantUserModel(tenantSequelize);
        const hashedPassword = await bcrypt.hash(password, 10);

        await tenantSequelize.sync(); 
        const newAdmin = await TenantUser.create({
            fullName,
            tcNumber,
            password: hashedPassword,
            role: 'admin'
        });

        await tenantSequelize.close();

        res.status(201).json({
            status: 'success',
            message: `Kullanıcı yalnız ${muni.dbName} veritabanında oluşturuldu.`,
            data: {
                id: newAdmin.id,
                tcNumber: newAdmin.tcNumber,
                database: muni.dbName
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hata: " + error.message });
    }
};