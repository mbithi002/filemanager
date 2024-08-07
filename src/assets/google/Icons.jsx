const Audio = ({ h = "32px", w = "32px", c = '#232323' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={h}
      viewBox="0 -960 960 960"
      width={w}
      fill={c}
    >
      <path d="M328-120H180q-24 0-42-18t-18-42v-300q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v300q0 24-18 42t-42 18H632v-296h148v-64q0-125.36-87.32-212.68Q605.36-780 480-780q-125.36 0-212.68 87.32Q180-605.36 180-480v64h148v296Zm-60-236h-88v176h88v-176Zm424 0v176h88v-176h-88Zm-424 0h-88 88Zm424 0h88-88Z" />
    </svg>
  );
};

const PDF = ({ h = "32px", w = "32px", c = '#232323' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={h} viewBox="0 -960 960 960" width={w}
      fill={c}>
      <path
        d="M331-431h37v-83h48q15.73 0 26.36-10.64Q453-535.28 453-551v-48q0-15.72-10.64-26.36Q431.73-636 416-636h-85v205Zm37-120v-48h48v48h-48Zm129 120h84q15 0 26-10.64 11-10.63 11-26.36v-131q0-15.72-11-26.36Q596-636 581-636h-84v205Zm37-37v-131h47v131h-47Zm133 37h37v-83h50v-37h-50v-48h50v-37h-87v205ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z" />
    </svg>
  )
}

const Images = ({ h = "32px", w = "32px", c = '#232323' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={h} viewBox="0 -960 960 960" width={w}
      fill={c}>
      <path
        d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z" />
    </svg>
  )
}

const Video = ({ h = "32px", w = "32px", c = '#232323' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={h} viewBox="0 -960 960 960" width={w}
      fill={c}>
      <path
        d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h520q24 0 42 18t18 42v215l160-160v410L720-435v215q0 24-18 42t-42 18H140Zm0-60h520v-520H140v520Zm0 0v-520 520Z" />
    </svg>
  )
}

const Others = ({ h = "32px", w = "32px", c = '#232323' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={h} viewBox="0 -960 960 960" width={w}
      fill={c}>
      <path
        d="M140-120q-24 0-42-18t-18-42v-371h60v371h452v60H140Zm121-120q-24 0-42.5-18T200-300v-371h60v371h453v60H261Zm119-120q-24 0-42-18t-18-42v-360q0-24 18-42t42-18h440q24 0 42 18t18 42v360q0 24-18 42t-42 18H380Zm0-60h440v-298H380v298Z" />
    </svg>
  )
}

const Share = ({ h = "32px", w = "32px", c = '#232323' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={h} viewBox="0 -960 960 960" width={w}
      fill={c}>
      <path
        d="M120-160v-640l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z" />
    </svg>
  )
}

const Download = ({ h = "32px", w = "32px", c = '#232323' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={h} viewBox="0 -960 960 960" width={w}
      fill={c}>
      <path
        d="M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z" />
    </svg>
  )
}


const Doc = ({ h = "32px", w = "32px", c = '#232323' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={h} viewBox="0 -960 960 960" width={w}
      fill={c}>
      <path
        d="M140-160q-24 0-42-18.5T80-220v-520q0-23 18-41.5t42-18.5h281l60 60h339q23 0 41.5 18.5T880-680v460q0 23-18.5 41.5T820-160H140Zm0-60h680v-460H456l-60-60H140v520Zm0 0v-520 520Z" />
    </svg>
  )

}


export { Audio, Doc, Download, Images, Others, PDF, Share, Video };

