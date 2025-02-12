"use client"

import { useRef, useState } from "react"
interface FileWithPreview extends File {
  preview?: string
  file: File
}
export default function createAlbum() {
  const inputFile = useRef<null | HTMLInputElement>(null)
  const [files, setFiles] = useState<FileWithPreview[]>([])

  function handleOpenFile() {
    inputFile.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).map((file) => {
        const fileWithPreview = file as FileWithPreview
        fileWithPreview.preview = URL.createObjectURL(file)
        return fileWithPreview
      })
      setFiles(selectedFiles)
    }
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()

      Array.from(files).forEach((file) => {
        formData.append("files", file)
      })

      const response = await fetch("/api/upload/aws", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      console.log("Upload response:", data)
    } catch (error) {
      console.error("Error uploading files:", error)
    } finally {
      setFiles([])
    }
  }

  return (
    <div className="pt-20 min-screen:flex flex-col justify-center items-center h-screen w-full">
      <section className="w-full h-screen overflow-hidden">
        <div className="pageContent w-430 mx-auto h-full justify-center overflow-y-scroll px-4 pb-4 mt-header">
          <div className="flex flex-col h-full w-full justify-center items-center">
            <div className="font-light text-11 text-center text-dark-grey w-full">
              <p>Select which photos you want to add to</p>
              <p>your album</p>
            </div>
            {files.length > 0 && (
              <div className="w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-sm text-grey truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex-1 flex flex-col justify-start items-center w-full">
              <div className="flex flex-col items-center">
                <form>
                  <input
                    type="file"
                    ref={inputFile}
                    className="hidden"
                    multiple={true}
                    onChange={handleFileChange}
                  />
                </form>
                <div className="flex justify-center mt-64 md:mt-52 mb-6">
                  <svg
                    width="44"
                    height="32"
                    viewBox="0 0 44 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 31.0543C7.96667 31.0543 5.37533 30.0431 3.226 28.0207C1.07533 25.9984 0 23.5265 0 20.6053C0 18.1014 0.783333 15.8703 2.35 13.9122C3.91667 11.954 5.96667 10.702 8.5 10.1563C9.33333 7.20295 11 4.8114 13.5 2.98161C16 1.15183 18.8333 0.236938 22 0.236938C25.9 0.236938 29.208 1.54475 31.924 4.16038C34.6413 6.77729 36 9.96368 36 13.7195C38.3 13.9764 40.2087 14.9311 41.726 16.5836C43.242 18.2375 44 20.1719 44 22.3869C44 24.7945 43.1253 26.8413 41.376 28.5273C39.6253 30.212 37.5 31.0543 35 31.0543H24V17.2828L25.8 18.9681C26.1667 19.3213 26.6253 19.4978 27.176 19.4978C27.7253 19.4978 28.2 19.3052 28.6 18.92C28.9667 18.5669 29.15 18.1174 29.15 17.5717C29.15 17.026 28.9667 16.5766 28.6 16.2235L23.4 11.2156C23 10.8304 22.5333 10.6378 22 10.6378C21.4667 10.6378 21 10.8304 20.6 11.2156L15.4 16.2235C15.0333 16.5766 14.842 17.0177 14.826 17.5467C14.8087 18.077 15 18.5348 15.4 18.92C15.7667 19.2731 16.2247 19.458 16.774 19.4747C17.3247 19.4901 17.8 19.3213 18.2 18.9681L20 17.2828V31.0543H11Z"
                      fill="#737373"
                    ></path>
                  </svg>
                </div>
                <div className="flex justify-center">
                  <p className="text-base text-grey leading-body">
                    drag and drop to&nbsp;
                  </p>
                  <p
                    className="text-base underline text-grey leading-body cursor-pointer"
                    onClick={handleOpenFile}
                  >
                    upload
                  </p>
                </div>
                <div className="flex justify-center mt-4 mb-96">
                  <p className="text-grey leading-secondary">
                    PNG, JPEG, JPG, GIF
                  </p>
                </div>
                {/* Temp for testing   */}
                <div>
                  <button onClick={handleSubmit}>submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
