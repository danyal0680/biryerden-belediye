import { socialService } from "./social.models.js";

export const getSocialServices = async (req, res) => {
    try {
        const SocialServiceModel = socialService(req.tenantDb);
        const data = await SocialServiceModel.findAll();
        
        res.status(200).json({ status: 'success', data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        if (req.tenantDb) await req.tenantDb.close();
    }
};