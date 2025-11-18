import React from 'react'

export default function UploadField({ onChange }){
  return (
    <input type="file" onChange={e => onChange(e.target.files && e.target.files[0])} />
  )
}
