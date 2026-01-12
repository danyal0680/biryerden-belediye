import { socialService } from "./social.models.js";

export const getSocialServices = async (req, res) => {
    try {
        const SocialServiceModel = socialService(req.tenantDb);

        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = 100;
        const offset = (page - 1) * limit;

        const { rows, count } = await SocialServiceModel.findAndCountAll({
            limit,
            offset,
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            status: 'success',
            data: rows,
            pagination: {
                total: count,
                page,
                perPage: limit,
                totalPages: Math.ceil(count / limit)
            }
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    } finally {
        if (req.tenantDb) await req.tenantDb.close();
    }
};
