export function ReactIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#38BDF8" />
      <g stroke="#38BDF8" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

export function NextIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <mask height="180" id="mask-next" maskUnits="userSpaceOnUse" width="180" x="0" y="0">
        <circle cx="90" cy="90" fill="#000" r="90" />
      </mask>
      <g mask="url(#mask-next)">
        <circle cx="90" cy="90" fill="#000" r="90" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#paint0_linear_next)"
        />
        <rect fill="url(#paint1_linear_next)" height="72" width="12" x="115" y="54" />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_next"
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
        >
          <stop stopColor="#FFF" />
          <stop offset="1" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_next"
          x1="121"
          x2="120.799"
          y1="54"
          y2="106.875"
        >
          <stop stopColor="#FFF" />
          <stop offset="1" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function VueIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 261.76 226.69">
      <path
        d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z"
        fill="#41B883"
      />
      <path
        d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z"
        fill="#34495E"
      />
    </svg>
  )
}

export function NuxtIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 195">
      <path
        d="M142.062 189.654H244.606C253.513 189.654 258.469 179.375 252.883 172.434L173.084 73.2872C168.749 67.9004 160.404 67.7656 155.894 73.0084L82.1643 158.741L123.639 96.656C127.818 90.4036 136.873 90.2312 141.277 96.3204L156.401 117.234L142.062 189.654Z"
        fill="#00DC82"
      />
      <path
        d="M82.1643 158.741L155.894 73.0084C160.404 67.7656 168.749 67.9004 173.084 73.2872L252.883 172.434C258.469 179.375 253.513 189.654 244.606 189.654H142.062L123.639 96.656C127.818 90.4036 136.873 90.2312 141.277 96.3204L156.401 117.234"
        fill="#00DC82"
      />
      <path
        d="M123.639 96.656L82.1643 158.741L45.4199 189.654H11.3938C2.4867 189.654 -2.46914 179.375 3.11727 172.434L74.8357 83.324C79.1706 77.9372 87.5159 78.072 92.0257 83.3148L123.639 96.656Z"
        fill="#00DC82"
      />
    </svg>
  )
}

export function ViteIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32">
      <path
        d="M29.56 5.86l-13 23.11a1.2 1.2 0 01-2.08 0l-13-23.11a1.2 1.2 0 01.62-1.68 1.18 1.18 0 011.45.39L15.5 18.2l12-13.63a1.2 1.2 0 011.75-.12 1.19 1.19 0 01.31 1.41z"
        fill="#BD34FE"
      />
      <path
        d="M19.14 3.09L9.41 4.79a.6.6 0 00-.47.46l-2.6 12a.6.6 0 00.78.68l4.47-1.74-2.12 7.23a.6.6 0 001 .55l11-13a.6.6 0 00-.54-1l-4.57.43 3.15-8.8a.6.6 0 00-.47-.51z"
        fill="#FFD62E"
      />
    </svg>
  )
}

export function PrismaIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M20.25 18.25L13.75 3.25C13.45 2.5 12.55 2.5 12.25 3.25L3.75 18.25C3.45 18.75 3.85 19.5 4.5 19.5H19.5C20.15 19.5 20.55 18.75 20.25 18.25Z"
        stroke="#1D3557"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.5 3.5L15.5 19.5" stroke="#1D3557" strokeWidth="2" />
    </svg>
  )
}

export function NestIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none">
      <path
        d="M217.47 50.8C201.2 25.1 171.18 8.84 139.73 3.9C108.28-1.04 76.54 5.67 51.64 22.8C26.74 39.93 10.45 66.2 5.6 96.8C.75 127.4 7.7 159.08 24.9 184.77c15.2 22.7 39.38 38.6 66.86 44.57 27.48 5.97 56.63.15 80.64-15.65 14.1-9.28 25.4-22.1 32.7-37.1l-25.8-12.7c-5.4 11.2-13.8 20.7-24.3 27.6-18 11.8-40.2 16.2-61.1 11.7-20.9-4.5-39.3-16.7-50.8-34-13.1-19.6-18.4-43.8-14.7-67.2 3.7-23.4 16.1-43.5 35.1-56.5 19-13 43.2-18.1 67.2-14.3 24 3.8 46.9 16.2 59.3 35.8 5.8 9.1 9.4 19.5 10.4 30.3l28.8-1.5c-1.3-14.7-6.3-28.8-14.4-41.22z"
        fill="#E0234E"
      />
    </svg>
  )
}

