export const base = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ana səhifəyə xoş gəlmisiniz"
  });
};