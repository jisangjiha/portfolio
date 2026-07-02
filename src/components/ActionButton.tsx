import type { ReactNode } from "react";

// 글로시 블루 액션 버튼 (Contact "복사하기/바로가기" 디자인) — Contact·Portfolio·Modal 공용.
// 항상 글로시하고, hover 시 상단 광택이 살짝 커지는 애니메이션이 들어간다.
const BASE =
  "group relative shrink-0 overflow-hidden rounded-full bg-[#0871E7] text-white shadow-[inset_0_-3px_3px_rgba(255,255,255,0.39)] outline-1 -outline-offset-1 outline-[#0871E7]";

const SIZE = {
  md: "px-4 py-3 text-[13px]", // Contact
  sm: "px-3.5 py-2 text-[12px]", // Project · Modal
} as const;

function Shine() {
  return (
    <span
      className="pointer-events-none absolute top-[1px] left-[10%] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-300 group-hover:scale-x-105"
      aria-hidden
    />
  );
}

type Props = {
  children: ReactNode;
  /** 있으면 새 탭 링크(<a>), 없으면 버튼(<button>)으로 렌더 */
  href?: string;
  onClick?: () => void;
  size?: "md" | "sm";
};

export default function ActionButton({
  children,
  href,
  onClick,
  size = "md",
}: Props) {
  const cls = `${BASE} ${SIZE[size]}`;
  const inner = (
    <>
      <Shine />
      <span className="relative">{children}</span>
    </>
  );
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor="link"
      className={cls}
    >
      {inner}
    </a>
  ) : (
    <button onClick={onClick} data-cursor="link" className={cls}>
      {inner}
    </button>
  );
}
