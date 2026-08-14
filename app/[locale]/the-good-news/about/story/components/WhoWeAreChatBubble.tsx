export function WhoWeAreChatBubble({ text, direction, index }: any) {
  // Rotation values for a playful look
  const rotations = [
    "rotate-6",

    // "rotate-6",
    // "-rotate-2",
  ];
  // Pick a rotation based on index or direction
  const rotationClass = rotations[index % rotations.length];
  return (
    <div
      className={`relative bg-hot-pink rounded-2xl 
       shadow-lg p-2 flex justify-start  flex-col md:mb-10 items-center max-sm:w-64 w-64 md:w-96 text-white min-h-[80px] h-auto border ${rotationClass} `}
      // style={{ marginBottom: "2.5rem" }}
    >
      <div className="text-center max-sm:text-sm text-base font-medium text-creamey mb-1">
        {text}
      </div>
      {/* Chat bubble tail */}
      <div
        className={`absolute ${
          // On mobile: position on left side
          // On desktop (sm and up): position on bottom
          direction === "left"
            ? "-left-4 top-6 sm:-bottom-4 sm:left-6 sm:top-auto"
            : "-left-4 top-6 sm:-bottom-4 sm:right-6 sm:top-auto sm:left-auto"
        } w-4 h-4 overflow-visible text-hot-pink pointer-events-none`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ${
            // Rotate the triangle for mobile view
            "rotate-90 sm:rotate-0"
          }`}
        >
          {/* Simple triangle for classic chat bubble tail */}
          <polygon points="0,0 16,0 8,16" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
