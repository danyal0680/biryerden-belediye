import fetchServices from "./social.pagination.js";

const getSocialServices = async (req, res) => {
    return fetchServices(req, res);
};

const getCancelledServices = async (req, res) => {
    return fetchServices(req, res, { status: 'İptal Edildi' });
};

export { getSocialServices, getCancelledServices };