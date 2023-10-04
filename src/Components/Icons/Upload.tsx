export default function ThumbsUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
    >
      <g filter="url(#filter0_b_604_130546)">
        <rect
          width={40}
          height={40}
          rx={8}
          fill="white"
          fillOpacity={0.6}
        ></rect>
        <path
          d="M16.6667 23.3333L20 20M20 20L23.3333 23.3333M20 20V27.5M26.6667 23.9524C27.6846 23.1117 28.3333 21.8399 28.3333 20.4167C28.3333 17.8854 26.2813 15.8333 23.75 15.8333C23.5679 15.8333 23.3975 15.7383 23.3051 15.5814C22.2184 13.7374 20.212 12.5 17.9167 12.5C14.4649 12.5 11.6667 15.2982 11.6667 18.75C11.6667 20.4718 12.3629 22.0309 13.4891 23.1613"
          stroke="#475467"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
