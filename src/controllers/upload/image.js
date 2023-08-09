async function uploadImage(req, res) {
  try {
    await File.create({
      ...req.file,
      path: req.file.path.replace("public/", ""),
      created_by: 1,
    });
    res.status(200).json({ file: "image", data: req.file });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export default uploadImage;
