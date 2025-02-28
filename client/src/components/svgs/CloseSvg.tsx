import React, { useState } from "react";

const CloseSvg = ({
  setIsAvatarOpen,
}: {
  setIsAvatarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <svg
      width="25px"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsAvatarOpen(false)}
      className="cursor-pointer mt-2 ms-2"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
        stroke={`${isHovered ? "#bd0cf3" : "#fff"}`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CloseSvg;
