import React from 'react'
import { Audio as AudioComponent, Doc as DocComponent, Download as DownloadComponent, Images as ImageComponent, Others as OthersComponent, Share as ShareComponent, Video as VideoComponent } from '../../assets/google/Icons'

function Files() {
  // query file from app-write
  return (
    <div className="container p-2 bg-white text-[#232323] h-full overflow-y-scroll scrollbar-y max-h-[80dvh]">
      <div className="flex flex-col ">
        <p className="text-center my-5 py-2 px-3 self-center rounded-md shadow-lg border border-gray-300 w-1/4">My Files</p>

        <p className="text-start mx-3">Audio</p>
        {/* a row for rendering all mp3 files  */}
        <div className="flex flex-row min-h-[13rem] shadow-xl border overflow-x-scroll scrollbar-thin py-2 my-2">
          {/* Single file card render  */}
          <div className="container file-card flex flex-col max-w-[12rem] min-w-[12rem] min-h-[12rem] m-2 rounded-md border border-[#4BC0C0] p-2 bg-gray-100">
            <p className="text-center text-sm">track.mp3</p>
            <div className="flex items-center mx-auto mt-3">
              <AudioComponent c='#4BC0C0' w='4rem' h='4rem' className='self-center' />
            </div>
            <div className="flex flex-row items-center justify-aroundrounded-md w-1/2 mx-auto">
              <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
                <ShareComponent w='1rem' h='1rem' c='#232323' />
              </div>
              <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
                <DownloadComponent w='1rem' h='1rem' c='#232323' />
              </div>
            </div>
            <p className="text-center text-[#4BC0C0] font-semibold text-sm">03/05/2024</p>
          </div>
        </div>

        <p className="text-start mx-3 mt-2">Video</p>
        {/* a row for rendering all mp4 files  */}
        <div className="flex flex-row min-h-[13rem] shadow-xl border overflow-x-scroll scrollbar-thin py-2 my-2">
          {/* Single file card render  */}
          <div className="container file-card flex flex-col max-w-[12rem] min-w-[12rem] min-h-[12rem] m-2 rounded-md border border-[#4BC0C0] p-2 bg-gray-100">
            <p className="text-center text-sm">clip.mp4</p>
            <div className="flex items-center mx-auto mt-3">
              <VideoComponent c='#FFCE56' w='4rem' h='4rem' className='self-center' />
            </div>
            <div className="flex flex-row items-center justify-aroundrounded-md w-1/2 mx-auto">
              <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
                <ShareComponent w='1rem' h='1rem' c='#232323' />
              </div>
              <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
                <DownloadComponent w='1rem' h='1rem' c='#232323' />
              </div>
            </div>
            <p className="text-center text-[#cda02c] shadow-xl font-semibold text-sm">03/05/2024</p>
          </div>
        </div>

        <p className="text-start mx-3 mt-2">Images</p>
        {/* a row for rendering all Images files  */}
        <div className="flex flex-row min-h-[13rem] shadow-xl border overflow-x-scroll scrollbar-thin py-2 my-2">
          {/* Single file card render  */}
          <div className="container file-card flex flex-col max-w-[12rem] min-w-[12rem] min-h-[12rem] m-2 rounded-md border border-[#36A2EB] p-2 bg-gray-100">
            <p className="text-center text-sm">image.jpeg</p>
            <div className="flex items-center mx-auto mt-3">
              <ImageComponent c='#36A2EB' w='4rem' h='4rem' className='self-center' />
            </div>
            <div className="flex flex-row items-center justify-aroundrounded-md w-1/2 mx-auto">
              <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
                <ShareComponent w='1rem' h='1rem' c='#232323' />
              </div>
              <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
                <DownloadComponent w='1rem' h='1rem' c='#232323' />
              </div>
            </div>
            <p className="text-center text-[#36A2EB] shadow-xl font-semibold text-sm">03/05/2024</p>
          </div>
        </div>

        <p className="text-start mx-3 mt-2">Documents</p>
        {/* a row for rendering all documents files  */}
        <div className="flex flex-row min-h-[13rem] shadow-xl border overflow-x-scroll scrollbar-thin py-2 my-2">
          {/* Single file card render  */}
          <div className="container file-card flex flex-col max-w-[12rem] min-w-[12rem] min-h-[12rem] m-2 rounded-md border border-[#FF6384] p-2 bg-gray-100">
            <p className="text-center text-sm">doc.pdf</p>
            <div className="flex items-center mx-auto mt-3">
              <DocComponent c='#FF6384 ' w='4rem' h='4rem' className='self-center' />
            </div>
            <div className="flex flex-row items-center justify-aroundrounded-md w-1/2 mx-auto">
              <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
                <ShareComponent w='1rem' h='1rem' c='#232323' />
              </div>
              <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
                <DownloadComponent w='1rem' h='1rem' c='#232323' />
              </div>
            </div>
            <p className="text-center text-[#FF6384] shadow-xl font-semibold text-sm">03/05/2024</p>
          </div>
        </div>

        <p className="text-start mx-3 mt-2">Others</p>
        {/* a row for rendering all other files  */}
        <div className="flex flex-row min-h-[13rem] shadow-xl border overflow-x-scroll scrollbar-thin py-2 my-2">
          {/* Single file card render  */}
          <div className="container file-card flex flex-col max-w-[12rem] min-w-[12rem] min-h-[12rem] m-2 rounded-md border border-[#9966FF] p-2 bg-gray-100">
            <p className="text-center text-sm">file.exe</p>
            <div className="flex items-center mx-auto mt-3">
              <OthersComponent c='#9966FF ' w='4rem' h='4rem' className='self-center' />
            </div>
            <div className="flex flex-row items-center justify-aroundrounded-md w-1/2 mx-auto">
              <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
                <ShareComponent w='1rem' h='1rem' c='#232323' />
              </div>
              <div className="rounded-[50%] hover:border-none cursor-pointer hover:shadow-xl hover:bg-gray-200 transition-all duration-200 active:bg-white bg-gray-100 border border-gray-300 p-2 m-2 mx-auto">
                <DownloadComponent w='1rem' h='1rem' c='#232323' />
              </div>
            </div>
            <p className="text-center text-[#9966FF] shadow-xl font-semibold text-sm">03/05/2024</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Files