export function FlutterIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M14.5 2L3 13.5L6.5 17L18 5.5H14.5Z" fill="#02569B" />
      <path d="M14.5 12.5L9.5 17.5L14.5 22.5H18L13 17.5L18 12.5H14.5Z" fill="#0175C2" />
      <path d="M9.5 17.5L12 15L14.5 17.5L12 20L9.5 17.5Z" fill="#29B6F6" />
    </svg>
  )
}

export function TypeScriptIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M11.5 8.5H6.5V10.5H8V17H10V10.5H11.5V8.5Z" fill="white" />
      <path
        d="M17.5 11.5C17.5 10 16.5 9 14.5 9C13 9 12 9.5 11.5 10.5L13 11.5C13.5 11 14 10.5 14.5 10.5C15 10.5 15.5 10.8 15.5 11.2C15.5 11.6 15.2 11.8 14.2 12.2L13.5 12.5C12 13 11.5 13.8 11.5 15C11.5 16.5 12.5 17.5 14.5 17.5C16 17.5 17 16.8 17.5 15.8L16 14.8C15.6 15.4 15.1 15.8 14.5 15.8C14 15.8 13.5 15.5 13.5 15.1C13.5 14.6 13.8 14.4 14.8 14L15.5 13.7C16.8 13.2 17.5 12.5 17.5 11.5Z"
        fill="white"
      />
    </svg>
  )
}

export function TailwindIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 6C9.6 6 8.1 7.2 7.5 9.6C8.4 8.4 9.45 7.95 10.65 8.25C11.4 8.44 11.95 9.01 12.55 9.64C13.53 10.67 14.7 11.9 17.4 11.9C19.8 11.9 21.3 10.7 21.9 8.3C21 9.5 19.95 9.95 18.75 9.65C18 9.46 17.45 8.89 16.85 8.26C15.87 7.23 14.7 6 12 6ZM6.6 12.1C4.2 12.1 2.7 13.3 2.1 15.7C3 14.5 4.05 14.05 5.25 14.35C6 14.54 6.55 15.11 7.15 15.74C8.13 16.77 9.3 18 12 18C14.4 18 15.9 16.8 16.5 14.4C15.6 15.6 14.55 16.05 13.35 15.75C12.6 15.56 12.05 14.99 11.45 14.36C10.47 13.33 9.3 12.1 6.6 12.1Z"
        fill="#38BDF8"
      />
    </svg>
  )
}

export function PostgresIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z"
        fill="#336791"
      />
    </svg>
  )
}

export function DockerIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.5 11.5C22.2 10.5 21.2 9.8 20.1 9.8H18.9C18.6 8.3 17.5 7.1 16.1 6.6L15.5 6.4L15.1 7C14.4 8.2 14.4 9.6 15 10.7C14.1 11.1 13 11 12.2 10.4L11.7 10H2.2C1.5 10 1 10.5 1 11.2C1 14.8 3.5 18 7.3 18.8C12.5 20 17.8 18.5 21.3 14.8C22.2 13.9 22.7 12.7 22.5 11.5ZM5.5 9H7.5V7H5.5V9ZM5.5 6H7.5V4H5.5V6ZM8.5 9H10.5V7H8.5V9ZM8.5 6H10.5V4H8.5V6ZM11.5 9H13.5V7H11.5V9ZM11.5 6H13.5V4H11.5V6Z"
        fill="#2496ED"
      />
    </svg>
  )
}
