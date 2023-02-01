export const checkImage = (file: File) => {
  const types = ['image/png', 'image/jpeg']
  let err = ''
  if (!file) return (err = 'File dose not exists.')

  if (file.size > 1024 * 1024) err = 'The largest image size is 1 mb'
  if (!types.includes(file.type)) err = 'Image type should be png/jpeg'
  return err
}

export const imageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'fhcixktr')
  formData.append('cloud_name', 'drspqpjo3')

  const res = await fetch('https://api.cloudinary.com/v1_1/drspqpjo3/upload', {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()
  return { public_id: data.public_id, url: data.secure_url }
}
