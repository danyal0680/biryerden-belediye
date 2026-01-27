import { socialService } from "./social.models.js";

const fetchServices = async (req, res, extraWhere = {}) => {
    try {
        if (!req.tenantDb) {
            return res.status(400).json({ status: 'error', message: 'Tenant bağlantısı kurulamadı.' });
        }

        const SocialServiceModel = socialService(req.tenantDb);

        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = 100;
        const offset = (page - 1) * limit;

        const { rows, count } = await SocialServiceModel.findAndCountAll({
            where: extraWhere,
            limit,
            offset,
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            status: 'success',
            pagination: {
                total: count,
                page,
                perPage: limit,
                totalPages: Math.ceil(count / limit)
            },
            data: rows,
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    } finally {
        if (req.tenantDb) await req.tenantDb.close();
    }
};


export default fetchServices;