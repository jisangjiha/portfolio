/**
 * 상세 섹션(About·Skills·Portfolio·Contact) 공통 글자 크기 컨벤션.
 *
 * 크기를 한 곳에서 관리해 섹션 간 타이포 톤을 일치시킨다.
 * 색상·굵기는 문맥에 따라 각 요소가 유지하고, 여기서는 크기(+행간)만 정의한다.
 *
 * 스케일: eyebrow 14 · body 16 · bodySm 15 · lead 18 · meta 14 · chip 13
 */
export const typo = {
  /** 섹션 라벨 — 대문자 eyebrow (CAREER, FRONTEND, EMAIL…) */
  eyebrow: "text-[14px] font-semibold tracking-wide text-ocean uppercase",
  /** 핵심 라인 아이템 — 회사명 / 이메일값 / 스킬명 */
  lead: "text-[18px]",
  /** 본문 단락 */
  body: "text-[16px] leading-relaxed",
  /** 보조 설명(짧은 부연) */
  bodySm: "text-[15px] leading-relaxed",
  /** 메타 정보 — 기간 · 팀 · 캡션 */
  meta: "text-[14px]",
  /** 칩 · 버튼 */
  chip: "text-[13px]",
} as const;
