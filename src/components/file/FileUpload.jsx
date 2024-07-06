import React, { useState } from 'react'
// import { Input, Button, Select } from '../components'
import { v4 as uuidv4 } from 'uuid'
import service from '../../appwrite/config'
import conf from '../../conf/conf'
import { Toaster } from '../components'

function FileUpload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(0)
  const [toast, setToast] = useState(0)

  const handleFileChange = (e) => {
    e.preventDefault()
    setToast(0)
    setLoading(0)
    try {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      if (selectedFile && selectedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
        setToast("No preview")
      }
    } catch (error) {
      setLoading(0)
      setToast(error.message)
      return
    }
  }
  const handleFileUpload = async () => {
    if (!file) setToast("No preview")
    try {
      const res = await service.serviceCreateFile(
        conf.appwriteBucketId,
        uuidv4(),
        file,
      )
      res ? (setToast('upload complete')) : (setToast('Failed to Upload'))
      console.log(res);
      setLoading(0)
      return res
    } catch (error) {
      setToast("Failed to upload")
      console.error('File upload failed', error);
      return
    }
  }
  return (
    <div>
      {toast ? (<Toaster message={toast} />) : ('')}
      <input type="file" onChange={handleFileChange} className='p-2 bg-green-500 rounded-md m-2' />
      {preview && <img src={preview} alt="Preview" width="200" />}
      <button onClick={handleFileUpload} className='p-2 bg-green-500 rounded-md m-2'>Upload File</button>
    </div>
  )
}

export default FileUpload