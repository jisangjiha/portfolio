import zzalang from "../assets/zzalang.png";
import mando from "../assets/mando.png";
import omok from "../assets/omok.png";
import doit from "../assets/doit.png";
import bagel from "../assets/bagel.png";

export type ProjectLink = { label: string; href: string };

export type Project = {
  name: string;
  /** Short ASCII label shown on the Nokia LCD (pixel font can't render Korean) */
  lcd: string;
  tagline: string;
  group: "팀 프로젝트" | "개인 프로젝트";
  period: string;
  team?: string;
  stack: string[];
  highlights: string[];
  image?: string;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    name: "Zzalang",
    lcd: "Zzalang",
    tagline: "백엔드 API와 연동된 게시판 서비스",
    group: "팀 프로젝트",
    period: "진행 중",
    team: "FE 1 · BE 1",
    stack: ["HTML", "CSS Module", "TypeScript", "React"],
    highlights: [
      "인증 상태에 따른 화면 제어 및 API 연동",
      "목록 페이지네이션 구조 설계",
      "검색 조건 기반 서버 데이터 요청 구조 설계",
      "카테고리 필터: 관리자/이용자 화면 분리 + 전역 상태로 중복 요청 제거",
    ],
    image: zzalang,
    links: [{ label: "GitHub", href: "https://github.com/jisangjiha/zzalang" }],
  },
  {
    name: "Mando",
    lcd: "Mando",
    tagline: "투두 리스트로 만다라트 계획표 실천을 돕는 서비스",
    group: "팀 프로젝트",
    period: "2024.01.30 – 2024.03.20",
    team: "기획 1 · 디자인 2 · FE 2 · BE 2",
    stack: ["HTML", "CSS Module", "SCSS", "JavaScript", "React", "Axios"],
    highlights: [
      "SCSS 스타일링 최적화 (변수·중첩·모듈화)",
      "useState 기반 상태 관리",
      "API 데이터 불일치 처리 — 명세 시각화로 정렬",
      "useMemo/useCallback으로 불필요한 렌더링 개선",
    ],
    image: mando,
    links: [
      { label: "Live", href: "https://mandomando.swygbro.com/mando" },
      { label: "GitHub", href: "https://github.com/swyp-3th-8team/frontend" },
    ],
  },
  {
    name: "Omok",
    lcd: "Omok",
    tagline: "승리 조건을 알고리즘으로 직접 구현한 오목 게임",
    group: "개인 프로젝트",
    period: "진행 중",
    stack: ["HTML", "CSS Module", "TypeScript", "React"],
    highlights: [
      "생성형 AI 없이 렌주룰 기반으로 규칙 분석·구현",
      "오목판 사이즈 조정, 현재 차례 표시, 승리/중복 착수 alert",
      "승리 판정: 4방향 벡터 양방향 확장 탐색으로 연속 5개 검출",
      "확장: 마지막 수 표시, 렌주룰 금수(3-3, 4-4) 판별",
    ],
    image: omok,
    links: [{ label: "GitHub", href: "https://github.com/jisangjiha/omok" }],
  },
  {
    name: "do it;",
    lcd: "do it;",
    tagline: "Todo 완료 상태를 한눈에 확인하는 서비스",
    group: "개인 프로젝트",
    period: "2025.04.03 – 2025.04.09",
    stack: ["HTML", "CSS Module", "TypeScript", "Next.js"],
    highlights: [
      "할 일 추가 / TO DO · DONE 상태 표시",
      "상세: 상태·타이틀 수정, 이미지·메모 추가",
      "UI 동작 로직 및 사용자 경험 개선",
      "Flexbox·미디어쿼리 기반 반응형 레이아웃",
    ],
    image: doit,
    links: [
      { label: "Live", href: "https://codeit-prework.vercel.app/" },
      { label: "GitHub", href: "https://github.com/jisangjiha/codeit-prework" },
    ],
  },
  {
    name: "베이글 프로젝트",
    lcd: "Bagel",
    tagline: "Ess-a-Bagel을 참고한 커스텀 베이글 주문 서비스",
    group: "개인 프로젝트",
    period: "2023.09.20 – 2023.12.28",
    stack: ["HTML", "CSS Module", "JavaScript", "React"],
    highlights: [
      "컴포넌트 기반 아키텍처 설계",
      "Context API 전역 상태 관리",
      "장바구니 수량 동기화(useEffect), 리렌더링 성능 개선",
      "CSS Module → Tailwind CSS 리팩토링 (CSS 약 30% 감소)",
    ],
    image: bagel,
    links: [
      { label: "GitHub", href: "https://github.com/jisangjiha/bagel-project" },
    ],
  },
];

export const contact = {
  email: "nobledjs@naver.com",
  github: "https://github.com/jisangjiha",
  phone: "010-3347-2408",
};
