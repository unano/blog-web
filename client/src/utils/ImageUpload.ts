export const checkImage = (file: File) => {
  let err = ''
  if (!file) return err = 'File dose not exists.'
  
  if ((file.size > 1024 * 1024))
    err = "The largest image size is 1 mb"
  return err;
}

export const ImageUpload = async(file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "fhcixktr")
  formData.append("cloud_name", "drspqpjo3")

  const res = await fetch("https://api.cloudinary.com/v1_1/drspqpjo3/upload", {
    method: "POST",
    body: formData
  });

  const data = await res.json()
  return {public_id: data.public_id, url: data.secure_url}
}